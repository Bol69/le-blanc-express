self.addEventListener('install', e=>{
  e.waitUntil(caches.open('prixo-v1').then(c=>c.addAll([
    'index.html','styles.css','script.js','logo_prixo.svg','favicon.svg',
    'mentions-legales.html','politique-confidentialite.html','cgu.html','scan.html',
    'manifest.webmanifest'
  ])));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});