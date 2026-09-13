import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, access } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { build, normalizeSiteUrl } from './build.mjs';
test('GitHub project deployment retains its repository prefix in canonical, sitemap and 404', async()=>{
 const destination=await mkdtemp(path.join(os.tmpdir(),'aao-test-'));
 try {
  await build({destination,siteUrl:'https://aaowasi.github.io/portfolio'});
  const page=await readFile(path.join(destination,'work/assurance/index.html'),'utf8');
  assert.ok(page.includes('href="https://aaowasi.github.io/portfolio/work/assurance/"'));
  assert.ok(page.includes('href="../../assets/site.css"'));
  assert.ok((await readFile(path.join(destination,'404.html'),'utf8')).includes('href="/portfolio/"'));
  assert.ok((await readFile(path.join(destination,'sitemap.xml'),'utf8')).includes('/portfolio/work/ai-governance/'));
  await assert.rejects(access(path.join(destination,'scripts')));
 } finally {await rm(destination,{recursive:true,force:true});}
});
test('Unknown deployment host does not inherit the old Cloudflare canonical',async()=>{
 const destination=await mkdtemp(path.join(os.tmpdir(),'aao-test-'));
 try{await build({destination,siteUrl:''});const page=await readFile(path.join(destination,'index.html'),'utf8');assert.ok(!page.includes('rel="canonical"'));await assert.rejects(access(path.join(destination,'sitemap.xml')));}finally{await rm(destination,{recursive:true,force:true});}
});
test('Host configuration rejects unsafe schemes and credential-bearing URLs',()=>{
 for(const value of ['javascript:alert(1)','https://user:secret@example.com','https://example.com/?q=1','https://example.com/#hash']) assert.throws(()=>normalizeSiteUrl(value));
 assert.equal(normalizeSiteUrl('https://example.com'),'https://example.com/');
});
