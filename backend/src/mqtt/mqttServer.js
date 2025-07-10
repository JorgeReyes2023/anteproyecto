const mqtt = require("mqtt");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const { broadcastAlert } = require("../app"); // Importar la función de broadcast

const prisma = new PrismaClient();
dotenv.config();

const client = mqtt.connect(process.env.MQTTSERVER);
const topic = "nodo/ESP32/ambiente";

// === Cola en memoria para lecturas pendientes ===
const readingQueue = [];

// === Cachés para optimizar las consultas ===
const readingTypeCache = new Map(); // typeName => id
const thresholdCache = new Map(); // "sensorId-typeId" => threshold

// === Función utilitaria para obtener el tipo de lectura con caché ===
async function getReadingTypeId(typeName) {
  if (readingTypeCache.has(typeName)) {
    return readingTypeCache.get(typeName);
  }

  const type = await prisma.sensor_reading_types.findFirst({
    where: { name: typeName },
  });
  if (type) {
    readingTypeCache.set(typeName, type.id);
    return type.id;
  }

  return null;
}

// === Función utilitaria para obtener un threshold con caché ===
async function getThreshold(sensorId, typeId) {
  const key = `${sensorId}-${typeId}`;
  if (thresholdCache.has(key)) {
    return thresholdCache.get(key);
  }

  const threshold = await prisma.thresholds.findFirst({
    where: {
      sensor_id: sensorId,
      type_id: typeId,
    },
  });

  if (threshold) {
    thresholdCache.set(key, threshold);
  }

  return threshold;
}

// === Procesamiento de la cola cada 500 ms ===
setInterval(async () => {
  if (readingQueue.length === 0) return;

  const batch = readingQueue.splice(0, 10); // procesar máximo 10 lecturas a la vez

  await Promise.all(
    batch.map(async ({ sensorId, typeName, value, timestamp }) => {
      const typeId = await getReadingTypeId(typeName);
      if (!typeId) return;

      await prisma.sensor_readings.create({
        data: {
          sensor_id: sensorId,
          type_id: typeId,
          timestamp,
          value,
        },
      });

      const threshold = await getThreshold(sensorId, typeId);
      if (!threshold) return;

      const { min_value, max_value } = threshold;
      let level = null;
      let message = "";

      if (max_value !== null && value > max_value) {
        level = "critical";
        message = `Valor ${value} supera el máximo permitido (${max_value}) para ${typeName}`;
      } else if (min_value !== null && value < min_value) {
        level = "critical";
        message = `Valor ${value} está por debajo del mínimo permitido (${min_value}) para ${typeName}`;
      } else {
        const range =
          max_value !== null && min_value !== null
            ? max_value - min_value
            : null;

        if (range && range > 0) {
          const seuilWarning = range * 0.2;

          if (max_value !== null && value > max_value - seuilWarning) {
            level = "warning";
            message = `Valor ${value} se aproxima al máximo (${max_value}) para ${typeName}`;
          } else if (min_value !== null && value < min_value + seuilWarning) {
            level = "warning";
            message = `Valor ${value} se aproxima al mínimo (${min_value}) para ${typeName}`;
          }
        }
      }

      if (level) {
        await prisma.alerts.create({
          data: {
            sensor_id: sensorId,
            message,
            level,
          },
        });

        const alert = {
          sensorId,
          message,
          level,
          timestamp: new Date(),
        };

        broadcastAlert(alert);
        console.log(`Alarma generada: ${level.toUpperCase()} - ${message}`);
      }
    }),
  );
}, 500);

// === Conexión al broker MQTT ===
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

// === Recepción de mensajes MQTT ===
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

      // Agregar a la cola para procesamiento diferido
      readingQueue.push({
        sensorId: sensor.id,
        typeName: key,
        value,
        timestamp: date,
      });
    }
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
  }
});

// === Cierre limpio ===
process.on("SIGINT", async () => {
  console.log("Solicitud de parada, cerrando cliente MQTT y Prisma...");
  await prisma.$disconnect();
  process.exit();
});
