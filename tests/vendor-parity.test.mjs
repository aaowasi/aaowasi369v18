import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {evaluateVendor,fields} from '../site/assets/vendor.js';
test('Browser and Python decision, score and tier match across 729 scenarios',()=>{
 const inputs=[];for(let n=0;n<243;n++){let value=n;const v={name:'Parity test'};for(const [key]of fields){v[key]=[false,true,null][value%3];value=Math.floor(value/3);}for(const date of ['2026-09-14','2025-09-13','2026-09-15'])inputs.push({...v,security_evidence_date:date});}
 const code='import json,sys\nfrom datetime import datetime,timezone\nfrom engine.decisions import evaluate_vendor\nprint(json.dumps([evaluate_vendor(v,datetime(2026,9,14,12,tzinfo=timezone.utc)) for v in json.load(sys.stdin)]))';
 const run=spawnSync(process.env.PYTHON||'python3',['-c',code],{input:JSON.stringify(inputs),encoding:'utf8',maxBuffer:2_000_000});assert.equal(run.status,0,run.stderr);const python=JSON.parse(run.stdout);for(let i=0;i<inputs.length;i++){const js=evaluateVendor(inputs[i],new Date('2026-09-14T12:00:00Z'));for(const key of ['decision','tier','score'])assert.equal(js[key],python[i][key],`Input ${i}: ${key}`);}
});
