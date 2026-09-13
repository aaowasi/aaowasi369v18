"""Validate against bundled official NIST JSON schemas and local control references."""
import json
from pathlib import Path
from jsonschema import validators, FormatChecker
from jsonschema.exceptions import ValidationError
import regex

def unicode_pattern(validator, pattern, instance, schema):
    # NIST uses Unicode property escapes (\p{L}); Python re does not support them.
    if isinstance(instance, str) and not regex.search(pattern, instance):
        yield ValidationError(f'{instance!r} does not match {pattern!r}')

root = Path(__file__).resolve().parents[1]
for document, schema in [('catalog.json', 'oscal_catalog_schema.json'),
                         ('component-definition.json', 'oscal_component_schema.json')]:
    model = json.loads((root / 'schemas' / schema).read_text())
    data = json.loads((root / 'oscal' / document).read_text())
    validator = validators.validator_for(model)
    validator.check_schema(model, format_checker=None)
    validator = validators.extend(validator, {'pattern': unicode_pattern})
    validator(model, format_checker=FormatChecker()).validate(data)
    print(document + ': official schema validation passed')
catalog = json.loads((root / 'oscal/catalog.json').read_text())['catalog']
ids = {c['id'] for c in catalog['controls']}
component = json.loads((root / 'oscal/component-definition.json').read_text())['component-definition']
for comp in component['components']:
    for implementation in comp['control-implementations']:
        assert implementation['source'] == 'catalog.json'
        for req in implementation['implemented-requirements']:
            assert req['control-id'] in ids, req['control-id']
print('All component control references resolve')
