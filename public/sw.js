// Minimal service worker. PWA install criterion needs a registered SW, but
// we don't want aggressive caching — content should always be fresh so users
// see latest prices without waiting for SW to update.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
