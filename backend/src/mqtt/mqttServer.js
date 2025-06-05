const mqtt = require("mqtt");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

const prisma = new PrismaClient();

// Conexión al broker MQTT
dotenv.config();

const client = mqtt.connect(process.env.MQTTSERVER);

// Suscribirse al tópico deseado
const topic = "nodo/ESP32/ambiente"; // Cambia a tu tópico real

client.on("connect", () => {
    console.log("Conectado al broker MQTT");
    client.subscribe(topic, (err) => {
        if (err) {
            console.error("Error al suscribirse:", err);
        } else {
            console.log(`Suscrito a ${topic}`);
        }
    });
});

client.on("message", async (topic, message) => {
    try {
        // Parsea el mensaje recibido
        const data = JSON.parse(message.toString());
        console.log("Mensaje recibido:", data);

        // 1️⃣ Busca el id real del sensor en la tabla sensors
const sensor = await prisma.sensors.findFirst({
  where: { name: data.sensorId }, // Usamos el nombre como identificador
});

if (!sensor) {
  console.error("Sensor no encontrado:", data.sensorId);
  return; // Salir para evitar error en la inserción
}

// 2️⃣ Asegura que la fecha esté en formato válido
const timestampMs = Number(data.timestamp) * 1000; // Si es un timestamp en segundos
const date = new Date(timestampMs);

// 3️⃣ Inserta el registro en sensor_readings usando el id real
await prisma.sensor_readings.create({
  data: {
    sensor_id: sensor.id,
    timestamp: date,
    temperature: data.temperature,
    humidity: data.humidity,
  },
});

console.log("Lectura almacenada correctamente para", sensor.name);


        console.log("Datos almacenados en PostgreSQL");
    } catch (error) {
        console.error("Error procesando el mensaje:", error);
    }
});

// Desconectar Prisma cuando apagues el servidor
process.on("SIGINT", async () => {
    console.log("Desconectando...");
    await prisma.$disconnect();
    process.exit();
});
