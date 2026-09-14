# AAO Executive Portfolio: Master Implementation Prompt

Act as a principal frontend engineer, executive GRC architect, and security hiring manager. Improve Abdullah Al Owasi's supplied portfolio into a refined, fast, evidence-backed recruitment website. Execute the work, test it, and deliver deployable files. Make routine design and engineering decisions autonomously.

## 1. Objective and decision hierarchy

Help a CISO, Head of GRC, or Security Engineering Director understand within 10 seconds what Abdullah can contribute, inspect credible work within 60 seconds, and initiate an interview within two clicks.

Position the work for mid-to-senior Technology Risk, GRC, Security Assurance, and AI Governance opportunities through the quality of decisions, controls, and engineering. Use verified experience when naming seniority. Never invent employers, ownership, certifications, integrations, production usage, or business results. Hiring is the conversion objective, not a promised outcome.

Resolve competing requirements in this order:
1. Accuracy, security, and working functionality.
2. Recruiter comprehension and interview conversion.
3. Accessibility, responsiveness, and performance.
4. Maintainability and zero required financial spend.
5. Editorial luxury and purposeful motion.

Target roughly 85% of visible narrative at business problems, decisions, and outcomes. Place implementation mechanics in expandable evidence panels and repository documentation. Keep enough source context beside data for readers to understand what it represents. Remove repeated defensive prose from the hero and footer.

## 2. Inspect the actual inputs

Inputs supplied with this project:
- `AAO-Portfolio-v20-Cloudflare-Upload.zip`: built public website.
- `AAO-Portfolio-v18-GitHub-Deploy(1).zip`: engineering repository under `grc-ai-governance-engine/`.
- `AAO-Historical-Evidence.zip`: historical objects and provenance manifest.
- `AAO 8(4).png`: master AAO brand artwork.
- Seven screenshots showing the existing interface.
- Current website: https://06551a3a.aaowasi369v18.pages.dev/
- GitHub: https://github.com/aaowasi
- LinkedIn: https://www.linkedin.com/in/aaowasi/
- Contact confirmed in the supplied HTML: abdullahalowasi369@gmail.com.

Do not choose a baseline solely by ZIP filename. The archive named v18 contains package version 20.0.0. Compare source, generated assets, data, and timestamps. Preserve useful code and route compatibility.

Known starting structure includes `site/`, `engine/ingest.py`, `engine/decisions.py`, `engine/mcp_server.py`, `engine/mcp_client.py`, `policies/`, `oscal/`, `schemas/`, `scripts/`, and `.github/workflows/`. Audit these before replacing them. An existing implementation does not imply it has passed tests.

The supplied telemetry JSON has `mode: demo` and dated sample findings. The scheduled workflow runs every six hours. Neither establishes real-time AWS monitoring. Identify the actual collection-to-publication path and its permissions before describing it as active.

Inspect the provided reference sites for relevant composition and interaction patterns: Awwwards, Godly, 21st.dev, and MotionSites. Extract principles, not entire layouts or unlicensed assets. Review linked videos only through accessible content or transcripts. Record inaccessible references without claiming to have watched them. They must not block the build.

## 3. Visual direction

Design read: an executive security portfolio with editorial restraint and a precise operational dashboard.

Use a calm, architectural visual language. The landing narrative can be asymmetrical. The dashboard must be orderly and easy to compare. Avoid decorative terminals, hacker imagery, logo walls, stock shields, fake certification badges, excessive glass effects, repeating equal-card grids, animated backgrounds, and distracting marquees.

Use an obsidian canvas, soft ivory text, and restrained silver that matches the supplied identity. Gold is unnecessary unless the actual brand treatment supports it. Semantic risk colors are reserved for data and must also have text labels or symbols.

Starting tokens:

```css
:root {
  color-scheme: dark;
  --canvas: #0b0f17;
  --surface: #141923;
  --surface-raised: #1b2230;
  --text: #eeede9;
  --muted: #b1b7c2;
  --accent: #c4ccd6;
  --line: #354050;
  --success: #72c8aa;
  --warning: #dfbd78;
  --danger: #e39b9b;
  --display: "Cormorant Garamond", Georgia, serif;
  --body: "Source Sans 3", "Helvetica Neue", Arial, sans-serif;
  --content: 80rem;
  --gutter: clamp(1rem, 4vw, 4rem);
  --section-space: clamp(3.5rem, 7vw, 7rem);
  --h1: clamp(2.75rem, 6.5vw, 6.75rem);
  --radius: 0.375rem;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
[data-theme="light"] {
  color-scheme: light;
  --canvas: #f7f7f5;
  --surface: #eeeeeb;
  --surface-raised: #e5e7e7;
  --text: #1a1e25;
  --muted: #555e6b;
  --accent: #465363;
  --line: #c4c8ce;
  --success: #226b51;
  --warning: #785416;
  --danger: #a4323d;
}
```

