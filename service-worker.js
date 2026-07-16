const CACHE='brinca-control-v1';
const ARCHIVOS=['./','./index.html','./manifest.json','./icono-192.png','./icono-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
    const copia=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copia));return resp;
  }).catch(()=>caches.match('./index.html'))));
});
