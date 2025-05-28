const mqtt = require('mqtt');
const db = require('../database/db');

const client = mqtt.connect(process.env.MQTT_BROKER);

client.on('connect', () => {
  console.log('🟢 Conectado al broker MQTT');
  client.subscribe('nodo/+/+', (err) => {
    if (err) console.error('❌ Error al suscribirse:', err);
    else console.log('📡 Suscrito a nodo/+/+');
  });
});

client.on('message', async (topic, message) => {
  try {
    const [_, nodoId, variable] = topic.split('/');
    const data = JSON.parse(message.toString());

    const { sensorId, timestamp } = data;
    const value = data[variable];

    await db.query(
      'INSERT INTO readings (sensor_id, timestamp, value, variable) VALUES ($1, $2, $3, $4)',
      [sensorId, timestamp, value, variable]
    );

    console.log(`✅ Guardado: nodo ${nodoId} - ${variable} = ${value}`);
  } catch (err) {
    console.error('❌ Error procesando mensaje:', err);
  }
});
