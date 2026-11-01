const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.wav':'audio/wav','.mp3':'audio/mpeg'};
http.createServer(async (req,res) => {
  let file;
  try { file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  const pathname = new URL(req.url,'http://localhost').pathname;
  if (/^\/(?:journey|about|contact|work(?:\/[a-z0-9-]+)?)\/?$/.test(pathname)) file = path.join(root,'index.html');
  if (file === root || file.endsWith(path.sep)) file = path.join(file,'index.html');
  // Reference artwork is temporary: cache only public media from this fixed origin.
  if (!fs.existsSync(file) && /^\/v2\/[a-zA-Z0-9_/-]+\.(webp|png|jpg|svg|woff2|wav|mp3)$/.test(pathname)) {
    try {
      const remote = await fetch('https://www.jameschugh.com' + pathname,{signal:AbortSignal.timeout(20000)});
      if (!remote.ok) { res.writeHead(404); return res.end('Asset not found'); }
      const data = Buffer.from(await remote.arrayBuffer());
      fs.mkdirSync(path.dirname(file),{recursive:true});
      fs.writeFileSync(file,data);
    } catch { res.writeHead(502); return res.end('Reference media unavailable'); }
  }
  fs.readFile(file,(error,data) => { res.writeHead(error ? 404 : 200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'}); res.end(error ? 'Not found' : data); });
}).listen(4173,'127.0.0.1',() => console.log('Portfolio preview: http://127.0.0.1:4173'));
