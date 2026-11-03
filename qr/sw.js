/* This folder is retired. The app lives one level up, at /QR/.

   A phone that ever opened the old /QR/qr/ page registered the previous
   service worker here, and that one served from cache first. Left alone it
   would keep handing back the old page forever, redirect or no redirect.
   So this replaces it, clears only the cache that worker made, unregisters
   itself, and reloads any open tab so it follows the redirect.

   It deletes 'tek-qr-v1' by name on purpose. Cache storage is shared across
   the whole origin, so clearing everything here would also wipe the cache the
   live app at /QR/ depends on. */

const RETIRED_CACHE = 'tek-qr-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    try { await caches.delete(RETIRED_CACHE); } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    const windows = await self.clients.matchAll({ type: 'window' });
    windows.forEach(c => { try { c.navigate(c.url); } catch (e) {} });
  })());
});
