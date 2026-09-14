# Execute, deploy and maintain

## Local setup

Use Node 22 or later and Python 3.12. From the source ZIP, enter `grc-ai-governance-engine`.

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
npm test
python -m unittest discover -s tests -v
python scripts/validate_oscal.py
python scripts/install_opa.py
.tools/opa test policies -v
python -m engine.mcp_client
npm run build
npm run check
npm start
```

Open `http://127.0.0.1:4173`. On Windows activate with `.venv\Scripts\Activate.ps1`. The OPA installer supports Linux x86-64. On other platforms use `docker compose run --rm opa test /policies -v`. Never open `index.html` through `file://` when testing fetch-based widgets.

## Cloudflare Pages: existing project

The upload ZIP has `index.html` at its root. Use the existing `aaowasi369v18` Pages project in the Cloudflare dashboard, create a deployment, and upload the ZIP or extracted public files. For a Git-integrated project use build command `npm run build`, output `dist`, root at the repository root, Node 22 or later. Keep only one production deployment owner to prevent competing builds.

CLI alternative for an existing authorized account:

```bash
npx wrangler@4.131.1 login
npm run build
npm run check
npx wrangler@4.131.1 pages deploy dist --project-name aaowasi369v18 --branch main
```

A deployment hash URL is a snapshot. Verify the production alias after deployment, including an existing domain route and JSON fetch. This task does not have Cloudflare credentials and does not claim the original Pages URL was updated.

## GitHub source and Pages

The source changes are on `executive-portfolio-v21` in `aaowasi/aaowasi369v18`, pull request 2. Review the final checks and merge through the normal repository process. If deploying from an extracted ZIP to a separate repository, create the repository in your GitHub account first and use its actual remote URL.

```bash
git clone https://github.com/aaowasi/aaowasi369v18.git
cd aaowasi369v18
git switch executive-portfolio-v21
npm test
npm run build
npm run check
```

To use GitHub Pages, choose Settings → Pages → Source: GitHub Actions, and set repository variable `DEPLOY_PROVIDER` to `github-pages`. `.github/workflows/pages.yml` deploys on main pushes or manual dispatch. Relative assets and real HTML directories support repository subpaths. No SPA catch-all is required. GitHub Pages cannot apply Cloudflare `_headers`; do not assume equivalent response headers.

## Vercel

Import the source repository with Framework: Other, build command `npm run build`, output `dist`. The included `vercel.json` supplies response headers and data cache rules. Alternatively, deploy the public `dist` files as a static deployment. Use a personal portfolio within the current Hobby terms. No paid add-on is required for this build.

```bash
npx vercel login
npx vercel link
npx vercel deploy
```

After verifying the preview:

```bash
npx vercel deploy --prod
```

Protected previews may require account access. Do not remove deployment protection merely to make a verification tool work. The delivered production URL and actual verification status are recorded separately in `VALIDATION.md`.

## Evidence collection

Offline scenario collection:

```bash
python -m engine.ingest --mode demo --output /tmp/aao-scenario-ccm.json
```

This does not refresh the historical observation time. To read current GitHub dependency alerts, configure `GRC_GITHUB_TOKEN` using an appropriately scoped repository secret, with read access to Dependabot alerts on the target repository. Do not paste credentials into source, CLI arguments, or browser code. The collector reads `GRC_GITHUB_TOKEN` from the environment.

```bash
python -m engine.ingest --mode live --repo aaowasi/aaowasi369v18 --output site/data/ccm.json
npm run build
npm run check
```

For IAM evidence, supply a private JSON file containing `observed_at` in UTC and `payload.SummaryMap.AccountMFAEnabled` / `AccountAccessKeysPresent` as integers 0 or 1. The existing collector assesses this input; it does not itself authenticate to AWS. Obtain the account summary only through an authorized AWS collection process. Passing root checks establishes only the stated root-identity test scope.

```bash
python -m engine.ingest --mode live --repo aaowasi/aaowasi369v18 --iam /secure/iam-summary.json --output site/data/ccm.json
```

