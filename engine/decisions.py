"""Deterministic triage. Inputs never authorize a vendor or legal conclusion."""
import re
from datetime import datetime, timezone

def evaluate_vendor(vendor):
    required = ('name', 'critical_service', 'personal_data', 'dpa_signed', 'subprocessors_authorized',
                'training_opt_out', 'security_evidence_date')
    missing = [x for x in required if x not in vendor]
    if missing:
        return {'decision': 'needs_information', 'reasons': ['Missing fields: ' + ', '.join(missing)], 'human_approval_required': True}
    if not isinstance(vendor['name'], str) or not 1 <= len(vendor['name']) <= 120:
        raise ValueError('Vendor name must contain 1–120 characters')
    for key in required[1:-1]:
        if type(vendor[key]) is not bool:
            raise ValueError(key + ' must be a boolean')
    reasons = []
    if vendor['personal_data'] and not vendor['dpa_signed']:
        reasons.append('A signed processor agreement is missing')
    if vendor['personal_data'] and not vendor['subprocessors_authorized']:
        reasons.append('Subprocessor authorization is unresolved')
    if not vendor['training_opt_out']:
        reasons.append('Training use is unresolved for the intended data')
    try:
        age = (datetime.now(timezone.utc).date() - datetime.fromisoformat(vendor['security_evidence_date']).date()).days
        if not 0 <= age <= 365:
            reasons.append('Security evidence is stale or future-dated')
    except (TypeError, ValueError):
        reasons.append('Security evidence date is missing or invalid')
    return {'decision': 'hold' if reasons else 'ready_for_human_review',
            'tier': 1 if vendor['critical_service'] else 2 if vendor['personal_data'] else 3,
            'reasons': reasons, 'human_approval_required': True,
            'scope': 'Intake assertions only; independent evidence verification is required'}

PATTERNS = {'email': re.compile(r'\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b', re.I),
            'aws_access_key': re.compile(r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b'),
            'private_key': re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----')}

def inspect_prompt(text, approved_channel):
    if len(text) > 20000:
        raise ValueError('Prompt exceeds 20,000 characters')
    matches = {name: len(pattern.findall(text)) for name, pattern in PATTERNS.items()}
    return {'decision': 'block' if not approved_channel or any(matches.values()) else 'no_pattern_detected',
            'detections': matches, 'raw_content_logged': False,
            'limitation': 'Local pattern screening only. No endpoint visibility, network enforcement, or complete PII detection.'}
