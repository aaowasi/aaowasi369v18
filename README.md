# GRC & AI Governance Engine

An independent portfolio by **Md. Abdullah Al Owasi**. Inspect the path from a requirement to a technical test, evidence record and accountable decision.

The public portal contains a modeled 15-risk register, ten project domains, a filterable risk heatmap, CCM snapshots and a local vendor-intake sandbox. The Python engine adds bounded GitHub evidence collection, IAM account-summary checks, local prompt screening and a stdio MCP server. OPA evaluates selected AI governance evidence assertions. OSCAL describes original operational controls.

## Run the portal

Node.js 22+ and Python 3.12 are required for these commands. The frontend has no package dependencies.

```bash
npm run build
npm run check
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

Open http://127.0.0.1:4173. Do not open `index.html` using `file://`; browsers restrict JSON fetches there.

## Run and verify the engine

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
python -m unittest discover -s tests -v
python scripts/validate_oscal.py
python scripts/install_opa.py
.tools/opa test policies -v
.tools/opa eval --data policies --input fixtures/ai-system.json data.aao.ai.result
python -m engine.ingest --mode demo
python -m engine.mcp_client
```

On Windows, activate with `.venv\Scripts\Activate.ps1`. Use Docker for OPA: `docker compose run --rm opa test /policies -v`.

## Local suite

```bash
docker compose up -d portal opa
docker compose build mcp
docker compose run --rm --no-deps -T mcp
```

The portal binds to http://127.0.0.1:8080; OPA binds to http://127.0.0.1:8181. MCP uses stdio and exposes no network endpoint. Configure your MCP client's working directory to this repository when using `mcp.json`.

## What the results mean

| Label | Meaning |
|---|---|
| Modeled | Historical scenario data imported from the supplied portfolio workbook |
| Demo | Executed code against fixed fixtures; not a live cloud connection |
| Live | An API collection was attempted; inspect each check's result and observation time |
| Pass | The narrowly stated technical test passed |
| Fail | The narrowly stated technical condition was not met |
| Unknown | Missing, malformed or unavailable evidence prevents a conclusion |
| Stale | Evidence is outside its freshness window |

The repository does not claim SOC 2 assurance, ISO certification, legal compliance, observed client savings, enterprise-wide shadow-AI detection or a production service-level agreement. OPA checks declarations; it does not authenticate synthetic-content provenance. Historical vendor decisions are unverified model records.

Read [the six-part execution guide](docs/EXECUTION-GUIDE.md), [the design prompt](docs/MASTER-DESIGN-PROMPT.md), [LinkedIn copy](docs/LINKEDIN.md), and [validation status](docs/VALIDATION.md). Every source file is included; no pseudocode replacement is required to run the supplied demonstration.

## Public deployment

Use Cloudflare Pages with `npm run build` and output `dist`. GitHub Pages and Vercel configurations are included. The scheduled CCM workflow uploads sanitized reports; continuous Cloudflare publication requires the scoped deployment credentials described in the guide. No paid APIs or hosted database are required.

## Evidence archive

Historical files are excluded from `dist`. `archive/baseline-manifest.json` identifies duplicates and preserves hashes. Do not upload unreviewed personal or confidential source files to a public release. Enable GitHub immutable releases before publishing a reviewed evidence bundle; a tag alone is insufficient.
