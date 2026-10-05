const CACHE = 'asya-cep-v14';
const CORE = [
  './', './index.html', './style.css', './app.js', './plan.js', './phrases.js',
  './pronunciations.js', './places.js', './map.js',
  './vendor/leaflet.js', './vendor/leaflet.css',
  './assets/chinatown-evening.webp', './assets/kuala-lumpur-evening.webp',
  './assets/icon.svg', './manifest.webmanifest', './assets/audio-manifest.json'
];

self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE).then(async cache => {
    const response = await fetch('./assets/audio-manifest.json');
    const audio = await response.json();
    await cache.addAll([...CORE, ...audio]);
  }).then(() => self.skipWaiting())
));

self.addEventListener('activate', event => event.waitUntil(
  caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE).map(key => caches.delete(key))
  )).then(() => self.clients.claim())
));

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  const freshFirst = request.mode === 'navigate' || ['script', 'style'].includes(request.destination);
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (freshFirst) {
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch {
        return await caches.match(request) || await caches.match('./index.html') || Response.error();
      }
    }

    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  })());
});
