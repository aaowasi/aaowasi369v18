# Validation record

This record reports executed checks separately from deployment prerequisites. It does not certify the system for a client environment.

| Check | Result |
|---|---|
| Python behavior tests | Passed: missing/malformed evidence, stale/future observations, root-key finding, pagination, proper mappings, human vendor review and prompt minimization |
| OPA 1.20.2 | Seven policy tests passed |
| OSCAL 1.1.3 catalog | Validated against the bundled official NIST schema |
| OSCAL 1.1.3 component definition | Validated against the bundled official NIST schema; local control IDs resolve |
| MCP | Actual stdio initialize, list-tools and risk-query round trip passed |
| Static build | Public-only `dist/` generated |
| HTML link checks | Thirteen pages passed local-link and viewport checks |
| Copy hygiene | Low formulaic-text density; no claim of human authorship is made by this check |
| Raw evidence | Excluded from the public build; original AAO image copied without modification |

## Pending environment checks

- Physical iOS/Android, Firefox and WebKit device checks have not been executed.
- Docker Compose services and the optional CISO Assistant installation have not been run here.
- No authorized live AWS source or Dependabot read token was supplied to the collector. Packaged technical results use explicit demonstration fixtures.
- Cloudflare deployment and browser verification must be confirmed against the returned deployment result; do not infer success from a GitHub write alone.
- GitHub immutable release publication requires a reviewed public evidence selection and verification of repository immutability settings.
- The new preferred GitHub repository name is a deployment instruction until actually created. Existing-repository changes are reported separately.
- LinkedIn was signed out. Profile text is prepared in `LINKEDIN.md`; no remote profile edit is claimed.
- Figma reported a Starter plan with a View seat. No editable Figma artifact is claimed.

The MCP dependency emitted a Pydantic settings forward-reference warning during initialization; protocol operations succeeded. Treat dependency upgrades as reviewed changes and rerun the round-trip test. The public frontend does not load any Python/MCP dependency.
