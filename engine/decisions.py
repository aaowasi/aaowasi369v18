"""Deterministic triage. Inputs never authorize a vendor or legal conclusion."""
import re
from datetime import datetime, timezone

def evaluate_vendor(vendor, now=None):
    now = now or datetime.now(timezone.utc)
    keys = ('critical_service', 'personal_data', 'dpa_signed', 'subprocessors_authorized', 'training_opt_out')
    if not isinstance(vendor, dict):
        raise ValueError('Vendor input must be an object')
    if not isinstance(vendor.get('name'), str) or not 1 <= len(vendor['name'].strip()) <= 120:
        raise ValueError('Vendor name must contain 1–120 characters')
    for key in keys:
        if vendor.get(key) is not None and type(vendor[key]) is not bool:
            raise ValueError(key + ' must be a boolean or null')
    missing = [k for k in keys if vendor.get(k) is None]
    reasons = []
    score = (25 if vendor.get('critical_service') is True else 0) + (15 if vendor.get('personal_data') is True else 0)
    if vendor.get('personal_data') is not False and vendor.get('dpa_signed') is not True:
        reasons.append('Obtain a signed processor agreement before personal-data processing.')
        score += 20
    if vendor.get('personal_data') is not False and vendor.get('subprocessors_authorized') is not True:
        reasons.append('Resolve subprocessor authorization.')
        score += 15
    if vendor.get('training_opt_out') is not True:
        reasons.append('Resolve training use for the intended data.')
        score += 15
    try:
        date = vendor.get('security_evidence_date', '')
        if not isinstance(date, str) or not re.fullmatch(r'\d{4}-\d{2}-\d{2}', date):
            raise ValueError('Invalid date')
        age = (now.date() - datetime.fromisoformat(date).date()).days
        if not 0 <= age <= 365:
            raise ValueError('Evidence outside review window')
    except (TypeError, ValueError):
        reasons.append('Supply valid security evidence dated within the last 365 days.')
        score += 10
    if missing:
        reasons.append('Confirm unknown answers: ' + ', '.join(missing) + '.')
    return {'rule_version': '2.0.0', 'decision': 'hold' if reasons else 'ready_for_human_review',
            'score': min(100, score),
            'tier': 1 if vendor.get('critical_service') is True else 2 if vendor.get('personal_data') is True else 3,
            'reasons': reasons, 'missing': missing, 'inputs': vendor,
            'evaluated_at': now.isoformat().replace('+00:00', 'Z'), 'human_approval_required': True,
            'scope': 'Intake assertions evaluated locally; reviewer verifies evidence and approves.'}

PATTERNS = {'email': re.compile(r'\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b', re.I),
            'aws_access_key': re.compile(r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b'),
            'private_key': re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----')}

def inspect_prompt(text, approved_channel):
    if not isinstance(text, str) or type(approved_channel) is not bool:
        raise ValueError('Expected text and a boolean channel assertion')
    if len(text) > 20000:
        raise ValueError('Prompt exceeds 20,000 characters')
    matches = {name: len(pattern.findall(text)) for name, pattern in PATTERNS.items()}
    return {'decision': 'block' if not approved_channel or any(matches.values()) else 'no_pattern_detected',
            'detections': matches, 'raw_content_logged': False,
            'limitation': 'Local pattern screening only. No endpoint visibility, network enforcement, or complete PII detection.'}
