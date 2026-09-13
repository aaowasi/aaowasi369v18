# Deploy the portfolio for $0

Research checked 13 September 2026 against official provider documentation. Free hosting is subject to eligibility, usage limits and provider terms; the code does not guarantee unlimited free service. This portfolio needs only static hosting and a provider-issued subdomain.

## Upload to GitHub first

Create a repository under your own account. Use a **public repository** if you want GitHub Pages on GitHub Free.

Extract the ZIP. In GitHub, use **Add file → Upload files** to upload the extracted project contents, then commit to `main`. Do not upload the ZIP itself. If your operating system hides `.github`, enable hidden-file display, or use GitHub Desktop to commit the whole folder. The workflow is at `.github/workflows/pages.yml`.

If replacing an existing repository, remove obsolete v18 files that are no longer in this package. In particular, do not retain old `_redirects` or SPA rewrites, old `vercel.json`, old build scripts or old deployment workflows. Keep a backup or commit before replacing them. The safest import is a new repository, followed by connecting your existing hosting project to it if you want to keep the old address.

Repository root must contain `package.json`, `index.html`, `assets`, `work`, `samples` and `scripts`; it must not contain just one ZIP file or one extra enclosing project folder.

## Option A — Cloudflare Pages

1. Open **Workers & Pages**, create an application and choose **Pages**.
2. Choose **Import an existing Git repository** and select your repository. This package uses Pages, not a Workers runtime or Workers deployment command.
3. Set production branch to `main` and framework preset to **None**.
4. Set build command to `npm run build` and build output directory to `dist`. Leave the root directory at the repository root.
5. Use Node.js 22; `.nvmrc` is included. If needed, set build variable `NODE_VERSION` to `22`.
6. Deploy. Cloudflare supplies a `pages.dev` address.
7. Set the environment variable `SITE_URL` to your stable production URL, for example the `pages.dev` address shown by your project. Rebuild so the sitemap and canonical links use that permanent address.

To update the existing `aaowasi369v18.pages.dev` project, import the new repository contents into the repository already connected to that Pages project, or change that project's Git connection. Creating a different Pages project generally gives you a different address.

Free-plan limits currently include **500 builds per month**, **20,000 files per site**, and **25 MiB per file**. This build is far below the file limits. It uses no Pages Functions. See [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) and [static HTML deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

### Optional: upload without connecting Git

For Cloudflare Direct Upload, upload the **`dist/` folder**, or a ZIP made from the files inside `dist/` so that `index.html` sits at the archive root. Do not upload the whole source bundle as the published site. Choose Git integration initially if you want automatic GitHub-triggered builds. A Direct Upload project cannot later switch to Git integration; that requires a new project. See [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

## Option B — Vercel Hobby

1. Import the same GitHub repository into a personal Vercel project on **Hobby**.
2. Use framework preset **Other** and leave the root directory at the repository root.
3. Confirm the build command is `npm run build`, the output directory is `dist`, and Node.js is 22.x.
4. The included `vercel.json` configures the build and a no-dependency install command. Do not add the previous SPA rewrite.
5. Deploy. Vercel supplies a `vercel.app` address.
6. The build can use `VERCEL_PROJECT_PRODUCTION_URL` automatically. Set `SITE_URL` explicitly if you choose a different permanent canonical address or a custom domain, then redeploy.

Vercel Hobby is **free for personal, non-commercial use**. This package is a personal employment portfolio with no checkout or paid service. If you turn it into a commercial consulting business site, review eligibility rather than assuming Hobby still applies. Do not select Pro or a paid add-on for this setup. See [Hobby plan and limits](https://vercel.com/docs/plans/hobby) and [project configuration](https://vercel.com/docs/project-configuration).

## Option C — GitHub Pages

1. Use a public repository under GitHub Free.
2. Open **Settings → Pages**. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow** and run it on `main`.
4. Once the workflow succeeds, open the published URL from the `github-pages` deployment.
5. To publish automatically on future pushes, add a repository **Actions variable** named `DEPLOY_GITHUB_PAGES` with the value `true` under **Settings → Secrets and variables → Actions → Variables**. It is a plain configuration variable, not a secret.

The workflow skips push-triggered deployment until that variable is enabled, so using only Cloudflare or Vercel does not create failing Pages jobs. Manual **Run workflow** works without the variable once Pages is configured.

The workflow obtains the correct origin and repository path from `actions/configure-pages`. It generates the right canonical links, sitemap and 404 home link for both account sites and project sites. No manual asset-prefix replacement is needed.

Do not choose **Deploy from a branch → root** for this source repository: the intended path is the included Actions build publishing `dist`. No personal access token is required. The workflow uses the standard GitHub token with Contents/Pages read permissions for build and Pages write/ID-token permissions for deployment.

If your default branch is not `main`, either rename it or change `branches: [main]` in the workflow. Make sure the `github-pages` environment allows deployments from that branch.

GitHub Pages is available on GitHub Free for public repositories. Published sites have a **1 GB** limit and a soft **100 GB/month** bandwidth limit. Pages is not for an online business, e-commerce or commercial SaaS. See [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) and [official Pages workflow guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Canonical URL and sitemap

The build chooses the site URL in this order:

1. `SITE_URL` environment variable (the GitHub Pages workflow supplies this automatically).
2. `site.config.json` → `siteUrl`, if not empty.
3. Vercel's production URL or Cloudflare's supplied deployment URL.
4. If unknown, omit canonical and sitemap rather than publish a guessed or obsolete address.

Cloudflare's automatic URL may be a deployment-specific address, so explicitly set `SITE_URL` to the stable production address once known. Use a full `https://` URL. A GitHub Pages project URL includes the repository path.

If you publish all three copies, choose whether each should be independently indexed. For one canonical site, explicitly set the same preferred canonical URL on the mirrors. For GitHub Actions, replace the `SITE_URL` workflow expression with a repository variable for your preferred address only if you intentionally want that behavior; use the normal automatic setting otherwise.

## Common failures

| Symptom | Correction |
| --- | --- |
| Host cannot find package.json | Upload extracted contents at repository root, or correct the configured root directory |
| Build succeeds but homepage is 404 | Set publish/output directory to `dist` |
| Cloudflare asks for a Workers deploy command | Choose a Pages project instead |
| GitHub Pages workflow does not run on push | Set `DEPLOY_GITHUB_PAGES=true`, or manually run the workflow |
| Configure Pages fails | Enable Pages in repository Settings and choose GitHub Actions first |
| CSS missing on GitHub Pages | Use this package's relative paths and workflow; do not substitute root-relative asset URLs |
| Every missing page returns the homepage | Remove old SPA rewrites and `_redirects` from the previous version |
| Search metadata still shows an old domain | Set `SITE_URL`, rebuild, then allow time for search engines to recrawl |
| Drive asks for sign-in or access | Check the original folder sharing; local walkthroughs remain usable |
| Email button does not open an app | Copy the visible email address and use your email service manually |

## Browser check before announcing the site

Open the deployed homepage and each of the three work pages. Check at mobile width and on a laptop, use Tab and arrow keys in the sample viewer, test the email-copy button, open the original document folders while signed out, and visit a made-up nested path to confirm the 404 page. Hosting-account deployment and browser-rendered visual checks were not executed in this environment.
