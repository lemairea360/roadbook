// Service worker « Japon 2026 » — stratégie cache-first, pensé pour iOS :
// enregistrement simple, pas de background sync, pas de notifications.
// Pour forcer une mise à jour après modification des données : incrémenter VERSION.
const VERSION = "japon2026-v6";
const PRECACHE = [
  "./",
  "./index.html",
  "./valises.html",
  "./manifest.webmanifest",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // Ne mettre en cache que les réponses locales valides (pas les liens Google Maps, etc.)
          if (res.ok && new URL(req.url).origin === self.location.origin) {
            const copy = res.clone();
            caches.open(VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => {
          // Hors-ligne : pour une navigation, servir l'app ; sinon échec silencieux.
          if (req.mode === "navigate") return caches.match("./index.html");
          return Response.error();
        });
    })
  );
});
