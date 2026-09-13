import {cp, mkdir, rm, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
await rm(dist, {recursive:true, force:true});
await mkdir(dist, {recursive:true});
await cp(path.join(root,'site'), dist, {recursive:true});
await writeFile(path.join(dist,'.nojekyll'),'');
console.log('Built public-only site in dist/. Private engine and baseline files are excluded.');
