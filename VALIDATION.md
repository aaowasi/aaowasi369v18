# Release validation — v19

Date: 13 September 2026. Scope: local source, generated static build, HTTP behavior and DOM-simulated interactions. No cloud account deployment was performed.

## Passed

| Check | Result |
| --- | --- |
| `npm run verify` | Passed: build, link/metadata checker and all 3 build regression tests |
| JavaScript syntax | `assets/site.js` and `scripts/serve.mjs` passed Node syntax checks |
| Static output | 18 files, 281,757 bytes (about 275 KiB), including bundled fonts; no production dependencies |
| Internal references | 66 local references checked; no missing target or anchor |
| HTML structure | Balanced element nesting and no duplicate attributes in generated HTML |
| Heading/document metadata | One h1 per page, English document language, viewport metadata, no duplicate IDs |
| Font assets | Both bundled fonts have valid WOFF2 signatures; original font license included |
| GitHub project paths | Regression test verifies `/portfolio/` canonical URLs, nested-page asset paths, sitemap and 404 return path |
| Unknown deployment URL | Regression test verifies no inherited v17 canonical and no guessed sitemap |
| Configuration validation | Credential-bearing, non-HTTP(S), query and fragment site URLs rejected |
| Published-file selection | Build regression test confirms development scripts are excluded from output |
| Local HTTP | Home, project index, 3 walkthroughs, sample download, CSS and JS all returned 200 |
| Missing route | Made-up nested route returned a 404 with the real not-found page |
| Sample interaction | DOM simulation passed all 4 tab selections, left/right wrapping, Home and End |
| Contact utility | DOM simulation passed clipboard success, label reset and denied-permission recovery |
| No-JavaScript content | DOM simulation confirmed all four sample panels remain available and the inactive copy button remains hidden |
| Source review | Independent review found two small issues; explicit download behavior and stale CSP comment were fixed and rechecked |

DOM tests used LinkeDOM in an isolated QA environment. It is not included as a project dependency and does not run on the public site. DOM simulation verifies script behavior, not actual browser layout, focus rendering, clipboard permissions or assistive-technology behavior.

## Calculated color contrast

| Pair | Ratio |
| --- | --- |
| Ink `#202724` on paper `#F6F5F1` | 13.98:1 |
| Secondary `#57615B` on paper | 5.89:1 |
| Secondary `#57615B` on surface `#ECEFEA` | 5.54:1 |
| White on primary button `#245C49` | 7.77:1 |

These token pairs exceed 4.5:1. This is a source-color calculation, not a full WCAG certification.

## Not verified here

- Browser-rendered desktop/mobile layouts, actual keyboard focus and screen-reader behavior. The available browser's security policy blocked local HTTP and shared-file preview routes; no alternative browser or workaround was used.
- Live deployment on Cloudflare Pages, Vercel or GitHub Pages. Configurations follow the cited official documentation but have not run in the owner's accounts.
- Public availability or identity of the supplied LinkedIn/GitHub pages or the original Drive document folders. Web retrieval could not verify them. Local samples are independent of those links.
- Real-world performance scores, search indexing, user conversion rate or client outcomes.

## Final user-side browser check

Run `npm run verify`, then `npm start`. At `http://localhost:4173`, inspect the page at 390px and 1280px widths, and at 200% zoom. Confirm the primary CTA remains easy to find, no text overflows, the four tabs work with arrow keys, all three samples open/download, and the copy utility gives useful feedback. Repeat on the deployed URL and verify the original document folders while signed out.

No unresolved source-review findings remain within the two-item correction scope. Visual and deployed-host verification remain outside that verdict.
