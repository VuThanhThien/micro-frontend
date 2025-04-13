self.addEventListener('activate', () => {
  console.log('🚀 ~ ...Service worker is active!');
});

self.addEventListener('install', () => {
  console.log('🚀 ~ ...Service worker installed.');
});

// Receive push notifications
self.addEventListener('push', event => {
  const data = event.data.json();
  const image =
    'https://cdn.glitch.com/614286c9-b4fc-4303-a6a9-a4cef0601b74%2Flogo.png?v=1605150951230';
  const options = {
    body: data.options.body,
    icon: image,
  };
  self.registration.showNotification(data.title, options);
});

self.addEventListener('notificationclick', event => {
  const data = event.data.json();
  const link = linkify(data)[0];
  event.waitUntil(self.clients.openWindow(link));
  event.notification.close();
});

const urlsToCache = ['/', 'index.html', '404.html'];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open('pwa-assets');
      return cache.addAll(urlsToCache);
    })()
  );
});
