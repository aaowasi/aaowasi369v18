import {readdir,readFile,access} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../dist');
let count=0;
async function scan(dir){
  for(const item of await readdir(dir,{withFileTypes:true})){
    const file=path.join(dir,item.name);
    if(item.isDirectory()){await scan(file);continue;}
    if(!file.endsWith('.html'))continue;
    const html=await readFile(file,'utf8');count++;
    for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
      const url=match[1];if(/^(https?:|mailto:|data:|#)/.test(url))continue;
      const target=path.resolve(dir,url.split('#')[0].split('?')[0]);
      if(!target.startsWith(root+path.sep)&&target!==root)throw Error('Path escapes public directory');
      await access(target);
    }
    if(!html.includes('name="viewport"'))throw Error('Missing viewport: '+file);
  }
}
await scan(root);
console.log(`${count} HTML pages: local links and viewport metadata passed`);