Verify actual contrast for each usage and adjust tokens where needed. Self-host open-license fonts and include license files. Keep the existing Source Sans assets if sound. Use a serif only for display headings, sans-serif for interface text, and tabular numerals for metrics. Body copy should remain at least 16px with comfortable line height. Limit prose to about 65 characters per line. Do not force oversized headings into clipped fixed heights.

Use a 12-column desktop grid, 8-column tablet grid, and a single-column mobile reading order. Maintain an 80rem content cap with fluid gutters. Tables can occupy the full container. Use whitespace and fine dividers to group content. Bounded panels are appropriate for forms and risk tools even when the marketing sections are borderless.

## 4. Logo and navigation

Use the supplied identity, preserving the two A forms, O, sweep, divider, and name. The supplied PNG is a wide presentation image with a textured dark background, not a transparent vector mark. Do not stretch the entire image into a 36px-high strip and make the name unreadable. Do not call a raster wrapped in SVG a vector logo.

Prefer an available authentic transparent logo. If only the supplied PNG exists, preserve it and create an appropriate approved derivative using available image tools. Inspect any generated derivative for geometry changes. If a faithful extraction is unavailable, use a carefully fitted dark brand plaque in both themes and document the asset limitation. Never invert the entire textured presentation image.

The visible monogram should occupy approximately 32–40px of header height. Use a compact monogram on narrow screens and the full lockup where legible. Set intrinsic dimensions, meaningful alt text, and a home link. Do not add a redundant plain-text AAO beside the logo.

Navigation: Work, Risk Engine, Contact. Primary CTA: “Discuss a role”. Secondary destination: GitHub. Offer System, Light, and Dark theme settings. Respect system preference initially, persist explicit choice, and prevent a theme flash without violating the deployed CSP.

Keep Back, Forward, Home, and Back to top controls. Use browser history for Back and Forward. Do not guess forward-history availability from `history.length`. Provide Home as a dependable escape route. Deep-linked domain views also need Previous domain, All domains, and Next domain navigation. Avoid pushing a history entry on every form change.

## 5. Required page wireframe and copy

### A. Hero

Eyebrow: “TECHNOLOGY RISK · GRC · AI GOVERNANCE”

Headline: “Technology risk and AI governance, engineered.”

Supporting copy: “I build evidence pipelines, policy checks, and risk decision tools that help teams prepare for audits and govern AI adoption.”

Primary CTA: “Discuss a role”, opening the confirmed email address with a useful subject.
Secondary CTA: “Explore the risk engine”, linking to the interactive dashboard.

Improve this copy if stronger wording is supported by the artifacts. Keep the hero understandable to a hiring manager. Do not use “70% reduction”, “120 hours saved”, “99.8% telemetry”, “24/7 audit-ready”, or “15/15 live domains” without a reproducible source, denominator, time period, and scope. Derive project and risk counts from validated data. Prefer three specific capabilities over invented performance metrics.

### B. Selected outcomes

Introduce three expandable work narratives: audit evidence automation, AI governance decisions, and vendor assurance. Each must contain:
- The business problem and its operational consequence.
- The implemented decision or control.
- What the artifact demonstrates.
- A measured result if supported, otherwise the precise capability delivered.
- A working evidence or code link.

For example, “Map control checks to traceable evidence and route exceptions for review” is acceptable when implemented. “Reduced client audit preparation by 70%” requires actual client evidence.

### C. Executive risk engine

Provide an interactive 5×5 likelihood-versus-impact matrix with Inherent and Residual views. Switching view must recalculate marker placement and counts. Clicking a populated cell filters the register. Keyboard users must be able to reach the same results. Provide an accessible table alternative.

Use these four categories consistently:
1. AI Reliability & Data Loss.
2. Third-Party & Supply Chain.
3. Regulatory & Privacy Compliance.
4. Infrastructure Security.

