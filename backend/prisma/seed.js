const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  // Inserción de datos
  await prisma.companies.createMany({
    data: [
    {
        "name": "EcuadorTech S.A.",
        "address": "Av. Amazonas 1345, Quito"
    },
    {
        "name": "Andes Soluciones",
        "address": "Calle Chile y Aguirre, Guayaquil"
    },
    {
        "name": "Control Climático Loja",
        "address": "Av. Universitaria y Av. Manuel Agustín Aguirre, Loja"
    },
    {
        "name": "Innovaciones Tungurahua",
        "address": "Av. Cevallos y Montalvo, Ambato"
    },
    {
        "name": "ClimaSmart S.A.",
        "address": "Av. Remigio Crespo y Cornelio Merchán, Cuenca"
    },
    {
        "name": "SensorData Ecuador",
        "address": "Av. 6 de Diciembre y Naciones Unidas, Quito"
    },
    {
        "name": "ElectroCloud Systems",
        "address": "Malecón Simón Bolívar y 9 de Octubre, Guayaquil"
    },
    {
        "name": "Carchi Electrónica",
        "address": "Av. Bolívar y Av. Carchi, Tulcán"
    },
    {
        "name": "IoT Solutions Riobamba",
        "address": "Av. Daniel León Borja y Av. de los Shyris, Riobamba"
    },
    {
        "name": "Ambiente Inteligente",
        "address": "Av. 10 de Agosto y Av. El Inca, Quito"
    }
],
    skipDuplicates: true
  });

  await prisma.projects.createMany({
    data: [
    {
        "name": "proyecto test",
        "description": "dev data",
        "company_id": 1
    }
],
    skipDuplicates: true
  });

  await prisma.nodes.createMany({
    data: [
    {
        "name": "Sistema foltovoltaico",
        "location": "loc node1",
        "project_id": null,
        "status": "ACTIVE"
    },
    {
        "name": "Sistema hibernadero",
        "location": "planta baja",
        "project_id": null,
        "status": "MAINTENANCE"
    }
],
    skipDuplicates: true
  });

  await prisma.sensor_reading_types.createMany({
    data: [
    {
        "name": "humedad",
        "unit": "%",
        "description": "Humedad relativa del aire"
    },
    {
        "name": "temperatura",
        "unit": "C°",
        "description": "Temperatura ambiente medida por el sensor, expresada en grados Celsius (°C)."
    },
    {
        "name": "brillo",
        "unit": "lux",
        "description": null
    },
    {
        "name": "corriente",
        "unit": "A",
        "description": "Mide la corriente generada por los paneles"
    },
    {
        "name": "voltaje",
        "unit": "V",
        "description": "Mide la tension entre terminales"
    },
    {
        "name": "irradiancia",
        "unit": "W/m²",
        "description": "Mide la energia solar incidente en una area"
    }
],
    skipDuplicates: true
  });

  await prisma.user_roles.createMany({
    data: [
    {
        "name": "admin",
        "description": null
    },
    {
        "name": "user",
        "description": null
    }
],
    skipDuplicates: true
  });

  await prisma.users.createMany({
    data: [
    {
        "name": "admin-dev",
        "email": "admin@email.com",
        "password": "$2y$10$K3Pfj0CiBqukj0qtIsQLA./2SZLG5Z94cg9pNhuUTvXcPXa0m/uM6",
        "user_role_id": 1,
        "company_id": null
    },
    {
        "name": "user-dev",
        "email": "user@email.com",
        "password": "$2y$10$ya31jyNfYQnDSu1qUVII.exGNT05GBf773lXrwk7JCLVYvfw9zStq",
        "user_role_id": 2,
        "company_id": 1
    }
],
    skipDuplicates: true
  });

  await prisma.sensors.createMany({
    data: [
    {
        "name": "ESP32-DHT11-SIMULADO",
        "node_id": 1,
        "status": "ACTIVE"
    },
    {
        "name": "BH-1750",
        "node_id": null,
        "status": "INACTIVE"
    },
    {
        "name": "ACS-712",
        "node_id": null,
        "status": "ACTIVE"
    },
    {
        "name": "INA-219",
        "node_id": null,
        "status": "ACTIVE"
    },
    {
        "name": "PIRANOMETRO-1",
        "node_id": null,
        "status": "ACTIVE"
    }
],
    skipDuplicates: true
  });

  await prisma.sensor_readings.createMany({
    data: [
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-01T01:18:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 49,
        "timestamp": "1970-01-01T01:18:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 20,
        "timestamp": "1970-01-01T02:42:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 51,
        "timestamp": "1970-01-01T02:42:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-01T04:05:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 43,
        "timestamp": "1970-01-01T04:05:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-01T05:29:01.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-01T05:29:01.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 27,
        "timestamp": "1970-01-01T06:52:22.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 39,
        "timestamp": "1970-01-01T06:52:22.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 23,
        "timestamp": "1970-01-01T08:15:43.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 44,
        "timestamp": "1970-01-01T08:15:43.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 25,
        "timestamp": "1970-01-01T09:39:04.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 58,
        "timestamp": "1970-01-01T09:39:04.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 26,
        "timestamp": "1970-01-01T11:02:26.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 44,
        "timestamp": "1970-01-01T11:02:26.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-01T12:25:47.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 36,
        "timestamp": "1970-01-01T12:25:47.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 20,
        "timestamp": "1970-01-01T13:49:08.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 37,
        "timestamp": "1970-01-01T13:49:08.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 26,
        "timestamp": "1970-01-01T15:12:29.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 46,
        "timestamp": "1970-01-01T15:12:29.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 24,
        "timestamp": "1970-01-01T16:35:51.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-01T16:35:51.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-01T17:59:12.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 56,
        "timestamp": "1970-01-01T17:59:12.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-01T19:22:33.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 56,
        "timestamp": "1970-01-01T19:22:33.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-01T20:45:54.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 46,
        "timestamp": "1970-01-01T20:45:54.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-01T22:09:16.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 45,
        "timestamp": "1970-01-01T22:09:16.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 25,
        "timestamp": "1970-01-01T23:32:37.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 41,
        "timestamp": "1970-01-01T23:32:37.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 24,
        "timestamp": "1970-01-02T00:55:58.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 38,
        "timestamp": "1970-01-02T00:55:58.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 34,
        "timestamp": "1970-01-02T02:19:19.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 35,
        "timestamp": "1970-01-02T02:19:19.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-02T03:42:41.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 47,
        "timestamp": "1970-01-02T03:42:41.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 22,
        "timestamp": "1970-01-02T05:06:02.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 47,
        "timestamp": "1970-01-02T05:06:02.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 20,
        "timestamp": "1970-01-02T06:29:23.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 51,
        "timestamp": "1970-01-02T06:29:23.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 20,
        "timestamp": "1970-01-02T07:52:44.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 30,
        "timestamp": "1970-01-02T07:52:44.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 28,
        "timestamp": "1970-01-02T09:16:06.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 42,
        "timestamp": "1970-01-02T09:16:06.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-02T10:39:27.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 49,
        "timestamp": "1970-01-02T10:39:27.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-02T12:02:48.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 57,
        "timestamp": "1970-01-02T12:02:48.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 24,
        "timestamp": "1970-01-02T13:26:09.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 41,
        "timestamp": "1970-01-02T13:26:09.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-02T14:49:31.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 55,
        "timestamp": "1970-01-02T14:49:31.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 24,
        "timestamp": "1970-01-02T16:12:52.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 38,
        "timestamp": "1970-01-02T16:12:52.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 20,
        "timestamp": "1970-01-02T17:36:13.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 53,
        "timestamp": "1970-01-02T17:36:13.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 27,
        "timestamp": "1970-01-02T18:59:34.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 38,
        "timestamp": "1970-01-02T18:59:34.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 34,
        "timestamp": "1970-01-02T20:22:56.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 54,
        "timestamp": "1970-01-02T20:22:56.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-02T21:46:17.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 51,
        "timestamp": "1970-01-02T21:46:17.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 26,
        "timestamp": "1970-01-02T23:09:38.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 46,
        "timestamp": "1970-01-02T23:09:38.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 26,
        "timestamp": "1970-01-03T00:32:59.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 58,
        "timestamp": "1970-01-03T00:32:59.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 27,
        "timestamp": "1970-01-03T01:56:21.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 52,
        "timestamp": "1970-01-03T01:56:21.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-03T03:19:42.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 50,
        "timestamp": "1970-01-03T03:19:42.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-03T04:43:03.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 41,
        "timestamp": "1970-01-03T04:43:03.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 25,
        "timestamp": "1970-01-03T06:06:24.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 39,
        "timestamp": "1970-01-03T06:06:24.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 29,
        "timestamp": "1970-01-03T07:29:46.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 42,
        "timestamp": "1970-01-03T07:29:46.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 27,
        "timestamp": "1970-01-03T08:53:07.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 44,
        "timestamp": "1970-01-03T08:53:07.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-03T10:16:28.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 41,
        "timestamp": "1970-01-03T10:16:28.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 27,
        "timestamp": "1970-01-03T11:39:49.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 42,
        "timestamp": "1970-01-03T11:39:49.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 34,
        "timestamp": "1970-01-03T13:03:11.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-03T13:03:11.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-03T14:26:32.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 39,
        "timestamp": "1970-01-03T14:26:32.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-03T15:49:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 59,
        "timestamp": "1970-01-03T15:49:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-03T17:13:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 57,
        "timestamp": "1970-01-03T17:13:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-03T18:36:36.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 42,
        "timestamp": "1970-01-03T18:36:36.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-03T19:59:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-03T19:59:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 25,
        "timestamp": "1970-01-03T21:23:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 50,
        "timestamp": "1970-01-03T21:23:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-03T22:46:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 35,
        "timestamp": "1970-01-03T22:46:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-01T23:23:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 37,
        "timestamp": "1970-01-01T23:23:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 28,
        "timestamp": "1970-01-02T00:47:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 52,
        "timestamp": "1970-01-02T00:47:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-02T02:10:35.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 58,
        "timestamp": "1970-01-02T02:10:35.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 30,
        "timestamp": "1970-01-02T03:33:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 50,
        "timestamp": "1970-01-02T03:33:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-02T04:57:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 52,
        "timestamp": "1970-01-02T04:57:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-02T06:20:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 38,
        "timestamp": "1970-01-02T06:20:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-02T07:44:00.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 58,
        "timestamp": "1970-01-02T07:44:00.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 22,
        "timestamp": "1970-01-02T09:07:22.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 41,
        "timestamp": "1970-01-02T09:07:22.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-02T10:30:43.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 57,
        "timestamp": "1970-01-02T10:30:43.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-02T11:54:04.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 54,
        "timestamp": "1970-01-02T11:54:04.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-02T13:17:25.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-02T13:17:25.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-02T14:40:47.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 54,
        "timestamp": "1970-01-02T14:40:47.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-02T16:04:08.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 50,
        "timestamp": "1970-01-02T16:04:08.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-02T17:27:29.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-02T17:27:29.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-02T18:50:50.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 54,
        "timestamp": "1970-01-02T18:50:50.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-02T20:14:12.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 53,
        "timestamp": "1970-01-02T20:14:12.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-02T21:37:33.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 46,
        "timestamp": "1970-01-02T21:37:33.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-02T23:00:54.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-02T23:00:54.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-03T00:24:15.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 46,
        "timestamp": "1970-01-03T00:24:15.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-03T01:47:37.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-03T01:47:37.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-03T03:10:58.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-03T03:10:58.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-03T04:34:19.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-03T04:34:19.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-03T05:57:40.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-03T05:57:40.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-03T07:21:02.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 37,
        "timestamp": "1970-01-03T07:21:02.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-03T08:44:23.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 37,
        "timestamp": "1970-01-03T08:44:23.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-03T10:07:44.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 30,
        "timestamp": "1970-01-03T10:07:44.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-03T11:31:05.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 57,
        "timestamp": "1970-01-03T11:31:05.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 30,
        "timestamp": "1970-01-03T12:54:27.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 40,
        "timestamp": "1970-01-03T12:54:27.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-03T14:17:48.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-03T14:17:48.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 29,
        "timestamp": "1970-01-03T15:41:09.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 54,
        "timestamp": "1970-01-03T15:41:09.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-03T17:04:30.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 44,
        "timestamp": "1970-01-03T17:04:30.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-03T18:27:52.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-03T18:27:52.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-03T19:51:13.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-03T19:51:13.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-03T21:14:34.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 47,
        "timestamp": "1970-01-03T21:14:34.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-03T22:37:55.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 58,
        "timestamp": "1970-01-03T22:37:55.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-04T00:01:17.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-04T00:01:17.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-04T01:24:38.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 50,
        "timestamp": "1970-01-04T01:24:38.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-04T02:47:59.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 46,
        "timestamp": "1970-01-04T02:47:59.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-04T04:11:20.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 36,
        "timestamp": "1970-01-04T04:11:20.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-04T05:34:42.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 54,
        "timestamp": "1970-01-04T05:34:42.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-04T06:58:03.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 57,
        "timestamp": "1970-01-04T06:58:03.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-04T08:21:24.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 45,
        "timestamp": "1970-01-04T08:21:24.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-04T09:44:45.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 51,
        "timestamp": "1970-01-04T09:44:45.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-04T11:08:07.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 48,
        "timestamp": "1970-01-04T11:08:07.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 22,
        "timestamp": "1970-01-04T12:31:28.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 59,
        "timestamp": "1970-01-04T12:31:28.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-04T13:54:49.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-04T13:54:49.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-04T15:18:10.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-04T15:18:10.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-04T16:41:32.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 36,
        "timestamp": "1970-01-04T16:41:32.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-04T18:04:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-04T18:04:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-04T19:28:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-04T19:28:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-04T20:51:35.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-04T20:51:35.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-04T22:14:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-04T22:14:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-04T23:38:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 48,
        "timestamp": "1970-01-04T23:38:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-05T01:01:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-05T01:01:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-05T02:25:00.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 53,
        "timestamp": "1970-01-05T02:25:00.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 22,
        "timestamp": "1970-01-05T03:48:22.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 43,
        "timestamp": "1970-01-05T03:48:22.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-05T05:11:43.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 48,
        "timestamp": "1970-01-05T05:11:43.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 22,
        "timestamp": "1970-01-05T06:35:04.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 59,
        "timestamp": "1970-01-05T06:35:04.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 29,
        "timestamp": "1970-01-05T07:58:25.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 48,
        "timestamp": "1970-01-05T07:58:25.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-05T09:21:47.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 53,
        "timestamp": "1970-01-05T09:21:47.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-05T10:45:08.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-05T10:45:08.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-05T12:08:29.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 58,
        "timestamp": "1970-01-05T12:08:29.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-05T13:31:50.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 58,
        "timestamp": "1970-01-05T13:31:50.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 28,
        "timestamp": "1970-01-05T14:55:12.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 44,
        "timestamp": "1970-01-05T14:55:12.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-05T16:18:33.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-05T16:18:33.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-05T17:41:54.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-05T17:41:54.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-05T19:05:15.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 58,
        "timestamp": "1970-01-05T19:05:15.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-05T20:28:37.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-05T20:28:37.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-05T21:51:58.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 48,
        "timestamp": "1970-01-05T21:51:58.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-05T23:15:19.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-05T23:15:19.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-06T00:38:40.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 49,
        "timestamp": "1970-01-06T00:38:40.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-06T02:02:02.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 37,
        "timestamp": "1970-01-06T02:02:02.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-06T03:25:23.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 40,
        "timestamp": "1970-01-06T03:25:23.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-06T04:48:44.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 52,
        "timestamp": "1970-01-06T04:48:44.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-06T06:12:05.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 44,
        "timestamp": "1970-01-06T06:12:05.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-06T07:35:27.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 59,
        "timestamp": "1970-01-06T07:35:27.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 29,
        "timestamp": "1970-01-06T08:58:48.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 38,
        "timestamp": "1970-01-06T08:58:48.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-06T10:22:09.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 49,
        "timestamp": "1970-01-06T10:22:09.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-06T11:45:30.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 38,
        "timestamp": "1970-01-06T11:45:30.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 22,
        "timestamp": "1970-01-06T13:08:52.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 47,
        "timestamp": "1970-01-06T13:08:52.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-06T14:32:13.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 38,
        "timestamp": "1970-01-06T14:32:13.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-06T15:55:34.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-06T15:55:34.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 22,
        "timestamp": "1970-01-06T17:18:55.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-06T17:18:55.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-06T18:42:17.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 41,
        "timestamp": "1970-01-06T18:42:17.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-06T20:05:38.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-06T20:05:38.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-06T21:28:59.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 51,
        "timestamp": "1970-01-06T21:28:59.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-06T22:52:20.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-06T22:52:20.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 29,
        "timestamp": "1970-01-07T00:15:42.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-07T00:15:42.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-07T01:39:03.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 51,
        "timestamp": "1970-01-07T01:39:03.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-07T03:02:24.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-07T03:02:24.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 29,
        "timestamp": "1970-01-07T04:25:45.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 36,
        "timestamp": "1970-01-07T04:25:45.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-07T05:49:07.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 59,
        "timestamp": "1970-01-07T05:49:07.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-07T07:12:28.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-07T07:12:28.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-07T08:35:49.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-07T08:35:49.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-07T09:59:10.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 54,
        "timestamp": "1970-01-07T09:59:10.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-07T11:22:32.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-07T11:22:32.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-07T12:45:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-07T12:45:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-07T14:09:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 58,
        "timestamp": "1970-01-07T14:09:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-07T15:32:35.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 34,
        "timestamp": "1970-01-07T15:32:35.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 28,
        "timestamp": "1970-01-07T16:55:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 44,
        "timestamp": "1970-01-07T16:55:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-07T18:19:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 50,
        "timestamp": "1970-01-07T18:19:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 22,
        "timestamp": "1970-01-07T19:42:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 57,
        "timestamp": "1970-01-07T19:42:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 30,
        "timestamp": "1970-01-07T21:06:00.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 50,
        "timestamp": "1970-01-07T21:06:00.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-07T22:29:22.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-07T22:29:22.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-07T23:52:43.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 57,
        "timestamp": "1970-01-07T23:52:43.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-08T01:16:04.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 46,
        "timestamp": "1970-01-08T01:16:04.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-08T02:39:25.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 40,
        "timestamp": "1970-01-08T02:39:25.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-08T04:02:47.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 46,
        "timestamp": "1970-01-08T04:02:47.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-08T05:26:08.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 38,
        "timestamp": "1970-01-08T05:26:08.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-08T06:49:29.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-08T06:49:29.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-08T08:12:50.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 47,
        "timestamp": "1970-01-08T08:12:50.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-08T09:36:12.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 55,
        "timestamp": "1970-01-08T09:36:12.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 29,
        "timestamp": "1970-01-08T10:59:33.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-08T10:59:33.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-08T12:22:54.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 49,
        "timestamp": "1970-01-08T12:22:54.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-08T13:46:15.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 59,
        "timestamp": "1970-01-08T13:46:15.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-08T15:09:37.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 30,
        "timestamp": "1970-01-08T15:09:37.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-08T16:32:58.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 49,
        "timestamp": "1970-01-08T16:32:58.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-08T17:56:19.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 47,
        "timestamp": "1970-01-08T17:56:19.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 30,
        "timestamp": "1970-01-08T19:19:40.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-08T19:19:40.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-08T20:43:02.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-08T20:43:02.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-08T22:06:23.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 40,
        "timestamp": "1970-01-08T22:06:23.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-08T23:29:44.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 44,
        "timestamp": "1970-01-08T23:29:44.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 30,
        "timestamp": "1970-01-09T00:53:05.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 36,
        "timestamp": "1970-01-09T00:53:05.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-09T02:16:27.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-09T02:16:27.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 30,
        "timestamp": "1970-01-09T03:39:48.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-09T03:39:48.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-09T05:03:09.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 55,
        "timestamp": "1970-01-09T05:03:09.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 28,
        "timestamp": "1970-01-09T06:26:30.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-09T06:26:30.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-09T07:49:52.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 30,
        "timestamp": "1970-01-09T07:49:52.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-09T09:13:13.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 43,
        "timestamp": "1970-01-09T09:13:13.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-09T10:36:34.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 48,
        "timestamp": "1970-01-09T10:36:34.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-09T11:59:55.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 59,
        "timestamp": "1970-01-09T11:59:55.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 29,
        "timestamp": "1970-01-09T13:23:17.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 38,
        "timestamp": "1970-01-09T13:23:17.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 29,
        "timestamp": "1970-01-09T14:46:38.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 39,
        "timestamp": "1970-01-09T14:46:38.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 28,
        "timestamp": "1970-01-09T16:09:59.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 57,
        "timestamp": "1970-01-09T16:09:59.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-09T17:33:20.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-09T17:33:20.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 28,
        "timestamp": "1970-01-09T18:56:42.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 34,
        "timestamp": "1970-01-09T18:56:42.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-09T20:20:03.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 44,
        "timestamp": "1970-01-09T20:20:03.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-09T21:43:24.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 45,
        "timestamp": "1970-01-09T21:43:24.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 28,
        "timestamp": "1970-01-09T23:06:45.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 48,
        "timestamp": "1970-01-09T23:06:45.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-10T00:30:07.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-10T00:30:07.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-10T01:53:28.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 55,
        "timestamp": "1970-01-10T01:53:28.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-10T03:16:49.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 30,
        "timestamp": "1970-01-10T03:16:49.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-10T04:40:10.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-10T04:40:10.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-10T06:03:32.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 45,
        "timestamp": "1970-01-10T06:03:32.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 30,
        "timestamp": "1970-01-10T07:26:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 39,
        "timestamp": "1970-01-10T07:26:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 29,
        "timestamp": "1970-01-10T08:50:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 45,
        "timestamp": "1970-01-10T08:50:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-10T10:13:35.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 37,
        "timestamp": "1970-01-10T10:13:35.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-10T11:36:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 40,
        "timestamp": "1970-01-10T11:36:57.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-10T13:00:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 59,
        "timestamp": "1970-01-10T13:00:18.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-10T14:23:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 39,
        "timestamp": "1970-01-10T14:23:39.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-10T15:47:00.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 38,
        "timestamp": "1970-01-10T15:47:00.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 25,
        "timestamp": "1970-01-10T17:10:22.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 47,
        "timestamp": "1970-01-10T17:10:22.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-10T18:33:43.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 50,
        "timestamp": "1970-01-10T18:33:43.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-10T19:57:04.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 52,
        "timestamp": "1970-01-10T19:57:04.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-10T21:20:25.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-10T21:20:25.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-10T22:43:47.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-10T22:43:47.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-11T00:07:08.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 56,
        "timestamp": "1970-01-11T00:07:08.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-11T01:30:29.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 44,
        "timestamp": "1970-01-11T01:30:29.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-11T02:53:50.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 48,
        "timestamp": "1970-01-11T02:53:50.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-11T04:17:12.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 54,
        "timestamp": "1970-01-11T04:17:12.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-11T05:40:33.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-11T05:40:33.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-11T07:03:54.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 53,
        "timestamp": "1970-01-11T07:03:54.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-11T08:27:15.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 40,
        "timestamp": "1970-01-11T08:27:15.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-11T09:50:37.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 49,
        "timestamp": "1970-01-11T09:50:37.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 32,
        "timestamp": "1970-01-11T11:13:58.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 49,
        "timestamp": "1970-01-11T11:13:58.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-11T12:37:20.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 58,
        "timestamp": "1970-01-11T12:37:20.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 30,
        "timestamp": "1970-01-11T14:00:41.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 37,
        "timestamp": "1970-01-11T14:00:41.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-11T15:24:03.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 47,
        "timestamp": "1970-01-11T15:24:03.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 21,
        "timestamp": "1970-01-11T16:47:24.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-11T16:47:24.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 23,
        "timestamp": "1970-01-11T18:10:45.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-11T18:10:45.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-11T19:34:06.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-11T19:34:06.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-11T20:57:28.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-11T20:57:28.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 26,
        "timestamp": "1970-01-11T22:20:49.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 35,
        "timestamp": "1970-01-11T22:20:49.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-11T23:44:10.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 42,
        "timestamp": "1970-01-11T23:44:10.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 20,
        "timestamp": "1970-01-12T01:07:31.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 40,
        "timestamp": "1970-01-12T01:07:31.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-12T02:30:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 30,
        "timestamp": "1970-01-12T02:30:53.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 27,
        "timestamp": "1970-01-12T03:54:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 41,
        "timestamp": "1970-01-12T03:54:14.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 24,
        "timestamp": "1970-01-12T05:17:35.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 1,
        "value": 40,
        "timestamp": "1970-01-12T05:17:35.000Z"
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "value": 22,
        "timestamp": "1970-01-12T06:40:56.000Z"
    }
],
    skipDuplicates: true
  });

  await prisma.thresholds.createMany({
    data: [
    {
        "sensor_id": 1,
        "type_id": 1,
        "min_value": 18,
        "max_value": 26
    },
    {
        "sensor_id": 1,
        "type_id": 2,
        "min_value": 30,
        "max_value": 60
    },
    {
        "sensor_id": 2,
        "type_id": 3,
        "min_value": 0,
        "max_value": 10000
    },
    {
        "sensor_id": 3,
        "type_id": 4,
        "min_value": 0,
        "max_value": 10
    },
    {
        "sensor_id": 4,
        "type_id": 5,
        "min_value": 0,
        "max_value": 250
    },
    {
        "sensor_id": 5,
        "type_id": 6,
        "min_value": 0,
        "max_value": 1200
    }
],
    skipDuplicates: true
  });

  await prisma.sensor_supported_types.createMany({
    data: [
    {
        "sensor_id": 1,
        "type_id": 1
    },
    {
        "sensor_id": 1,
        "type_id": 2
    },
    {
        "sensor_id": 2,
        "type_id": 3
    },
    {
        "sensor_id": 3,
        "type_id": 4
    },
    {
        "sensor_id": 4,
        "type_id": 5
    },
    {
        "sensor_id": 5,
        "type_id": 6
    }
],
    skipDuplicates: true
  });

  console.log("Base de datos reinicializada con éxito");
}

main().catch(console.error).finally(() => prisma.$disconnect());