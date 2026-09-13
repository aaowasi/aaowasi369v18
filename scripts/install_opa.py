"""Install the tested Linux x86_64 OPA binary with a pinned SHA-256."""
import hashlib
from pathlib import Path
import platform
from urllib.request import urlopen

if platform.system() != 'Linux' or platform.machine() not in ('x86_64', 'AMD64'):
    raise SystemExit('Use docker compose run --rm opa test /policies -v on this platform')
target = Path('.tools/opa')
target.parent.mkdir(exist_ok=True)
expected = '69da5179ee403d10fa11bab6cfb4ffb0d23dba5f9b682fa977db772a1da5670f'
if not target.exists() or hashlib.sha256(target.read_bytes()).hexdigest() != expected:
    with urlopen('https://github.com/open-policy-agent/opa/releases/download/v1.20.2/opa_linux_amd64_static', timeout=60) as response:
        data = response.read(100_000_000)
    if hashlib.sha256(data).hexdigest() != expected:
        raise SystemExit('OPA digest mismatch; binary was not written or executed')
    target.write_bytes(data)
target.chmod(0o755)
print('Verified OPA 1.20.2 at .tools/opa')
