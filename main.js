// Tus credenciales de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB1BpsgP-zKlq-YfrhjpKF7Nt7bQm1zUxs",
    authDomain: "salud-integral-pwa.firebaseapp.com",
    projectId: "salud-integral-pwa",
    storageBucket: "salud-integral-pwa.firebasestorage.app",
    messagingSenderId: "485268405075",
    appId: "1:485268405075:web:b9af1c39ea4aead3f0bfa6"
};

// Clave VAPID pública
const vapidPublicKey = 'BInO8Dg-awsarYdPs6eFZNO4sgOCNbHkJkuFHzLt25xPcDAjGLwrKwUwW5ci-5IqKNSvOoSmji5U3G9bMbobG3M';

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Obtener el botón de suscripción
const subscribeButton = document.getElementById('subscribe-button');

// Lógica para suscribir al usuario
const subscribeUser = async () => {
    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidPublicKey
        });

        console.log('Suscripción exitosa:', subscription);
        alert('Te has suscrito a las notificaciones. ¡Gracias!');

        // Aquí debes enviar la suscripción a tu servidor.
        // Por ejemplo, con una llamada fetch:
        // await fetch('/api/subscribe', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(subscription)
        // });

    } catch (error) {
        console.error('Fallo la suscripción:', error);
        alert('No se pudo suscribir a las notificaciones. Por favor, revisa los permisos.');
    }
};

// Agregar un listener al botón
subscribeButton.addEventListener('click', () => {
    subscribeUser();
});

