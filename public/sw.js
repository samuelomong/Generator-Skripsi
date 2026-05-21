const CACHE_NAME = "skripsi-generator-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/src/main.tsx",
  "/src/App.tsx",
  "/src/index.css",
  "/public/manifest.json",
  "/public/android-icon.svg"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Listener (Network First, fallback to cache)
self.addEventListener("fetch", (event) => {
  // Only intercept same-origin HTTP/S requests
  if (event.request.url.startsWith(self.location.origin) && event.request.method === "GET") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses dynamic
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, copy);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((fallback) => {
            return fallback || Response.error();
          });
        })
    );
  }
});
