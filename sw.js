/**
 * Service Worker for Game Night Scorekeeper
 * Version: 5.4.0
 * Cache Version: v20
 */

const CACHE_NAME = 'game-night-v20';
const APP_VERSION = '5.4.0';

const requiredUrls = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

const optionalUrls = [
  './firebase-config.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log(`[SW ${APP_VERSION}] Installing...`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        console.log(`[SW ${APP_VERSION}] Caching required files...`);
        // Cache required files (will fail install if any missing)
        await cache.addAll(requiredUrls);

        // Try to cache optional files (won't fail if missing)
        console.log(`[SW ${APP_VERSION}] Caching optional files...`);
        for (const url of optionalUrls) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await cache.put(url, response);
              console.log(`[SW ${APP_VERSION}] Cached optional: ${url}`);
            }
          } catch (err) {
            console.log(`[SW ${APP_VERSION}] Optional file not found: ${url}`);
          }
        }

        console.log(`[SW ${APP_VERSION}] Cache complete`);
      })
      .catch(err => {
        console.log(`[SW ${APP_VERSION}] Cache install failed:`, err);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log(`[SW ${APP_VERSION}] Activating...`);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log(`[SW ${APP_VERSION}] Deleting old cache:`, cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip Firebase and external API requests (let them go to network)
  const url = new URL(event.request.url);
  if (url.hostname.includes('firebase') || 
      url.hostname.includes('googleapis') ||
      url.hostname.includes('gstatic')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          // Return cached version
          return response;
        }
        
        // Fetch from network
        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200) {
            return response;
          }
          
          // Clone and cache the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
      .catch(() => {
        // Offline fallback - return cached index.html for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});

// Listen for messages from the app
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: APP_VERSION });
  }
});
