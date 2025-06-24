const mqtt = require("mqtt");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

const prisma = new PrismaClient();
dotenv.config();

const client = mqtt.connect(process.env.MQTTSERVER);
const topic = "nodo/ESP32/ambiente";

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
    const data = JSON.parse(message.toString());
    console.log("Mensaje recibido:", data);

    const sensor = await prisma.sensors.findFirst({
      where: { name: data.sensorId },
    });

    if (!sensor) {
      console.error("Sensor no encontrado:", data.sensorId);
      return;
    }

    const timestampMs = Number(data.timestamp) * 1000;
    const date = new Date(timestampMs);

    // On exclut sensorId et timestamp pour traiter uniquement les valeurs
    const keys = Object.keys(data).filter(
      (k) => !["sensorId", "timestamp"].includes(k),
    );

    for (const key of keys) {
      const value = parseFloat(data[key]);
      if (isNaN(value)) {
        console.warn(`Valor inválido para ${key}:`, data[key]);
        continue;
      }

      // Vérifie ou crée le type de lecture (ex: "temperature", "humidity")
      let readingType = await prisma.sensor_reading_types.findUnique({
        where: { name: key },
      });

      if (!readingType) {
        // Par défaut, aucune unité ni description, à compléter manuellement plus tard
        readingType = await prisma.sensor_reading_types.create({
          data: {
            name: key,
            unit: "",
            description: "",
          },
        });
        console.log(`Nuevo tipo de lectura creado: ${key}`);
      }

      // Enregistre la lecture
      await prisma.sensor_readings.create({
        data: {
          sensor_id: sensor.id,
          type_id: readingType.id,
          timestamp: date,
          value,
        },
      });

      console.log(`Lectura de ${key} registrada: ${value}`);
    }
  } catch (error) {
    console.error("Error procesando el mensaje:", error);
  }
});

process.on("SIGINT", async () => {
  console.log("Desconectando...");
  await prisma.$disconnect();
  process.exit();
});
