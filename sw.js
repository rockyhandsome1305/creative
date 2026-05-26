const SERVER_URL = 'https://came-maine-succeed-infants.trycloudflare.com';

const CACHE_NAME = 'myapp-v1';
const urlsToCache = ['./', './index.html', './manifest.json'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(SERVER_URL, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        })
        .catch(() => caches.match(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});
