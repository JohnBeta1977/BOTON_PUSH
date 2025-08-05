// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('SW registrado'))
    .catch(err => console.error('Error registrando SW:', err));
}

// Pedir permiso y enviar notificación
document.getElementById('notifyBtn').addEventListener('click', async () => {
  if (!('Notification' in window)) {
    alert('Este navegador no soporta notificaciones.');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification('Hola desde la PWA!', {
        body: 'Esta es una notificación local 😎',
        icon: './logo.png',
        vibrate: [100, 50, 100],
        tag: 'simple-pwa-notify'
      });
    });
  } else {
    alert('Permiso de notificación denegado.');
  }
});
