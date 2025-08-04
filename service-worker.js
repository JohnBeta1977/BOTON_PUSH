self.addEventListener('install', event => {
    console.log('Service Worker instalado.');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Service Worker activado.');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
    console.log('Notificación clicada:', event);
    event.notification.close();
});