Display appetite breaches, assessed risks, overdue actions, and coverage only when the dataset supports each measure. Define denominators. Do not equate domain count with tested controls. For ordinal risk scores, show inherent-to-residual movement without implying a measured percentage reduction in financial risk.

The detail panel shows scenario, business exposure, owner where known, inherent score, residual score, key control, next action, due date where known, and evidence source. Unknown ownership remains unassigned. Never silently invent remediation dates.

Use clear control states: Healthy, Action required, Evidence overdue, Not connected, and Check unavailable. Preserve the underlying technical result in details. A failed control is a finding, not a broken page. Explain consequence and next step without pretending it passed.

Show source observation time separately from last fetch time. Use “Latest collection” for scheduled data. Identify sample data locally as “Scenario dataset” and describe its origin in the source panel. Never simulate live integrations with random timers or advancing timestamps. A real event feed must be backed by actual events.

### D. Unified ten-domain workbench

Consolidate browsing into one full-width interactive workspace. Use three accessible groups with deep-linked domain selection, then a vertical selector or native select on mobile. Avoid ten cramped horizontal tabs.

| Group | Domains | Decision focus |
|---|---|---|
| Assurance & Customer Trust | 1, 4, 8, 9 | Evidence reuse, audit readiness, procurement responses, processor obligations |
| AI Governance | 2, 3, 6, 7 | AI inventory, vendor decisions, transparency controls, data egress |
| Continuous Monitoring & Executive Risk | 5, 10 | Exceptions, risk appetite, remediation, collection freshness |

Retain all ten domain names and map each to a business question, actual code/data artifacts, control coverage, evidence, and unresolved implementation work. Existing project URLs must remain valid or redirect reliably on supported hosts.

### E. Vendor decision engine

Build a functioning deterministic evaluation form covering service criticality, personal data, sensitive data where supported, processor agreement, subprocessors, training permissions, and security evidence.

Return a reproducible score, decision reasons, blocking conditions, required evidence, and next review action. A hard-stop legal or security condition must override a reassuring aggregate score. Explain how unknown answers affect the decision. Provide reset and downloadable JSON plus a print-ready report containing inputs, rule version, timestamp, score, and recommendation.

Name it “Vendor decision engine”. A local policy engine does not need an LLM to be useful. Do not imply it queried enterprise systems when it evaluated browser inputs. Keep human approval boundaries in the report rather than repeated marketing disclaimers.

### F. Engineering proof

Show only verified repositories and implemented capabilities. Validate links before publishing. Use concise capability labels for Python, GitHub Actions, Rego, OSCAL, MCP, and evidence parsing when supported by working artifacts.

Vanta, Drata, ServiceNow GRC, OneTrust, AWS Audit Manager, Datadog, and Splunk may appear as implemented integrations only when demonstrated. Otherwise describe a specific tested adapter contract or omit the platform. A logo is not evidence of proficiency. Do not invent repository names or call unvalidated code production-ready.

### G. Contact

Headline: “Build a clearer path from risk to decision.”

Supporting copy: “Discuss a Technology Risk, GRC, or AI Governance role.”

Include the confirmed email, LinkedIn, GitHub, and an actual resume download if available. Keep “Download resume” recognizable. An optional capability statement must be a real document. Avoid a booking button without a valid booking destination. Remove long biography sections and repeat disclaimers.

## 6. Interaction logic

- Page load → apply theme → render essential content → load validated dashboard data → show source time.
- Dataset success → compute counts and charts from one shared state → announce completion politely.
- Category or matrix selection → update filtered register → retain context and focus → update result count.
- Inherent/residual toggle → update matrix and selected records consistently.
- Domain selection → update content and shareable URL → browser Back restores the prior selection.
- Vendor submission → validate → evaluate versioned rules → show reasons → enable report export.
- Fetch failure → show a useful inline message → retain last valid data with its original timestamp → offer retry.
- Theme selection → persist → update charts and focus colors without losing form state.

Use native scrolling. CSS transitions handle hovers and focus. Editorial reveals may use opacity and up to 16px movement over 450–650ms. Frequent controls should respond within 100–200ms. Respect reduced motion, avoid scroll hijacking and cursor replacements, and keep content visible if JavaScript fails. Do not install animation or toast libraries unless a real interaction requires them.

## 7. Architecture and zero-cost deployment

Start with the existing static HTML, CSS, JavaScript, and Node build. It already suits this portable public portfolio. Refactor into modules where needed. Adopt a framework only if a concrete requirement justifies migration. A native CSS matrix and local state are sufficient for this dataset. A hosted database and SSR are not default requirements.

