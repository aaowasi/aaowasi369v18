package aao.ai

import rego.v1

# Conservative operational evidence checks. A passing result is not legal compliance.
required_flags := {"in_scope", "provider", "deployer", "direct_interaction", "synthetic_output",
    "deepfake", "public_interest_text", "emotion_or_biometric", "interaction_disclosed",
    "machine_readable_marking", "marking_effectiveness_tested", "content_disclosed", "subjects_informed",
    "accessible_at_first_exposure", "exception_claimed", "applicability_reviewed"}

missing contains field if {
    some field in required_flags
    not is_boolean(object.get(input, field, null))
}

missing contains field if {
    some field in {"owner", "risk_assessment_ref", "evaluation_ref"}
    value := object.get(input, field, null)
    not is_string(value)
}

findings contains "GOVERN: accountable owner is missing" if {
    object.get(input, "owner", "") == ""
}

findings contains "MAP: use-case risk assessment is missing" if {
    object.get(input, "risk_assessment_ref", "") == ""
}

findings contains "MEASURE: evaluation evidence is missing" if {
    object.get(input, "evaluation_ref", "") == ""
}

findings contains "50(1): interaction disclosure evidence is missing" if {
    input.in_scope
    input.provider
    input.direct_interaction
    not input.interaction_disclosed
}

findings contains "50(2): machine-readable marking evidence is missing" if {
    input.in_scope
    input.provider
    input.synthetic_output
    not input.machine_readable_marking
}

findings contains "50(2): marking effectiveness has not been tested" if {
    input.in_scope
    input.provider
    input.synthetic_output
    not input.marking_effectiveness_tested
}

findings contains "50(3): affected-person notice evidence is missing" if {
    input.in_scope
    input.deployer
    input.emotion_or_biometric
    not input.subjects_informed
}

disclosure_trigger if { input.deepfake }
disclosure_trigger if { input.public_interest_text }

findings contains "50(4): content disclosure evidence is missing" if {
    input.in_scope
    input.deployer
    disclosure_trigger
    not input.content_disclosed
}

findings contains "50(5): accessible notice at first exposure is unverified" if {
    input.in_scope
    not input.accessible_at_first_exposure
}

needs_review if { not input.applicability_reviewed }
needs_review if { input.exception_claimed }
needs_review if { not input.in_scope }

decision := "needs_information" if { count(missing) > 0 }
else := "legal_review" if { needs_review }
else := "remediate" if { count(findings) > 0 }
else := "evidence_checks_passed"

result := {"decision": decision, "missing": sort(missing), "findings": sort(findings),
           "human_legal_review_required": true,
           "limitation": "Evidence assertions only; not provenance verification, full standard coverage, or a legal opinion"}
