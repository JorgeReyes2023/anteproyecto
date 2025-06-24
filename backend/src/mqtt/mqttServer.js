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

    const keys = Object.keys(data).filter(
      (k) => !["sensorId", "timestamp"].includes(k),
    );

    for (const key of keys) {
      const value = parseFloat(data[key]);
      if (isNaN(value)) {
        console.warn(`Valor inválido para ${key}:`, data[key]);
        continue;
      }

      let readingType = await prisma.sensor_reading_types.upsert({
        where: { name: key },
        update: {},
        create: {
          name: key,
          unit: "",
          description: "",
        },
      });
      if (readingType.createdAt === readingType.updatedAt) {
        console.log(`Nuevo tipo de lectura creado: ${key}`);
      }

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