The six-hour workflow is `.github/workflows/ccm.yml`. For Cloudflare publication set `DEPLOY_PROVIDER=cloudflare`, repository variable `CF_PAGES_PROJECT=aaowasi369v18`, and secrets `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, and `GRC_GITHUB_TOKEN`. Use a Cloudflare token scoped to the intended account/project. Test with workflow dispatch and inspect its published snapshot. Scheduled Actions are not streaming telemetry and may be delayed or disabled by platform policies.

For GitHub Pages or Vercel, the supplied scheduled workflow retains a result artifact but does not automatically publish that snapshot to those hosts. Download and review the artifact, replace `site/data/ccm.json`, then build/deploy through the selected host. Do not advertise unattended publication on those hosts until a dedicated authorized publication workflow is configured.

## Local services and MCP

```bash
docker compose up -d portal opa
docker compose logs --tail=50 portal opa
python -m engine.mcp_server
```

The MCP server uses stdio. Register `mcp.json` with a compatible client from the repository's working directory and installed Python environment. Available tools: `query_risks`, `evaluate_vendor_security`, `screen_prompt`, `query_control_results`. Inputs are bounded and no tool executes arbitrary shell commands or fetches arbitrary URLs.

```bash
python -m engine.mcp_client
docker compose down
```

Docker uses the local machine and its existing resources. It is not free hosted infrastructure. The public site does not require Docker or an always-on server.

## Evidence archive

The existing `AAO-Historical-Evidence.zip` remains separate. Review confidentiality before public release. Put only approved material in a dedicated `reviewed-evidence` directory, then run:

```bash
python scripts/archive.py reviewed-evidence AAO-Reviewed-Evidence.zip
sha256sum -c AAO-Reviewed-Evidence.zip.sha256
```

A new archive path is required because the command refuses overwrite. After reviewing the manifest and confirming public suitability:

```bash
git tag -a evidence-baseline-2026-09-14 -m "Reviewed evidence baseline"
git push origin evidence-baseline-2026-09-14
gh release create evidence-baseline-2026-09-14 AAO-Reviewed-Evidence.zip AAO-Reviewed-Evidence.zip.sha256 --draft --title "Reviewed evidence baseline" --notes-file archive/RELEASE-NOTES.md
```

Review the draft assets before publishing. A tag and hash provide versioning and tamper detection, not WORM storage. Enable supported release immutability if required and verify its actual status. This task did not publish raw historical evidence.

## Browser verification

```bash
npm install --no-save playwright@1.58.2
npx playwright install --with-deps chromium firefox webkit
npm start
```

In a second shell run `node scripts/browser-check.mjs`. Results and screenshots are written under `docs/verification/`. For a public test set `TEST_URL` to the verified deployment URL. The script checks nine widths, two themes, three browser engines, category filtering, residual exploration, domain navigation, vendor blockers, reset and JSON export. Real-device and assistive-technology checks still need the named hardware/tools.

## Failure prevention and recovery

| Symptom | Likely cause | Prevention / recovery |
|---|---|---|
| Blank widgets on local files | `file://` blocks fetch/module loading | Use `npm start` and the localhost URL |
| GitHub Pages assets 404 | Root-relative URLs or wrong output folder | Keep relative URLs; deploy `dist`; verify a nested `work/` route |
| Deep links 404 | SPA-only routing assumptions | Keep generated HTML folders and deploy them together |
| JS returned as HTML | Catch-all rewrite or wrong MIME | Remove SPA catch-all; confirm asset path and JavaScript MIME |
| Theme flashes or script blocked | Inline theme code rejected by CSP | Use the included same-origin `theme.js` in the head |
| Dashboard fetch fails | Wrong origin/path, denied access, malformed JSON | Same-origin `data/` files; validate schema before publication; retain prior snapshot |
| Cross-origin API request rejected | Browser-to-provider integration | Collect server-side in Actions and publish sanitized JSON |
| Evidence stays old | Build reused an old snapshot or another deployment overwrote it | Check source observation time, collection artifact, deployment branch and active production owner |
| API collection is unknown | Missing/expired token, unavailable feature, permission denial | Verify token scope and repository feature; keep unknown until a successful collection |
| Rate limit / timeout | Large population or provider degradation | Collector uses bounded retries and pagination; inspect workflow then retry later |
| Scheduled updates stop | Disabled schedule, inactive repository, queue delay | Enable workflow and perform a manual run; do not promise real-time freshness |
| OPA install fails | Unsupported OS, missing release, digest mismatch | Use pinned Docker image or verify official release/digest before changing pin |
| Build/version mismatch | Wrong source root or old Node | Node 22+; repository root; `npm run build`; verify package version |
| Mobile overflow | Fixed widths or long labels | Fluid grid, wrapping, tested 320px viewport; inspect complete page width |
| BI embed denied | Private dashboard or paid embedding requirement | Use shipped native charts; no external embed is required |
| Concurrent deploys replace evidence | Multiple providers/workflows own production | One production publication path, workflow concurrency, verify commit/source time |
| Vendor score looks reassuring despite missing terms | Treating a score as approval | The decision gate overrides score and requires human review |

## Maintenance and rollback

1. Edit versioned source data or run the authorized collector. Preserve `observed_at`; never substitute fetch time.
2. Run unit tests, schema/policy checks and the public build before deployment.
3. Confirm public output excludes raw evidence and secrets.
4. Publish a complete deployment atomically. Validate homepage, nested route, JSON and primary contact.
5. If validation fails, promote the prior known-good deployment using the host's rollback controls. Keep the failed build for diagnosis.
6. For code rollback, revert the specific commit through Git and redeploy. Avoid force-pushing shared history.

The static site remains available independently of a collection failure. A retained snapshot remains labeled with its original source time.
