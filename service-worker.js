const CACHE_NAME = 'asx-cache-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './icon/axs-192.png',
  './icon/axs-512.png',
  './css/style.css',
  './css/mmm.css',
  './js/script.js',
  './js/script1.js',
  './image/coachella.jpeg',
  './image/code code.jpeg'
];

// Install Service Worker and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker and clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch assets from cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
