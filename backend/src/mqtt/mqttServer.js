const mqtt = require("mqtt");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();
const prisma = new PrismaClient();
const client = mqtt.connect(process.env.MQTTSERVER);

// === CACHÉS ===
const topicsCache = new Map(); // topicBase => topicBase
const readingTypeCache = new Map(); // typeName => id
const thresholdCache = new Map(); // "sensorId-typeId" => threshold

// === Cola en memoria para lecturas ===
const readingQueue = [];

// === Obtener tipo de lectura con caché ===
async function getReadingTypeId(typeName) {
  if (readingTypeCache.has(typeName)) return readingTypeCache.get(typeName);

  const type = await prisma.sensor_reading_types.findFirst({
    where: { name: typeName },
  });

  if (type) {
    readingTypeCache.set(typeName, type.id);
    return type.id;
  }

  return null;
}

// === Obtener threshold con caché ===
async function getThreshold(sensorId, typeId) {
  const key = `${sensorId}-${typeId}`;
  if (thresholdCache.has(key)) return thresholdCache.get(key);

  const threshold = await prisma.thresholds.findFirst({
    where: {
      sensor_id: sensorId,
      type_id: typeId,
    },
  });

  if (threshold) thresholdCache.set(key, threshold);

  return threshold;
}

// === Obtener topics desde la base de datos ===
async function generateTopicsFromDB() {
  const sensors = await prisma.sensors.findMany({
    select: {
      name: true,
      nodes: {
        select: {
          name: true,
          projects: {
            select: {
              name: true,
              companies: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const topicSet = new Set();

  for (const sensor of sensors) {
    if (!sensor.nodes || !sensor.nodes.projects) continue;
    const companyName = normalizeTopicPart(
      sensor.nodes.projects.companies.name,
    );
    const projectName = normalizeTopicPart(sensor.nodes.projects.name);
    const nodeName = normalizeTopicPart(sensor.nodes.name);
    const topicBase = `${companyName}/${projectName}/${nodeName}`;
    topicSet.add(topicBase);
  }

  for (const topicBase of topicSet) {
    console.log(`Generando topic: ${topicBase}`);
    if (!topicsCache.has(topicBase)) {
      topicsCache.set(topicBase, topicBase);
      client.subscribe(topicBase, (err) => {
        if (err) console.error(`Error al suscribirse a ${topicBase}:`, err);
        else console.log(`Suscrito a ${topicBase}`);
      });
    }
  }
}

function normalizeTopicPart(str) {
  return str
    .normalize("NFD") // Descompone tildes (ej. á → a + ́)
    .replace(/[\u0300-\u036f]/g, "") // Elimina los signos diacríticos (tildes)
    .replace(/\s+/g, "") // Elimina todos los espacios
    .toLowerCase(); // (Opcional) Convierte todo a minúsculas
}

// === Limpiar topics obsoletos en cache ===
async function cleanTopicsCache() {
  const validTopics = new Set();

  const sensors = await prisma.sensors.findMany({
    select: {
      name: true,
      nodes: {
        select: {
          name: true,
          projects: {
            select: {
              name: true,
              companies: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  for (const sensor of sensors) {
    if (
      !sensor.nodes ||
      !sensor.nodes.projects ||
      !sensor.nodes.projects.companies
    )
      continue;

    const companyName = normalizeTopicPart(
      sensor.nodes.projects.companies.name,
    );
    const projectName = normalizeTopicPart(sensor.nodes.projects.name);
    const nodeName = normalizeTopicPart(sensor.nodes.name);
    const topicBase = `${companyName}/${projectName}/${nodeName}`;

    validTopics.add(topicBase);
  }

  for (const cachedTopic of topicsCache.keys()) {
    if (!validTopics.has(cachedTopic)) {
      console.log(`🧹 Eliminando topic obsoleto: ${cachedTopic}`);
      client.unsubscribe(cachedTopic);
      topicsCache.delete(cachedTopic);
    }
  }
}

// === Procesamiento de lecturas (cada 500ms) ===
setInterval(async () => {
  if (readingQueue.length === 0) return;

  const batch = readingQueue.splice(0, 10);

  await Promise.all(
    batch.map(async ({ sensorId, typeName, value, timestamp }) => {
      const typeId = await getReadingTypeId(typeName);
      if (!typeId) return;

      await prisma.sensor_readings.create({
        data: { sensor_id: sensorId, type_id: typeId, value, timestamp },
      });

      const threshold = await getThreshold(sensorId, typeId);
      if (!threshold) return;

      const { min_value, max_value } = threshold;
      let level = null;
      let message = "";

      if (max_value !== null && value > max_value) {
        level = "critical";
        message = `Valor ${value} supera el máximo (${max_value}) para ${typeName}`;
      } else if (min_value !== null && value < min_value) {
        level = "critical";
        message = `Valor ${value} está por debajo del mínimo (${min_value}) para ${typeName}`;
      } else if (max_value !== null && min_value !== null) {
        const range = max_value - min_value;
        const warningMargin = range * 0.2;

        if (value > max_value - warningMargin) {
          level = "warning";
          message = `Valor ${value} se aproxima al máximo (${max_value}) para ${typeName}`;
        } else if (value < min_value + warningMargin) {
          level = "warning";
          message = `Valor ${value} se aproxima al mínimo (${min_value}) para ${typeName}`;
        }
      }

      if (level) {
        await prisma.alerts.create({
          data: {
            sensor_id: sensorId,
            level,
            message,
          },
        });

        console.log(`${level.toUpperCase()}: ${message}`);
      }
    }),
  );
}, 500);

// === Conexión al broker MQTT ===
client.on("connect", async () => {
  console.log("Conectado al broker MQTT");
  await generateTopicsFromDB();
});

// === Revisión periódica de nuevos/borrados topics ===
setInterval(async () => {
  await generateTopicsFromDB(); // agregar nuevos
  await cleanTopicsCache(); // eliminar obsoletos
}, 60000); // cada 1 minuto

// === Procesar mensajes recibidos ===
client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Mensaje recibido:", data);

    const sensores = data.sensores;
    if (!Array.isArray(sensores)) {
      console.error("'sensores' no es un arreglo");
      return;
    }

    for (const sensorData of sensores) {
      const sensorName = sensorData.nombreSensor.toUpperCase();
      const valores = sensorData.valor;

      const sensor = await prisma.sensors.findFirst({
        where: { name: sensorName },
      });

      if (!sensor) {
        console.error("Sensor no encontrado:", sensorName);
        continue;
      }

      const timestamp = new Date(); // usa timestamp local (o cambia si tu payload lo tiene)

      for (const key of Object.keys(valores)) {
        const value = parseFloat(valores[key]);
        if (isNaN(value)) {
          console.warn(`Valor inválido para ${key}:`, valores[key]);
          continue;
        }

        readingQueue.push({
          sensorId: sensor.id,
          typeName: key,
          value,
          timestamp,
        });
      }
    }
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
  }
});

// === Salida limpia ===
process.on("SIGINT", async () => {
  console.log("Cerrando conexión y Prisma...");
  await prisma.$disconnect();
  client.end();
  process.exit();
});
