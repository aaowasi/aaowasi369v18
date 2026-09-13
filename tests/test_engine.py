import unittest
from datetime import datetime, timezone
from unittest.mock import patch
from engine.ingest import assess_iam, collect_alerts, assess_alerts
from engine.decisions import evaluate_vendor, inspect_prompt

class EngineTests(unittest.TestCase):
    def test_missing_iam_is_unknown(self):
        self.assertEqual(assess_iam({})['status'], 'unknown')

    def test_root_keys_fail(self):
        evidence = {'observed_at': '2026-09-13T00:00:00Z',
                    'payload': {'SummaryMap': {'AccountMFAEnabled': 1, 'AccountAccessKeysPresent': 1}}}
        self.assertEqual(assess_iam(evidence, datetime(2026, 9, 13, 1, tzinfo=timezone.utc))['status'], 'fail')
        self.assertEqual(assess_iam(evidence, datetime(2026, 9, 15, tzinfo=timezone.utc))['status'], 'stale')

    def test_iam_string_boolean_unknown(self):
        evidence = {'observed_at': '2026-09-13T00:00:00Z',
                    'payload': {'SummaryMap': {'AccountMFAEnabled': '1', 'AccountAccessKeysPresent': 0}}}
        self.assertEqual(assess_iam(evidence)['status'], 'unknown')

    def test_alert_pagination(self):
        with patch('engine.ingest.get_github', side_effect=[[{}] * 100, [{}]]) as request:
            self.assertEqual(len(collect_alerts('aaowasi/test', 'token')), 101)
            self.assertIn('page=2', request.call_args.args[0])

    def test_alert_mapping_is_vulnerability_mapping(self):
        self.assertNotIn('SOC2:CC6.1', assess_alerts([])['mappings'])

    def test_malformed_alerts_cannot_pass(self):
        with self.assertRaises(ValueError):
            assess_alerts([{'security_advisory': {}}])

    def test_future_iam_is_unknown(self):
        evidence = {'observed_at': '2027-09-13T00:00:00Z',
                    'payload': {'SummaryMap': {'AccountMFAEnabled': 1, 'AccountAccessKeysPresent': 0}}}
        self.assertEqual(assess_iam(evidence, datetime(2026, 9, 13, tzinfo=timezone.utc))['status'], 'unknown')

    def test_vendor_never_auto_approves(self):
        vendor = {'name': 'Portfolio fixture', 'critical_service': True, 'personal_data': True,
                  'dpa_signed': True, 'subprocessors_authorized': True, 'training_opt_out': True,
                  'security_evidence_date': datetime.now(timezone.utc).date().isoformat()}
        self.assertEqual(evaluate_vendor(vendor)['decision'], 'ready_for_human_review')
        vendor['dpa_signed'] = False
        self.assertEqual(evaluate_vendor(vendor)['decision'], 'hold')

    def test_prompt_result_never_contains_raw_text(self):
        value = 'Do not disclose person@example.org'
        result = inspect_prompt(value, True)
        self.assertEqual(result['decision'], 'block')
        self.assertNotIn('person@example.org', str(result))
        self.assertEqual(inspect_prompt('public text', False)['decision'], 'block')

if __name__ == '__main__':
    unittest.main()