Use the existing Cloudflare Pages project as primary, with a portable static build for GitHub Pages and Vercel. Verify current free-tier terms and quotas from official documentation. Vercel Hobby has personal/non-commercial restrictions that must be checked against the site's actual use. Do not add a paid trial, required card, paid font, paid LLM, or mandatory paid BI embed.

Prefer native responsive charts over third-party BI embeds for the public site. Evaluate Tableau Public, Power BI, and Grafana only if they add a specific capability. Public publishing must not expose confidential data. Free desktop authoring does not establish free private embedding.

Keep privileged collection outside the browser. Use GitHub Actions with bounded scheduled jobs, least-privilege credentials, and public-safe JSON outputs. The offline site remains usable without credentials. Optional AWS sources require an existing authorized account and a clear service-cost assessment. Local Docker runs on the user's machine and is not free hosted infrastructure.

Return exact build/output settings and deployment commands for the finished implementation. Support GitHub Pages repository subpaths and direct route reloads. Do not promise universal flawless operation. Test a documented device/browser matrix and report the actual results.

## 8. Modernize all ten domains

For every row, inspect and identify specific existing artifacts to retain, retire, migrate, or archive. Do not delete signed policies or useful human-readable evidence merely because the file format is Word or Excel.

| Domain | Modern replacement or improvement |
|---|---|
| 1. Enterprise Trust & Customer Assurance | Reusable evidence-backed assurance statements with source, approval, expiry, and public/private classification |
| 2. AI Governance Operating System | Versioned AI inventory, use-case assessment, accountable owner, review workflow, policy checks |
| 3. Third-Party & AI Subprocessor Decisions | Versioned intake schemas, deterministic triage, blocking conditions, reasons, review record |
| 4. SOC 2 & ISO 27001 Audit Readiness | Control-to-evidence mappings, OSCAL artifacts, tests, provenance, freshness, scoped coverage |
| 5. Executive Technology Risk & KRIs | Shared risk dataset, appetite rules, inherent/residual views, defined KRI denominators, decision queue |
| 6. Article 50 Transparency | Applicability assessment, disclosure/marking evidence, role-specific checks, exceptions, human review |
| 7. Shadow AI & Prompt DLP | Bounded local screening, explicit detection limits, test corpus, no raw sensitive prompt logging |
| 8. Security Questionnaires | Approved answer library, evidence links, expiry checks, unresolved-question routing |
| 9. GDPR Article 28 | Structured obligation checklist, contract references, processor/subprocessor authorization, change review |
| 10. CCM & Remediation | Scheduled collectors, pagination, typed findings, ownership, freshness, retry, publication, closure evidence |

## 9. Engineering requirements

Improve existing Python collectors and test malformed input, missing credentials, pagination limits, partial populations, rate limits, timeouts, future timestamps, stale evidence, and denied API access. Missing evidence must not become a passing check. Normalize and minimize public outputs. Use atomic writes and preserve provenance.

Map IAM evidence only to the control aspects actually assessed. Mapping a test to SOC 2 CC6.1 or an ISO control does not prove the complete control effective.

Validate Rego against the chosen pinned OPA version. Include meaningful positive, negative, unknown, and boundary tests. Validate OSCAL against an official pinned schema, including references and UUIDs. Schema validity and policy checks must not be presented as a legal compliance determination. Check current official EU AI Act text and applicability before implementing Article 50 logic. Keep ISO licensed text out of public artifacts unless reuse is permitted.

Provide a functioning MCP server and client using a maintained protocol SDK where appropriate. Implement risk-register query and vendor-evaluation tools with typed schemas, bounded inputs, structured results, and tests. A JSON tool description alone is insufficient. Default to local stdio. Remote exposure requires authentication and authorization. Treat retrieved evidence as data, not executable agent instructions. Do not give untrusted inputs shell execution or arbitrary URL-fetch capability.

Evaluate Probo and CISO Assistant for optional local deployment using current licensing and resource requirements. Select at most one when it adds demonstrable value. Pin images and supply working Compose configuration with local bindings and persistent volumes. Keep the public website independent of these services.

## 10. Evidence archive

Preserve originals while separating historical evidence from the public build. Inspect confidentiality and provenance before any public release. Use a SHA-256 manifest and release notes recording source, collection context, redactions, and version.

