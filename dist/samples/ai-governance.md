# AI governance register

Independent portfolio sample · Illustrative scenario

An illustrative governance entry for an internal risk-summary assistant, with source checks, human review and clear escalation triggers.

## Scope

A hypothetical assistant drafts internal risk summaries from an approved set of documents. It supports a human reviewer and has no authority to approve or accept risk.

## Intended purpose

Draft a summary of supplied risk records for an accountable human reviewer.

## Data boundary

Use approved records only. Establish access, confidentiality and retention requirements before use.

## Foreseeable failure

The draft omits a material exception, invents a supporting fact or understates unresolved exposure.

## Oversight

A designated reviewer checks material statements against source records before the summary is used in a decision.

## Evaluation

Use representative examples and known failure cases to assess unsupported statements, omitted exceptions and traceability.

## Evidence to retain

Source references, the reviewed output, reviewer approval, identified errors and the relevant version record.

## Proposed response

Block unsupported conclusions from the final summary, correct the draft and escalate recurring or material failures.

## Monitoring trigger

Changed source data, model or instructions; recurring review failures; or a material change in use.

## Limitations

No model performance was measured and no production AI system was assessed. This record does not establish legal compliance, a legal risk classification or a certification.

The original portfolio references NIST AI RMF and AI management-system concepts. This walkthrough does not provide a legal interpretation of the EU AI Act.
