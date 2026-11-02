const http=require('http'),fs=require('fs'),p=require('path');
const root=p.resolve(process.argv[2]||process.cwd());
const T={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.json':'application/json'};
http.createServer((q,s)=>{
  let f=decodeURIComponent(q.url.split('?')[0]); if(f==='/')f='/index.html';
  const full=p.resolve(p.join(root,f));
  if(full!==root && !full.startsWith(root+p.sep)){s.writeHead(403).end('403');return;}
  fs.readFile(full,(e,d)=>{
    if(e){s.writeHead(404,{'Content-Type':'text/plain'}).end('404 '+f);return;}
    s.writeHead(200,{'Content-Type':T[p.extname(full).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});
    s.end(d);
  });
}).listen(8731,'127.0.0.1',()=>console.log('serving '+root+' on http://localhost:8731'));