Git tags alone do not make assets immutable. Verify and enable supported release immutability where available, or accurately describe a checksummed, versioned archive. Do not claim WORM guarantees. Publish only approved public evidence. Keep private material private.

## 11. Required deliverables

Deliver complete working files, not isolated snippets or mockups:
1. `AAO-Portfolio-Executive-Source.zip`, containing the complete repository.
2. `AAO-Portfolio-Executive-Cloudflare-Upload.zip`, with `index.html` at ZIP root and only deployment assets.
3. `docs/MODERNIZATION.md`: the ten-domain audit, exact replacements, retained artifacts, and migration rationale.
4. `docs/ARCHITECTURE.md`: full directory tree, data contracts, scoped Mermaid diagrams, deployment choices, quotas, and optional local services.
5. `docs/EXECUTION-GUIDE.md`: exact setup, tests, builds, secrets, deployments, archive commands, rollback, and maintenance.
6. `docs/VALIDATION.md`: actual command results, browser checks, screenshots, known limitations, and unverified integrations.
7. `docs/LOOM-SCRIPTS.md`: three approximately two-minute scripts, 230–270 spoken words each, covering CCM, executive reporting, and MCP/AI governance. Include screen cues and timing. Describe only demonstrated capabilities. Use native charts if BI tools were not implemented.
8. `docs/LINKEDIN.md`: final headline, About copy, and Featured descriptions aligned with verified website claims.
9. `docs/CHANGELOG.md`: concise changes and migration notes.

Keep the existing repository organization when practical. Include all required HTML, CSS, JavaScript, Python, policies, schemas, tests, workflow YAML, Docker files, configuration, licenses, and README. No omitted-file placeholders. Exclude secrets, private evidence, caches, and dependencies from distributable ZIPs.

## 12. Execution and acceptance

Execute in this order: inventory inputs → inspect source and visuals → select baseline → record architecture → implement brand/navigation/hero → consolidate domains → complete risk and vendor tools → repair engineering paths → test → package → deploy when authorized access is available → verify public URLs.

For requested connected apps, use only relevant available capabilities. GitHub supports source and releases, Vercel deployment, Figma design work, and Linear/Notion task documentation when appropriate. Google Drive can supply missing project evidence. Do not search unrelated email or create unnecessary app artifacts. Sending email requires explicit authorization. Update LinkedIn only through an available authorized interface, otherwise supply exact paste-ready copy and identify the access limitation. Never report a remote change that was only prepared locally.

Verify at 320, 375, 390, 768, 1024, 1280, 1440, and 1920px, plus an ultrawide layout. Test Chromium, Firefox, and WebKit where available. Distinguish emulation from physical-device tests. Check portrait/landscape, light/dark/system themes, keyboard, screen-reader labels, reduced motion, 200% zoom, and 400% reflow.

Acceptance gates:
- Contact is reachable within two clicks and opens a valid destination.
- Logo remains legible without distortion in both themes.
- No document-level horizontal overflow or clipped essential text.
- Risk filters, matrix modes, domain navigation, browser history, vendor evaluation, reset, and exports work.
- Initial HTML retains useful content without JavaScript.
- No fake streaming, fabricated savings, unsupported platform proficiency, or invented client claims.
- Loading, empty, stale, disconnected, and error states are meaningful.
- Console and link checks have no unexplained failures.
- Policy tests, Python tests, schema validation, and static build pass.
- Public output contains no credentials, raw sensitive prompts, contracts, or private evidence.
- Security headers are compatible with theme initialization and approved assets.
- Target mobile Lighthouse performance and accessibility scores of at least 90, then report measured results rather than asserting them. Target LCP under 2.5s and CLS under 0.1 in the tested conditions. Distinguish lab metrics from field data.

The debugging guide must cover base-path 404s, SPA/deep-link failures, incorrect MIME types, CSP conflicts, CORS, stale caches, build-version drift, expired credentials, API permissions, rate limits, disabled schedules, overlapping deployments, invalid evidence, chart overflow, and embed permissions if embeds exist. For each give symptom, cause, prevention, and recovery.

Maintenance must validate new data before atomic publication, preserve source times, refresh the public build through one defined pipeline, retain a last-known-good deployment, and test rollback. Avoid collection schedules that exceed free-tier limits.

Finish with links to the two ZIPs, a short explanation of the chosen design, verified deployment status, and only material outstanding access requirements. Do not stop at a design proposal. Make the result concrete and reviewable.
