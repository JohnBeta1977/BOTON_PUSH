self.addEventListener('install', () => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('Service Worker activado');
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./') // redirige al inicio
  );
});
