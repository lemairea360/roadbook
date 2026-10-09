// Service worker « Japon 2026 » — pensé pour iOS : enregistrement simple,
// pas de background sync, pas de notifications.
//
// Stratégie pour les fichiers same-origin : STALE-WHILE-REVALIDATE.
//   1. On répond immédiatement avec le cache (lancement instantané, hors-ligne garanti).
//   2. En parallèle, on re-télécharge le fichier et on met le cache à jour.
//   → Une mise à jour publiée (push sur main → GitHub Pages) est récupérée au premier
//     lancement avec réseau, et VISIBLE au lancement SUIVANT — sans toucher à VERSION.
// VERSION reste utile pour les refontes (changement de liste de fichiers, purge
// complète) : l'incrémenter supprime l'ancien cache à l'activation.
const VERSION = "japon2026-v7";
const PRECACHE = [
  "./",
  "./index.html",
  "./data.js",
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
  // Requêtes externes (Google Maps, Airbnb…) : réseau direct, jamais mises en cache.
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req, { ignoreSearch: true });

    // Revalidation réseau : met le cache à jour pour le prochain lancement.
    // null en cas d'échec (hors-ligne) — jamais d'exception non rattrapée.
    const network = fetch(req)
      .then((res) => {
        if (res.ok) cache.put(req, res.clone());
        return res;
      })
      .catch(() => null);

    if (cached) {
      // Cache servi tout de suite ; la revalidation continue en arrière-plan.
      event.waitUntil(network);
      return cached;
    }

    // Pas en cache (premier accès) : on attend le réseau.
    const res = await network;
    if (res) return res;

    // Hors-ligne : pour une navigation, servir l'app ; sinon échec propre.
    if (req.mode === "navigate") {
      const fallback = await cache.match("./index.html");
      if (fallback) return fallback;
    }
    return Response.error();
  })());
});
