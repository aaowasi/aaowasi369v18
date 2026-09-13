# Control & evidence architecture

Independent portfolio sample · Illustrative scenario

An illustrative access-review walkthrough connecting a control claim to evidence, an exception and an accountable decision.

## Scope

Privileged access for one in-scope system and one defined review period. The scenario assumes a current role export and MFA configuration are available, but the review sign-off is missing.

## Requirement

Privileged access is limited to approved roles and periodically reviewed.

## Control owner

The designated system owner is accountable for the review; the identity administrator supplies the role export.

## Evidence requested

Role population, MFA configuration, reviewer decision record and dated approval.

## Test approach

Reconcile privileged accounts to the authorized population, check the relevant MFA scope, then trace each review decision to a dated sign-off.

## Observed sample gap

No reviewer sign-off has been supplied for this illustrative review period.

## Proposed treatment

Obtain the missing approval or complete the review. Record an owner and due date; do not treat absence of evidence as a passing test.

## Decision boundary

The accountable decision-maker determines whether an exception may be accepted. This sample does not grant risk acceptance.

## Retest trigger

New review evidence arrives, access changes materially, or the agreed due date is reached.

## Limitations

No production system, identity export or customer evidence was tested. A real review must establish scope, timing, population completeness and applicable policy before reaching a conclusion.

Control assurance and risk-treatment concepts. Framework references in the original portfolio are learning and mapping lenses, not certification claims.
