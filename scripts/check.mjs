import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { root } from './build.mjs';
const dir = path.join(root, 'dist');
let links = 0, bytes = 0, files = 0;
const errors = [];
async function walk(folder) {
  for (const entry of await readdir(folder,{withFileTypes:true})) {
    const file = path.join(folder,entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    const data = await readFile(file); bytes += data.length; files++;
    if (!file.endsWith('.html')) continue;
    const html = data.toString();
    if ((html.match(/<h1(?:\s|>)/g)||[]).length !== 1) errors.push(`${file}: requires one h1`);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    if (new Set(ids).size !== ids.length) errors.push(`${file}: duplicate id`);
    if (!html.includes('lang="en"') || !html.includes('name="viewport"')) errors.push(`${file}: missing document metadata`);
    for (const [,raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(?:https?:|mailto:|data:)/.test(raw)) continue;
      if (raw.startsWith('/') && file.endsWith('404.html')) continue;
      if (raw.startsWith('/')) {errors.push(`${file}: nonportable root-relative link ${raw}`);continue;}
      const [part,hash] = raw.split('#');
      let target = path.resolve(path.dirname(file), decodeURIComponent(part||path.basename(file)));
      try {
        if ((await stat(target)).isDirectory()) target=path.join(target,'index.html');
        if (hash && !(await readFile(target,'utf8')).includes(`id="${hash}"`)) errors.push(`${file}: missing anchor ${raw}`);
        links++;
      } catch {errors.push(`${file}: missing link ${raw}`);}
    }
    if (/aaowasi369v17|<script[^>]+https?:|TODO|INSERT YOUR/.test(html)) errors.push(`${file}: obsolete URL or unfinished content`);
  }
}
await walk(dir);
for (const font of ['regular','semibold']) {
  const data = await readFile(path.join(dir,`assets/fonts/source-sans-3-${font}.woff2`));
  if(data.subarray(0,4).toString()!=='wOF2') errors.push(`Invalid ${font} font`);
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`PASS: ${files} output files, ${links} local references, ${bytes} bytes. Fonts, anchors, metadata and paths checked.`);
