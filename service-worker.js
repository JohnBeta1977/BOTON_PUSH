document.getElementById('send-notification').addEventListener('click', () => {
    // 1. Solicitar permiso de notificación
    if ('Notification' in window) {
        Notification.requestPermission(permission => {
            if (permission === 'granted') {
                console.log('Permiso de notificación concedido.');

                // 2. Enviar la notificación
                const notificationTitle = 'Hola desde mi PWA!';
                const notificationOptions = {
                    body: 'Esta es una notificación de prueba manual.',
                    icon: 'icon.png' // Asegúrate de tener un icono
                };

                // Uso del service worker para mostrar la notificación
                navigator.serviceWorker.ready.then(registration => {
                    registration.showNotification(notificationTitle, notificationOptions);
                });

            } else {
                console.log('Permiso de notificación denegado.');
            }
        });
    } else {
        console.log('Las notificaciones no son compatibles en este navegador.');
    }
});
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