# Md. Abdullah Al Owasi — Portfolio v19

A restrained, responsive Technology Risk / GRC / AI Governance portfolio. Built with plain HTML, CSS and JavaScript. No framework, build dependencies, paid APIs, analytics, database or server functions. Fonts are bundled locally with their license.

## Start here

1. Extract the ZIP. Upload the **contents of this folder** to the root of your GitHub repository. Do not upload the unopened ZIP, and do not place the project inside another folder in the repository.
2. Check that `package.json`, `index.html`, `assets/`, `work/`, `scripts/` and `.github/workflows/pages.yml` are at the repository root. Preserve the included `.github` directory.
3. Choose one host below. The same repository can deploy to all three. You do not need to deploy to all three to have a working website.
4. For a $0 setup, use a free provider subdomain and remain within that provider's free-plan limits. Buying a custom domain is optional and is not free hosting.

| Host | Framework | Build command | Publish directory | Setup |
| --- | --- | --- | --- | --- |
| Cloudflare Pages | None | `npm run build` | `dist` | Import the GitHub repository as a **Pages** project |
| Vercel | Other | `npm run build` | `dist` | Import the repository; `vercel.json` supplies settings |
| GitHub Pages | GitHub Actions | Included workflow runs `npm run verify` | `dist` | Enable Pages with GitHub Actions, then run the included workflow |

Use Node.js 22. No `npm install` is required locally because the project has no dependencies. If a host runs its default install step, there are no dependency packages to download.

**Read [DEPLOYMENT.md](DEPLOYMENT.md) for the full, researched instructions and free-plan qualifications.**

## Local preview

Install Node.js 22 or later, then open a terminal in this folder:

```bash
npm run verify
npm start
```

Open `http://localhost:4173`. This is a local preview address, not your published website. Press Ctrl+C in the terminal to stop it. Run `npm run build` after changing source files, then refresh the preview.

The included `dist/` is a ready-built static copy for inspection or Cloudflare Direct Upload. Git ignores this generated folder; normal Git deployments rebuild it from source. Do not edit `dist/` directly.

## What changed

- Five focused homepage sections and three navigation links.
- One forest-green primary CTA: **Discuss a role**.
- Accessible, keyboard-operated four-view sample, with all content readable without JavaScript.
- Three local case walkthroughs and downloadable Markdown samples.
- An index preserving the original portfolio's ten project themes and original document-folder links.
- Corrected latest user-supplied LinkedIn/GitHub destinations.
- Removed v17 canonical URLs, competing visualizations, automatic motion and external runtime dependencies.
- Per-deployment canonical URLs and sitemap; repository-subdirectory support for GitHub Pages.
- Real not-found page, no catch-all SPA rewrite, and provider-appropriate security configuration.

## Edit content

| File | Purpose |
| --- | --- |
| `index.html` | Homepage copy, email and original résumé folder |
| `work/index.html` | Project directory and original Drive folders |
| `work/assurance/index.html` | Local assurance walkthrough |
| `work/vendor-risk/index.html` | Local vendor-risk walkthrough |
| `work/ai-governance/index.html` | Local AI-governance walkthrough |
| `samples/*.md` | Downloadable versions of the local walkthroughs |
| `assets/site.css` | Design tokens, responsive rules and print styles |
| `assets/site.js` | Tabs and email-copy behavior |
| `site.config.json` | Optional preferred public site URL |
| `scripts/build.mjs` | Static build, metadata, sitemap and 404 generation |

The local walkthroughs are illustrative introductions derived from the supplied portfolio's themes; they are not copies of the external workbooks or proof of client delivery. Keep the scenario and limitation labels. When editing a walkthrough, update its matching Markdown download too.

## Contact and document links

The current contact email is `abdullahalowasi369@gmail.com`. Update both visible text and mailto links if it changes. The current profiles are the user's latest supplied addresses:

- LinkedIn: `https://www.linkedin.com/in/aaowasi/`
- GitHub: `https://github.com/aaowasi`

Profile pages and original Drive documents could not be independently retrieved in this environment. They are preserved as supplied references, not verified credentials. Folder links are labeled as folders. The original résumé itself was not supplied; no résumé or career credential has been fabricated. Local work samples are available even if a Drive folder cannot be opened.

See [VALIDATION.md](VALIDATION.md) for exactly what passed and what remains unverified.
