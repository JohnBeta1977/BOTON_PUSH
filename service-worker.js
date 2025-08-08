// Importar y configurar Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Tus credenciales de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB1BpsgP-zKlq-YfrhjpKF7Nt7bQm1zUxs",
    authDomain: "salud-integral-pwa.firebaseapp.com",
    projectId: "salud-integral-pwa",
    storageBucket: "salud-integral-pwa.firebasestorage.app",
    messagingSenderId: "485268405075",
    appId: "1:485268405075:web:b9af1c39ea4aead3f0bfa6"
};

// Inicializar Firebase en el Service Worker
firebase.initializeApp(firebaseConfig);

// Listener para cuando el servidor envía una notificación
self.addEventListener('push', event => {
    console.log('Notificación push recibida:', event);
    const notificationData = event.data.json();

    const title = notificationData.notification.title || 'Nueva Notificación';
    const options = {
        body: notificationData.notification.body || 'Has recibido una nueva notificación.',
        icon: notificationData.notification.icon || '/BOTON_PUSH/plant-leaf.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Listener para cuando el usuario hace clic en la notificación
self.addEventListener('notificationclick', event => {
    console.log('Notificación clicada:', event);
    event.notification.close();
    // Aquí puedes añadir lógica para abrir una URL al hacer clic
    // event.waitUntil(clients.openWindow('https://www.google.com'));
});
