package aao.ai_test
import rego.v1
import data.aao.ai

good := {"in_scope": true, "provider": true, "deployer": true, "direct_interaction": true,
    "synthetic_output": true, "deepfake": true, "public_interest_text": false, "emotion_or_biometric": false,
    "interaction_disclosed": true, "machine_readable_marking": true, "marking_effectiveness_tested": true,
    "content_disclosed": true, "subjects_informed": true, "accessible_at_first_exposure": true,
    "exception_claimed": false, "applicability_reviewed": true, "owner": "Owner",
    "risk_assessment_ref": "AI-01", "evaluation_ref": "EV-01"}

test_good_evidence if { result := ai.result with input as good; result.decision == "evidence_checks_passed" }
test_missing_never_passes if { result := ai.result with input as {}; result.decision == "needs_information" }
test_string_boolean_rejected if {
    bad := object.union(good, {"provider": "false"})
    result := ai.result with input as bad; result.decision == "needs_information"
}
test_no_marking if {
    bad := object.union(good, {"machine_readable_marking": false})
    result := ai.result with input as bad; result.decision == "remediate"
}
test_exception_requires_review if {
    exceptional := object.union(good, {"exception_claimed": true})
    result := ai.result with input as exceptional; result.decision == "legal_review"
}
test_out_of_scope_requires_review if {
    exceptional := object.union(good, {"in_scope": false})
    result := ai.result with input as exceptional; result.decision == "legal_review"
}
test_subject_notice if {
    bad := object.union(good, {"emotion_or_biometric": true, "subjects_informed": false})
    result := ai.result with input as bad; result.decision == "remediate"
}
