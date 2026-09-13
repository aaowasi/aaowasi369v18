import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { root } from './build.mjs';
const directory=path.join(root,'dist');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.md':'text/markdown; charset=utf-8','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  let pathname=decodeURIComponent(url.pathname);
  if(process.env.QA==='1' && pathname==='/__qa'){
   const width=Math.max(320,Math.min(1440,Number(url.searchParams.get('width'))||390));
   const route=['/','/work/assurance/'].includes(url.searchParams.get('route'))?url.searchParams.get('route'):'/';
   res.writeHead(200,{'Content-Type':'text/html'});res.end(`<html><head><title>Local viewport QA</title><style>body{margin:0;background:#fff}iframe{width:${width}px;height:4400px;border:0;display:block}</style></head><body><iframe title="Portfolio at ${width}px" src="${route}"></iframe></body></html>`);return;
  }
  if(process.env.QA==='1' && pathname.startsWith('/repo-preview/'))pathname=pathname.slice('/repo-preview'.length);
  let file=path.resolve(directory,'.'+pathname);
  if(!file.startsWith(directory+path.sep)&&file!==directory){res.writeHead(403);res.end();return;}
  if((await stat(file)).isDirectory()){
   if(!url.pathname.endsWith('/')){res.writeHead(301,{Location:url.pathname+'/'+url.search});res.end();return;}
   file=path.join(file,'index.html');
  }
  const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(data);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(directory,'404.html')));}
}).listen(port,'0.0.0.0',()=>console.log(`Portfolio preview: http://localhost:${port}`));
