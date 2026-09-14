# AAO · Technology Risk & AI Governance

An executive portfolio and engineering workbench connecting risk decisions with inspectable control evidence.

## What works

- Responsive light/dark/system portfolio, supplied AAO identity, and direct interview contact.
- Fifteen source risk scenarios with category filters, appetite comparison and matrix exploration.
- Ten domains in one deep-linked governance workbench.
- Versioned vendor decisions with explicit blockers, JSON export and a print report.
- Python evidence assessment, bounded GitHub alert collection, OPA policies, OSCAL definitions and local MCP tools.

```bash
npm test
npm run build
npm run check
npm start
```

Open `http://127.0.0.1:4173`. Node 22+ is required. No frontend dependency installation is needed.

For the Python, policy and MCP checks:

```bash
python -m pip install -r requirements.txt
python -m unittest discover -s tests -v
python scripts/validate_oscal.py
python scripts/install_opa.py
.tools/opa test policies -v
python -m engine.mcp_client
```

## Deployment

Cloudflare Pages: build `npm run build`, output `dist`, or upload the separate public ZIP. Vercel uses the included static configuration. GitHub Pages uses the provided workflow and relative paths. See [execution guide](docs/EXECUTION-GUIDE.md).

## Evidence and scope

The public risk register is a scenario dataset. The included CCM snapshot is sample evidence, not a connected customer environment. Current API collection requires authorized credentials and publication configuration. Historical residual scores are preserved; exploratory matrix positions remain session-only. No tool automatically approves a vendor or determines legal compliance.

Raw historical evidence remains outside the public build. Source records are preserved under `data/baseline/`.

## Read further

- [Modernization map](docs/MODERNIZATION.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Validation results](docs/VALIDATION.md)
- [Interview walkthroughs](docs/LOOM-SCRIPTS.md)
- [LinkedIn copy](docs/LINKEDIN.md)
- [Changes](docs/CHANGELOG.md)
