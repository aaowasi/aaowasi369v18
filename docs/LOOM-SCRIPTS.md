# Interview walkthroughs

Each spoken script is intended for approximately two minutes. Screen cues are outside the spoken text. Record the actual workflow and visible outputs. Do not narrate a successful API collection unless the recording contains one.

## A. Evidence automation and CCM

Screen cues: 0:00 homepage; 0:20 workflow; 0:50 collector and result artifact; 1:20 control finding; 1:45 repository tests.

**Spoken script**

Audit preparation becomes harder when every request starts a new search for evidence. I built this portfolio around a reusable path from collection to a scoped control result, with enough context for another person to review the conclusion.

Here is the monitoring workflow. It runs on a six-hour schedule or a manual trigger. The Python collector reads authorized repository dependency alerts. It can also assess a timestamped AWS account-summary file. The public site receives a small normalized result, rather than credentials or raw security logs.

I want to highlight the distinction between collection time and observation time. Refreshing a page does not make evidence current. The result retains when the source was observed, what was tested, and a hash that supports traceability. If the token is missing, access is denied, or the collection is incomplete, the check remains unknown.

In the interface, a finding becomes an action. A root-access-key finding calls for review, remediation, and retesting. An overdue observation calls for fresh evidence before someone relies on the result. The mapping explains the control objective supported by that narrow test.

These are the tests behind the workflow. They cover malformed inputs, future timestamps, missing permissions, pagination limits, and bounded retries. The site continues to display the last available evidence if a refresh fails.

The contribution I would bring to a GRC team is this connection between assurance work and engineering: a repeatable collection path, explicit decision boundaries, and evidence another reviewer can follow without reconstructing the entire process.

## B. Executive risk reporting

Screen cues: 0:00 risk engine; 0:20 category filter; 0:45 risk details; 1:10 residual view; 1:35 governance workbench.

**Spoken script**

An executive risk report should help someone decide where attention is needed. This workspace brings the risk register, appetite thresholds, control evidence, and the underlying governance domains into one view.

The headline counts come from the source dataset. The appetite measure compares each recorded residual score with its stated threshold. It does not turn project counts into a claim about control coverage. That distinction matters when a dashboard is used to set priorities.

I can narrow the view to AI reliability and data loss, third-party exposure, privacy and regulatory obligations, or infrastructure security. Selecting a matrix cell filters the same register. There is one shared state behind the visual and the list, so the decision context stays consistent.

Opening a risk shows the business exposure, scenario owner, key controls, indicator, and escalation threshold. The next discussion is concrete: what treatment evidence exists, who should review it, and whether the remaining exposure is acceptable.

The source contains residual scores but does not contain residual likelihood and impact coordinates. I preserve those scores. This optional exploration lets a reviewer position a scenario without rewriting the original assessment or inventing historical evidence. The page makes that distinction at the point of use.

Below the report, ten project domains are grouped into assurance, AI governance, and continuous monitoring. Each explains the business question and links to the supporting work.

For an executive audience, the value is faster navigation from exposure to the evidence and decision it requires. The source register can also be downloaded for further review.

## C. Agentic AI governance and MCP

Screen cues: 0:00 terminal MCP client; 0:25 tool list; 0:45 vendor engine; 1:15 Rego result; 1:40 prompt-screening test.

**Spoken script**

An AI agent should have a clear boundary when it works with governance data. This project gives it a small set of typed tools rather than unrestricted access to files, shell commands, or arbitrary web addresses.

The local MCP server supports risk queries, vendor evaluations, prompt screening, and control-result queries. This client test opens the protocol session and requests a risk record. Inputs are bounded, and the server reads fixed project datasets. A returned record is evidence to inspect, not an instruction that expands the agent's permissions.

Here is the vendor decision engine. I enter the intended data use, service criticality, processor agreement, subprocessor authorization, training conditions, and evidence date. The rules return a priority score and specific blockers. A missing contractual condition overrides the aggregate score. Unknown answers require information. The final approval belongs to a reviewer.

The AI policy tests cover configured transparency evidence, including interaction disclosure, synthetic-content marking, and role-specific notices. The rules also route exceptions and unresolved applicability to review. Passing these assertions does not verify a watermark or settle a legal interpretation.

The prompt-screening tool has a similarly precise scope. It detects the configured patterns and returns counts without storing the submitted text. It is a local test surface, with no claim of endpoint or network monitoring.

What this demonstrates is an approach to agentic governance that remains inspectable. Each tool has defined inputs, a constrained operation, and a result someone can challenge. That makes automation easier to review and safer to integrate into an existing governance process.
