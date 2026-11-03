const CACHE = 'tek-qr-v3';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icon-180.png', './icon-192.png', './icon-512.png',
  './icon-maskable-192.png', './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* This page carries a phone number, so a stale copy is worse than no copy.

   The first build was cache-first for everything. That meant once the page was
   installed it was frozen: a contact detail could be corrected here and every
   installed copy would keep showing the old one, because the cache always
   answered first and the network was never asked. That bit the Carter card for
   real on 2026-11-02.

   So the document now goes to the network first and only falls back to the
   cache when there is no signal. Icons and fonts never change, so those stay
   cache-first, which is what keeps it fast and usable offline. */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const mine = url.origin === location.origin &&
               url.pathname.startsWith(new URL('./', location).pathname);
  if (e.request.method !== 'GET' || !mine) return;

  const isDoc = e.request.mode === 'navigate' || e.request.destination === 'document';

  if (isDoc) {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() =>
        caches.match(e.request, { ignoreSearch: true })
          .then(hit => hit || caches.match('./index.html'))
      )
    );
    return;
  }

  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit ||
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
    )
  );
});
