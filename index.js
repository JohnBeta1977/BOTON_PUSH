// Importar los módulos necesarios de Firebase
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Inicializar la aplicación de Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Tu clave VAPID privada (¡IMPORTANTE: mantenla segura, nunca la compartas!)
// Asegúrate de reemplazar 'TU_CLAVE_VAPID_PRIVADA_AQUÍ' con tu clave real.
// Puedes encontrarla en la misma sección de Firebase Cloud Messaging donde
// generaste la clave pública.
const VAPID_PRIVATE_KEY = "BInO8Dg-awsarYdPs6eFZNO4sgOCNbHkJkuHHzLt25xPcDAjGLwrKwUwW5ci-5IqKNSvOoSmji5U3G9bMbobG3M";

// Configurar web-push
const webpush = require("web-push");
webpush.setVapidDetails(
    "mailto:viviraplicaciones@gmail.com", // Reemplaza con tu correo electrónico
    "BInO8Dg-awsarYdPs6eFZNO4sgOCNbHkJkuHHzLt25xPcDAjGLwrKwUwW5ci-5IqKNSvOoSmji5U3G9bMbobG3M", // Tu clave VAPID pública
    VAPID_PRIVATE_KEY // Tu clave VAPID privada
);

// Función para guardar una suscripción
exports.subscribe = functions.https.onRequest(async (req, res) => {
    try {
        const subscription = req.body;
        await db.collection("subscriptions").add(subscription);
        res.status(200).send({message: "Subscription saved successfully."});
    } catch (error) {
        console.error("Error saving subscription:", error);
        res.status(500).send({error: "Internal Server Error"});
    }
});

// Función programada para enviar la notificación push
// Se ejecutará todos los días a la 1:30 PM (UTC)
exports.sendDailyPushNotification = functions.pubsub
    .schedule("30 13 * * *")
    .onRun(async (context) => {
        console.log("Running daily push notification job at 1:30 PM UTC");

        const payload = JSON.stringify({
            notification: {
                title: "Recordatorio de salud integral",
                body: "¡No olvides tomar tu medicina a tiempo!",
                icon: "/BOTON_PUSH/plant-leaf.png",
            },
        });

        try {
            const subscriptionsSnapshot =
                await db.collection("subscriptions").get();
            subscriptionsSnapshot.forEach(async (doc) => {
                const subscription = doc.data();
                try {
                    await webpush.sendNotification(subscription, payload);
                } catch (error) {
                    console.error(
                        "Failed to send notification to a subscription:",
                        error,
                    );
                }
            });

            console.log("Daily notifications sent successfully.");
            return null;
        } catch (error) {
            console.error("Error sending daily notifications:", error);
            return null;
        }
    });
