"""Content-addressed archive of a reviewed directory; never publishes automatically."""
import argparse
import hashlib
import json
from pathlib import Path
import zipfile

p = argparse.ArgumentParser()
p.add_argument('source', type=Path)
p.add_argument('output', type=Path)
args = p.parse_args()
root = args.source.resolve()
if not root.is_dir() or args.output.resolve().is_relative_to(root):
    raise SystemExit('Source must be a directory and output must be outside it')
manifest = []
with zipfile.ZipFile(args.output, 'x', compression=zipfile.ZIP_DEFLATED) as archive:
    for source in sorted(root.rglob('*')):
        if source.is_symlink():
            raise SystemExit('Symlinks are not accepted')
        if source.is_file():
            data = source.read_bytes()
            name = source.relative_to(root).as_posix()
            manifest.append({'file': name, 'sha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data)})
            archive.writestr(name, data)
    archive.writestr('MANIFEST.json', json.dumps(manifest, indent=2))
digest = hashlib.sha256(args.output.read_bytes()).hexdigest()
args.output.with_suffix(args.output.suffix + '.sha256').write_text(digest + '  ' + args.output.name + '\n')
print(f'Archived {len(manifest)} files. No upload performed.')
