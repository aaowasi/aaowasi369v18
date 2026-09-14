"""Bounded collectors, evidence provenance, and public-safe CCM output."""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import tempfile
import time
from datetime import datetime, timezone
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
MAX_BYTES = 4_000_000

def utcnow():
    return datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')

def parse_time(value):
    if not isinstance(value, str):
        raise ValueError('Timestamp must be a string')
    result = datetime.fromisoformat(value.replace('Z', '+00:00'))
    if result.tzinfo is None:
        raise ValueError('Evidence timestamps must include a timezone')
    return result

def atomic_json(path, data):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile('w', dir=path.parent, delete=False, encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write('\n')
        tmp = f.name
    os.replace(tmp, path)

def read_json(path):
    with Path(path).open('rb') as stream:
        raw = stream.read(MAX_BYTES + 1)
    if len(raw) > MAX_BYTES:
        raise ValueError('Evidence exceeds size limit')
    return json.loads(raw)

def canonical_hash(data):
    return hashlib.sha256(json.dumps(data, sort_keys=True, separators=(',', ':')).encode()).hexdigest()

def get_github(path, token, opener=urlopen):
    if not path.startswith('/repos/') or '..' in path:
        raise ValueError('Only repository endpoints are supported')
    req = Request('https://api.github.com' + path, headers={
        'Accept': 'application/vnd.github+json', 'Authorization': 'Bearer ' + token,
        'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'aao-grc-engine'})
    for attempt in range(3):
        try:
            with opener(req, timeout=15) as response:
                data = response.read(MAX_BYTES + 1)
                if len(data) > MAX_BYTES:
                    raise ValueError('API response exceeds size limit')
                return json.loads(data)
        except HTTPError as error:
            if error.code not in (429, 500, 502, 503, 504) or attempt == 2:
                raise
            delay = error.headers.get('Retry-After', '2')
            time.sleep(min(int(delay) if delay.isdigit() else 2 ** attempt, 10))
        except (URLError, TimeoutError):
            if attempt == 2:
                raise
            time.sleep(2 ** attempt)

def collect_alerts(repo, token):
    if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+', repo):
        raise ValueError('Invalid owner/repository')
    alerts = []
    for page in range(1, 21):
        batch = get_github(f'/repos/{repo}/dependabot/alerts?state=open&per_page=100&page={page}', token)
        if not isinstance(batch, list):
            raise ValueError('Expected an alerts list')
        alerts.extend(batch)
        if len(batch) < 100:
            return alerts
    raise ValueError('Population exceeds 2000 alerts; collection is incomplete')

def assess_iam(evidence, now=None):
    """AccountSummary only tests root MFA and root keys, not all IAM users."""
    now = now or datetime.now(timezone.utc)
    result = {'id': 'IAM-ROOT', 'title': 'Root identity safeguards',
              'mappings': ['SOC2:CC6.1', 'ISO27001:2022:A.5.15', 'ISO27001:2022:A.8.5'],
              'status': 'unknown', 'checked_at': utcnow(), 'observed_at': None,
              'findings': [], 'scope': 'AWS account summary: root MFA and access keys only'}
    try:
        observed = parse_time(evidence['observed_at'])
        result['observed_at'] = evidence['observed_at']
        result['evidence_sha256'] = canonical_hash(evidence)
        age = (now - observed).total_seconds()
        summary = evidence['payload']['SummaryMap']
        values = [summary['AccountMFAEnabled'], summary['AccountAccessKeysPresent']]
        if any(type(x) is not int or x not in (0, 1) for x in values):
            raise ValueError('Unexpected IAM values')
        if age < -300:
            raise ValueError('Future observation timestamp')
        if age > 86400:
            result.update(status='stale', findings=['Evidence is older than the 24-hour test window'])
        else:
            if values[0] != 1:
                result['findings'].append('Root MFA is not enabled')
            if values[1] != 0:
                result['findings'].append('Root access keys exist')
            result['status'] = 'fail' if result['findings'] else 'pass'
    except (KeyError, TypeError, ValueError):
        result['findings'] = ['Missing, malformed, or untrustworthy IAM evidence']
    return result

def assess_alerts(alerts):
    if not isinstance(alerts, list) or any(
        not isinstance(a, dict) or not isinstance(a.get('security_advisory'), dict) or
        a['security_advisory'].get('severity') not in ('low', 'medium', 'high', 'critical')
        for a in alerts
    ):
        raise ValueError('Malformed alert population; no assurance conclusion')
    serious = sum(a.get('security_advisory', {}).get('severity') in ('critical', 'high') for a in alerts)
    return {'id': 'VULN-OPEN', 'title': 'High and critical dependency alerts',
            'mappings': ['SOC2:CC7.1', 'ISO27001:2022:A.8.8'],
            'status': 'fail' if serious else 'pass', 'checked_at': utcnow(),
            'observed_at': utcnow(), 'evidence_sha256': canonical_hash(alerts),
            'scope': 'Open Dependabot alerts in the configured repository',
            'findings': [f'{serious} high or critical alerts require triage'] if serious else []}

def run(mode, repo=None, iam_path=None, output=None):
    checks = []
    if iam_path:
        checks.append(assess_iam(read_json(iam_path)))
    elif mode == 'demo':
        checks.append(assess_iam(read_json(ROOT / 'fixtures/iam.json')))
    else:
        checks.append(assess_iam({}))
    if mode == 'demo':
        alerts = read_json(ROOT / 'fixtures/alerts.json')
        item = assess_alerts(alerts)
        item['observed_at'] = '2026-09-13T00:00:00Z'
        checks.append(item)
    else:
        token = os.environ.get('GRC_GITHUB_TOKEN', '')
        try:
            if not token or not repo:
                raise ValueError('Collector not configured')
            checks.append(assess_alerts(collect_alerts(repo, token)))
        except (HTTPError, URLError, TimeoutError, ValueError, KeyError, TypeError):
            checks.append({'id': 'VULN-OPEN', 'title': 'High and critical dependency alerts',
                           'mappings': ['SOC2:CC7.1', 'ISO27001:2022:A.8.8'],
                           'status': 'unknown', 'checked_at': utcnow(), 'observed_at': None,
                           'findings': ['Collection failed or permission unavailable; no assurance conclusion'],
                           'scope': 'Configured repository; collection incomplete'})
    report = {'schema_version': 1, 'mode': mode, 'generated_at': utcnow(),
              'source_commit': os.environ.get('GITHUB_SHA', 'local'),
              'checks': checks, 'disclosure': 'Technical test results, not an audit opinion or compliance certification.'}
    atomic_json(output or ROOT / 'site/data/ccm.json', report)
    return report

if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--mode', choices=['demo', 'live'], default='demo')
    p.add_argument('--repo')
    p.add_argument('--iam', type=Path)
    p.add_argument('--output', type=Path)
    args = p.parse_args()
    result = run(args.mode, args.repo, args.iam, args.output)
    print(json.dumps({'mode': result['mode'], 'statuses': [c['status'] for c in result['checks']]}))
