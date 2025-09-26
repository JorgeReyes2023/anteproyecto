const mqtt = require("mqtt");
const dotenv = require("dotenv");

dotenv.config();

console.log("🧪 PRUEBA DE CONEXIÓN MQTT");
console.log("========================");
console.log(`Servidor: ${process.env.MQTTSERVER}`);
console.log(`Usuario: ${process.env.MQTT_USERNAME}`);
console.log(`ClientID: ${process.env.CLIENTID}`);
console.log(
  `Contraseña: ${process.env.PASSWORD_MQ ? "[DEFINIDA]" : "[FALTA]"}`,
);
console.log("========================");

const client = mqtt.connect(process.env.MQTTSERVER, {
  username: process.env.MQTT_USERNAME,
  password: process.env.PASSWORD_MQ,
  clientId: process.env.CLIENTID,
  keepalive: 60,
  reconnectPeriod: 1000,
  connectTimeout: 10000,
});

// Prueba de conexión
client.on("connect", () => {
  console.log("✅ ¡CONEXIÓN OK!");
  console.log("🎯 Los datos son correctos");

  // Prueba de suscripción a un topic simple
  client.subscribe("Extensometer/get", (err) => {
    if (!err) {
      console.log("📡 Suscrito al topic Extensometer/get");
    }
  });
});

// Prueba de recepción
client.on("message", (topic, message) => {
  console.log(`📨 Mensaje recibido en ${topic}: ${message.toString()}`);
});

// Gestión de errores
client.on("error", (error) => {
  console.error("❌ ¡ERROR DE CONEXIÓN!");
  console.error("Detalles:", error.message);

  if (error.code === 4) {
    console.error(
      "🚫 Credenciales rechazadas (usuario/contraseña incorrectos)",
    );
  } else if (error.code === 5) {
    console.error("🚫 Conexión no autorizada");
  } else {
    console.error("🚫 Error de red o servidor inaccesible");
  }
});

client.on("offline", () => {
  console.warn("⚠️ Cliente fuera de línea");
});

// Cerrar después de 30 segundos
setTimeout(() => {
  console.log("🛑 Fin de la prueba");
  client.end();
  process.exit(0);
}, 30000);

console.log("⏳ Intentando conectar...");
