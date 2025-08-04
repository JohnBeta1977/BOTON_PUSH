document.getElementById('send-notification').addEventListener('click', () => {
    // 1. Solicitar permiso de notificación
    if ('Notification' in window) {
        Notification.requestPermission(permission => {
            if (permission === 'granted') {
                console.log('Permiso de notificación concedido.');

                // 2. Enviar la notificación con el nuevo texto y el ícono
                const notificationTitle = 'He aquí esta es la notificación de tu página PWA';
                const notificationOptions = {
                    body: 'Acompañada de un icono de hoja de planta',
                    icon: '/BOTON_PUSH/plant-leaf.png'
                };

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