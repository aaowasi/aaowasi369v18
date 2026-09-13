import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export function normalizeSiteUrl(value) {
  if (!value?.trim()) return '';
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error('SITE_URL must be a plain http(s) URL, without credentials, query or fragment.');
  return url.href.replace(/\/+$/, '') + '/';
}
export async function build({ destination = path.join(root, 'dist'), siteUrl } = {}) {
  const config = JSON.parse(await readFile(path.join(root, 'site.config.json'), 'utf8'));
  const inferred = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.CF_PAGES_URL || '';
  const base = normalizeSiteUrl(siteUrl ?? process.env.SITE_URL ?? (config.siteUrl || inferred));
  // Only the known build output is removed. Test output is owned by its caller.
  if (path.resolve(destination) === path.join(root, 'dist')) await rm(destination, {recursive:true, force:true});
  await mkdir(destination, {recursive:true});
  for (const item of ['index.html', 'work', 'samples', 'assets', '.nojekyll', '_headers']) {
    await cp(path.join(root, item), path.join(destination, item), {recursive:true});
  }
  const pages = [];
  async function visit(dir) {
    for (const entry of await readdir(dir, {withFileTypes:true})) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) await visit(file);
      else if (entry.name.endsWith('.html')) {
        const relative = path.relative(destination, file).split(path.sep).join('/');
        const route = relative.replace(/index\.html$/, '');
        const canonical = base ? new URL(route, base).href : '';
        const metadata = canonical ? `<link rel="canonical" href="${escape(canonical)}"><meta property="og:url" content="${escape(canonical)}">` : '';
        await writeFile(file, (await readFile(file, 'utf8')).replace('<!-- deployment-metadata -->', metadata));
        if (canonical) pages.push(canonical);
      }
    }
  }
  await visit(destination);
  const homePath = base ? new URL(base).pathname : '/';
  const css = 'body{margin:0;padding:12vh 8vw;background:#f6f5f1;color:#202724;font:20px/1.5 Arial,sans-serif}main{max-width:700px}h1{font-size:clamp(36px,6vw,64px);line-height:1.1;letter-spacing:-.03em}a{color:#245c49;text-underline-offset:5px}a:focus-visible{outline:2px solid #245c49;outline-offset:5px}p{color:#57615b}';
  const hash = createHash('sha256').update(css).digest('base64');
  await writeFile(path.join(destination, '404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Md. Abdullah Al Owasi</title><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'sha256-${hash}'; base-uri 'none'; form-action 'none'"><style>${css}</style></head><body><main><p>AAO · Md. Abdullah Al Owasi</p><h1>This page is no longer here.</h1><p>Explore the portfolio to find the work sample you need.</p><a href="${escape(homePath)}">Return to the portfolio</a></main></body></html>`);
  // The 404 has a hash-authorized inline style so it works at arbitrary missing paths.
  let headers = await readFile(path.join(destination, '_headers'), 'utf8');
  headers = headers.replace("style-src 'self'", `style-src 'self' 'sha256-${hash}'`);
  await writeFile(path.join(destination, '_headers'), headers);
  await writeFile(path.join(destination, 'robots.txt'), `User-agent: *\nAllow: /\n${base ? `Sitemap: ${new URL('sitemap.xml', base).href}\n` : ''}`);
  if (base) await writeFile(path.join(destination, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(url => `<url><loc>${escape(url)}</loc></url>`).join('')}</urlset>\n`);
  // Vercel and GitHub Pages use the generated document-level CSP for this style.
  console.log(`Built ${pages.length || 5} pages into ${destination}. ${base ? `Site URL: ${base}` : 'No canonical URL emitted: set SITE_URL after choosing your public address.'}`);
  return {base, pages, destination, notFoundStyleHash:hash};
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) await build();
