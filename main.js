// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('SW registrado'))
    .catch(err => console.error('Error registrando SW:', err));
}

// Solicitar permiso de notificación si no se ha solicitado
async function solicitarPermiso() {
  if (!('Notification' in window)) return;
  const current = Notification.permission;
  if (current === 'default') {
    await Notification.requestPermission();
  }
}

// Programar notificación automática
async function programarNotificacion() {
  const yaNotificado = localStorage.getItem('notificado');
  if (yaNotificado) return;

  if (Notification.permission === 'granted') {
    console.log('Programando notificación automática en 5 minutos...');
    setTimeout(() => {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('¡Gracias por instalar!', {
          body: 'Han pasado 5 minutos desde que instalaste la app 😄',
          icon: './logo.png',
          vibrate: [200, 100, 200],
          tag: 'instalacion-pwa'
        });
        localStorage.setItem('notificado', '1'); // Evita que se repita
      });
    }, 5 * 60 * 1000); // 5 minutos
  }
}

// Ejecutar cuando el DOM esté listo
window.addEventListener('load', async () => {
  await solicitarPermiso();
  programarNotificacion();
});

// Botón de prueba manual
document.getElementById('notifyBtn')?.addEventListener('click', async () => {
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

