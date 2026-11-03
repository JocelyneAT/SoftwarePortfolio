const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.wav':'audio/wav','.mp3':'audio/mpeg'};
http.createServer((req,res) => {
  let file;
  try { file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  if (file === root || new URL(req.url, 'http://localhost').pathname.endsWith('/')) file = path.join(file,'index.html');
  fs.readFile(file,(error,data) => { res.writeHead(error ? 404 : 200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'}); res.end(error ? 'Not found' : data); });
}).listen(4173,'127.0.0.1',() => console.log('Portfolio preview: http://127.0.0.1:4173'));
