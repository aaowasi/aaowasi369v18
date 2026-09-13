# AAO portfolio: implementation prompt

Act as a principal frontend architect, security design engineer and conversion copywriter. Improve the supplied AAO portfolio repository and return a complete deployable implementation, not a mockup. Make autonomous decisions within the evidence and constraints below. Preserve user-owned files and Git history.

## Purpose and audience

The owner is Md. Abdullah Al Owasi, based in Petaling Jaya, Malaysia, pursuing GRC, technology risk, security assurance and AI governance opportunities. The audience is a CISO, Head of GRC or Security Engineering Director deciding whether to interview him. The core promise is **“Governance, made inspectable.”** The primary conversion is **“Discuss a role”**, linking to `mailto:abdullahalowasi369@gmail.com`. The primary exploration action is **“Explore the evidence”**, linking to the executive dashboard.

This is an independent proof-of-work portfolio. Use only claims supported by the supplied artifacts. Historical modeled risk reductions, vendor assessments and project counts must never become invented client outcomes, employment history, certifications, measured business savings or a current compliance opinion. Preserve all required AI-origin and evidence disclosures.

## Brand and visual direction

Use the supplied AAO image as the master identity. Preserve the two A forms, circular O, sweeping line, divider and tracked name. Do not regenerate the logo, fabricate vector fidelity or apply new gradients to the mark. Treat the existing background as a presentation asset. Use descriptive alt text and intrinsic dimensions. Keep the original asset and its provenance intact.

The aesthetic is editorial minimalism: architectural spacing, an asymmetrical but orderly grid, dark neutral surfaces, generous reading margins and decisive typography. It must feel credible to a security leader. No decorative security badges, stock hacker imagery, fake terminal feeds, neon, glass-card grids, marquees, scroll hijacking, artificial scarcity or invented testimonials.

Use these tokens unless an accessible improvement is supported by testing:

```css
:root {
  --bg: #101113;
  --surface: #181a1d;
  --ink: #eeede9;
  --muted: #b0b2b6;
  --accent: #c0c7cf;
  --line: #35383d;
  --serif: Georgia, 'Times New Roman', serif;
  --sans: 'Source Sans', 'Helvetica Neue', Arial, sans-serif;
  --gutter: clamp(1.25rem, 5.2vw, 7rem);
  --section: clamp(4.5rem, 9vw, 9rem);
  --ease: cubic-bezier(.16, 1, .3, 1);
}
```

Use the locally supplied Source Sans fonts and their license. Georgia is a system fallback decision, not a licensed webfont. Heading typography can use a self-hosted open-license serif if its actual files and license are included. Maintain a maximum reading width of roughly 65 characters. Keep the hero to two deliberate lines at ordinary widths; allow natural reflow with large text. Use `clamp()` rather than device-specific font sizes. Use sans-serif and tabular numerals for executive data. Do not use the serif for dense tables.

## Page structure

1. **Navigation:** AAO identity; Work, Approach, Contact. Preserve existing routes and anchor IDs. Include labeled Back, Forward and Home controls. Where browser history introspection is unsupported, maintain native browser behavior and do not invent history entries.
2. **Hero:** “Governance, / made inspectable.” Supporting sentence: “Controls you can test. Evidence you can trace. Decisions you can explain.” One primary exploration action. Keep it visible within an ordinary laptop viewport.
3. **Brand stage:** Full-width treatment of the supplied AAO identity, with space around the mark and no overlaid badges.
4. **Executive observatory:** Clearly labeled modeled data. Show counts computed from the dataset, an accessible 5×5 inherent-risk heatmap, filterable risk details, residual score and appetite, KRI definitions and thresholds, and evidence observation time. Show loading, empty, stale and error states. No fabricated trend line, measured KRI value or “live” label when the source is a fixture. Provide CSV download and a no-JavaScript fallback.
5. **Work:** Three editorial groups: assurance; AI governance; continuous monitoring. Keep all ten original domains reachable through useful detail pages with implementation paths and decision boundaries. Each page needs previous project, all domains and next project navigation.
6. **Decision sandbox:** A functional local vendor-intake form. Display what evidence is missing and why the recommendation is hold or ready for human review. Never auto-approve procurement or legal decisions. State whether execution is local and deterministic.
7. **Approach:** Concise, factual introduction to the owner. Explain scope, evidence, uncertainty and accountable decisions. Link to GitHub and LinkedIn.
8. **Contact and footer:** One clear role-discussion action, readable email address, professional links and a concise independent-work disclosure.

## Engineering architecture

Start from the existing dependency-free static frontend. Adopt a framework only if a concrete requirement justifies its build, runtime and maintenance costs. Browser interactivity does not require server rendering. Use semantic HTML, modular CSS, small JavaScript modules and same-origin JSON. Generate the deployable `dist/` directory from an explicit public allowlist. Keep raw evidence, credentials, contracts, environment files and private records outside it.

Choose Cloudflare Pages as the primary deployment for the existing project. Support GitHub Pages subpaths using relative asset links and actual HTML routes. Include Vercel static deployment configuration, subject to Hobby's personal, non-commercial terms. No database, paid LLM API, paid BI embed, account trial or payment-card-dependent service is required. Explain free-tier quotas as limits, not guarantees of unlimited future service.

The scheduled engine must separate collection time from observation time, fail closed on incomplete populations, use bounded retries and pagination, and distinguish unknown, stale and failed controls. Publish only normalized, approved data. Describe scheduled CCM as scheduled; do not market it as streaming telemetry. Retain signed human policies where necessary and add machine-readable tests beside them.

## Interaction rules

Use native scrolling. A first-exposure editorial reveal may use a 20px translate and 650ms easing; frequent controls should respond immediately. Hover movement is at most 2px with a 220ms transition, only on fine pointers. Animate transforms and opacity. Do not animate table sorting, keyboard navigation or repeated filtering. Respect `prefers-reduced-motion`. Keep content visible when JavaScript fails. No autoplay media, custom cursor or blocking loading animation.

Data flow: load and validate JSON → compute displayed counts → render semantic controls → filter without altering source data → preserve explicit source mode → refresh the technical snapshot → keep previous content with a visible refresh error if the new request fails. Render untrusted text with `textContent`; never interpolate it into HTML.

## Acceptance criteria

- Test widths 320, 360, 390, 430, 768, 1024, 1366, 1440, 1920 and 2560 CSS pixels, portrait and relevant landscape modes.
- No page-level horizontal overflow; no clipped headings, controls or focus outlines. Long email addresses and project names wrap.
- Test current Chromium, Firefox and WebKit where available; report exactly which engines were run. Emulation is not evidence of testing physical devices.
- Verify keyboard navigation, visible focus, 200% zoom, reduced motion, no JavaScript, failed JSON, empty results and repeated filter changes.
- Preserve the existing assurance, vendor-risk and AI-governance URLs and sample downloads.
- Keep credentials and source evidence out of browser bundles. Enforce same-origin fetches and restrictive CSP.
- Run Python tests, OPA tests, official OSCAL schema validation and an MCP initialize/list-tools/call-tool round trip.
- Target LCP under 2.5s, INP under 200ms and CLS under 0.1. Report measured results only; do not guarantee identical performance on every device or network.
- Return the complete repository ZIP, a deployment-only ZIP, architecture, exact commands, test results and any remaining account or deployment prerequisites. Never say a site or profile was updated unless the remote result was verified.

Use the supplied inspiration sites as visual references, not templates to copy. Do not claim to have watched a video if only its title or metadata was accessible. Prioritize the owner’s actual work and accessible interaction over a trend.
