const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.sensor_reading_types.createMany({
    data: [
    {
        "id": 1,
        "name": "temperature",
        "unit": "",
        "description": ""
    },
    {
        "id": 2,
        "name": "humidity",
        "unit": "",
        "description": ""
    }
],
    skipDuplicates: true
  });

  await prisma.companies.createMany({
    data: [
    {
        "id": 1,
        "name": "EcuadorTech S.A.",
        "address": "Av. Amazonas 1345, Quito",
        "created_at": "2025-06-23T22:57:50.309Z"
    },
    {
        "id": 2,
        "name": "Andes Soluciones",
        "address": "Calle Chile y Aguirre, Guayaquil",
        "created_at": "2025-06-23T22:57:50.309Z"
    },
    {
        "id": 3,
        "name": "Control Climático Loja",
        "address": "Av. Universitaria y Av. Manuel Agustín Aguirre, Loja",
        "created_at": "2025-06-23T22:57:50.309Z"
    },
    {
        "id": 4,
        "name": "Innovaciones Tungurahua",
        "address": "Av. Cevallos y Montalvo, Ambato",
        "created_at": "2025-06-23T22:57:50.309Z"
    },
    {
        "id": 5,
        "name": "ClimaSmart S.A.",
        "address": "Av. Remigio Crespo y Cornelio Merchán, Cuenca",
        "created_at": "2025-06-23T22:57:50.309Z"
    },
    {
        "id": 6,
        "name": "SensorData Ecuador",
        "address": "Av. 6 de Diciembre y Naciones Unidas, Quito",
        "created_at": "2025-06-23T22:57:50.309Z"
    },
    {
        "id": 7,
        "name": "ElectroCloud Systems",
        "address": "Malecón Simón Bolívar y 9 de Octubre, Guayaquil",
        "created_at": "2025-06-23T22:57:50.309Z"
    },
    {
        "id": 8,
        "name": "Carchi Electrónica",
        "address": "Av. Bolívar y Av. Carchi, Tulcán",
        "created_at": "2025-06-23T22:57:50.309Z"
    },
    {
        "id": 9,
        "name": "IoT Solutions Riobamba",
        "address": "Av. Daniel León Borja y Av. de los Shyris, Riobamba",
        "created_at": "2025-06-23T22:57:50.309Z"
    },
    {
        "id": 10,
        "name": "Ambiente Inteligente",
        "address": "Av. 10 de Agosto y Av. El Inca, Quito",
        "created_at": "2025-06-23T22:57:50.309Z"
    }
],
    skipDuplicates: true
  });

  await prisma.users.createMany({
    data: [
    {
        "id": 1,
        "name": "admin-dev",
        "email": "admin@email.com",
        "password": "$2y$10$K3Pfj0CiBqukj0qtIsQLA./2SZLG5Z94cg9pNhuUTvXcPXa0m/uM6",
        "user_role_id": 1,
        "company_id": null,
        "created_at": "2025-06-23T22:57:50.313Z"
    },
    {
        "id": 2,
        "name": "user-dev",
        "email": "user@email.com",
        "password": "$2y$10$ya31jyNfYQnDSu1qUVII.exGNT05GBf773lXrwk7JCLVYvfw9zStq",
        "user_role_id": 2,
        "company_id": 1,
        "created_at": "2025-06-23T22:57:50.313Z"
    }
],
    skipDuplicates: true
  });

  await prisma.user_roles.createMany({
    data: [
    {
        "id": 1,
        "name": "admin",
        "description": null
    },
    {
        "id": 2,
        "name": "user",
        "description": null
    }
],
    skipDuplicates: true
  });

  await prisma.nodes.createMany({
    data: [
    {
        "id": 1,
        "name": "node1",
        "location": "loc node1",
        "project_id": null,
        "status": "ACTIVE",
        "created_at": "2025-06-23T23:05:26.994Z"
    }
],
    skipDuplicates: true
  });

  await prisma.sensors.createMany({
    data: [
    {
        "id": 1,
        "name": "ESP32-DHT11-SIMULADO",
        "node_id": null,
        "status": "ACTIVE",
        "created_at": "2025-06-23T23:57:01.999Z"
    }
],
    skipDuplicates: true
  });

  await prisma.sensor_readings.createMany({
    data: [
    {
        "id": 1,
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-01T01:18:57.000Z"
    },
    {
        "id": 2,
        "sensor_id": 1,
        "type_id": 2,
        "value": 49,
        "timestamp": "1970-01-01T01:18:57.000Z"
    },
    {
        "id": 3,
        "sensor_id": 1,
        "type_id": 1,
        "value": 20,
        "timestamp": "1970-01-01T02:42:18.000Z"
    },
    {
        "id": 4,
        "sensor_id": 1,
        "type_id": 2,
        "value": 51,
        "timestamp": "1970-01-01T02:42:18.000Z"
    },
    {
        "id": 5,
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-01T04:05:39.000Z"
    },
    {
        "id": 6,
        "sensor_id": 1,
        "type_id": 2,
        "value": 43,
        "timestamp": "1970-01-01T04:05:39.000Z"
    },
    {
        "id": 7,
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-01T05:29:01.000Z"
    },
    {
        "id": 8,
        "sensor_id": 1,
        "type_id": 2,
        "value": 33,
        "timestamp": "1970-01-01T05:29:01.000Z"
    },
    {
        "id": 9,
        "sensor_id": 1,
        "type_id": 1,
        "value": 27,
        "timestamp": "1970-01-01T06:52:22.000Z"
    },
    {
        "id": 10,
        "sensor_id": 1,
        "type_id": 2,
        "value": 39,
        "timestamp": "1970-01-01T06:52:22.000Z"
    },
    {
        "id": 11,
        "sensor_id": 1,
        "type_id": 1,
        "value": 23,
        "timestamp": "1970-01-01T08:15:43.000Z"
    },
    {
        "id": 12,
        "sensor_id": 1,
        "type_id": 2,
        "value": 44,
        "timestamp": "1970-01-01T08:15:43.000Z"
    },
    {
        "id": 13,
        "sensor_id": 1,
        "type_id": 1,
        "value": 25,
        "timestamp": "1970-01-01T09:39:04.000Z"
    },
    {
        "id": 14,
        "sensor_id": 1,
        "type_id": 2,
        "value": 58,
        "timestamp": "1970-01-01T09:39:04.000Z"
    },
    {
        "id": 15,
        "sensor_id": 1,
        "type_id": 1,
        "value": 26,
        "timestamp": "1970-01-01T11:02:26.000Z"
    },
    {
        "id": 16,
        "sensor_id": 1,
        "type_id": 2,
        "value": 44,
        "timestamp": "1970-01-01T11:02:26.000Z"
    },
    {
        "id": 17,
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-01T12:25:47.000Z"
    },
    {
        "id": 18,
        "sensor_id": 1,
        "type_id": 2,
        "value": 36,
        "timestamp": "1970-01-01T12:25:47.000Z"
    },
    {
        "id": 19,
        "sensor_id": 1,
        "type_id": 1,
        "value": 20,
        "timestamp": "1970-01-01T13:49:08.000Z"
    },
    {
        "id": 20,
        "sensor_id": 1,
        "type_id": 2,
        "value": 37,
        "timestamp": "1970-01-01T13:49:08.000Z"
    },
    {
        "id": 21,
        "sensor_id": 1,
        "type_id": 1,
        "value": 26,
        "timestamp": "1970-01-01T15:12:29.000Z"
    },
    {
        "id": 22,
        "sensor_id": 1,
        "type_id": 2,
        "value": 46,
        "timestamp": "1970-01-01T15:12:29.000Z"
    },
    {
        "id": 23,
        "sensor_id": 1,
        "type_id": 1,
        "value": 24,
        "timestamp": "1970-01-01T16:35:51.000Z"
    },
    {
        "id": 24,
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-01T16:35:51.000Z"
    },
    {
        "id": 25,
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-01T17:59:12.000Z"
    },
    {
        "id": 26,
        "sensor_id": 1,
        "type_id": 2,
        "value": 56,
        "timestamp": "1970-01-01T17:59:12.000Z"
    },
    {
        "id": 27,
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-01T19:22:33.000Z"
    },
    {
        "id": 28,
        "sensor_id": 1,
        "type_id": 2,
        "value": 56,
        "timestamp": "1970-01-01T19:22:33.000Z"
    },
    {
        "id": 29,
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-01T20:45:54.000Z"
    },
    {
        "id": 30,
        "sensor_id": 1,
        "type_id": 2,
        "value": 46,
        "timestamp": "1970-01-01T20:45:54.000Z"
    },
    {
        "id": 31,
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-01T22:09:16.000Z"
    },
    {
        "id": 32,
        "sensor_id": 1,
        "type_id": 2,
        "value": 45,
        "timestamp": "1970-01-01T22:09:16.000Z"
    },
    {
        "id": 33,
        "sensor_id": 1,
        "type_id": 1,
        "value": 25,
        "timestamp": "1970-01-01T23:32:37.000Z"
    },
    {
        "id": 34,
        "sensor_id": 1,
        "type_id": 2,
        "value": 41,
        "timestamp": "1970-01-01T23:32:37.000Z"
    },
    {
        "id": 35,
        "sensor_id": 1,
        "type_id": 1,
        "value": 24,
        "timestamp": "1970-01-02T00:55:58.000Z"
    },
    {
        "id": 36,
        "sensor_id": 1,
        "type_id": 2,
        "value": 38,
        "timestamp": "1970-01-02T00:55:58.000Z"
    },
    {
        "id": 37,
        "sensor_id": 1,
        "type_id": 1,
        "value": 34,
        "timestamp": "1970-01-02T02:19:19.000Z"
    },
    {
        "id": 38,
        "sensor_id": 1,
        "type_id": 2,
        "value": 35,
        "timestamp": "1970-01-02T02:19:19.000Z"
    },
    {
        "id": 39,
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-02T03:42:41.000Z"
    },
    {
        "id": 40,
        "sensor_id": 1,
        "type_id": 2,
        "value": 47,
        "timestamp": "1970-01-02T03:42:41.000Z"
    },
    {
        "id": 41,
        "sensor_id": 1,
        "type_id": 1,
        "value": 22,
        "timestamp": "1970-01-02T05:06:02.000Z"
    },
    {
        "id": 42,
        "sensor_id": 1,
        "type_id": 2,
        "value": 47,
        "timestamp": "1970-01-02T05:06:02.000Z"
    },
    {
        "id": 43,
        "sensor_id": 1,
        "type_id": 1,
        "value": 20,
        "timestamp": "1970-01-02T06:29:23.000Z"
    },
    {
        "id": 44,
        "sensor_id": 1,
        "type_id": 2,
        "value": 51,
        "timestamp": "1970-01-02T06:29:23.000Z"
    },
    {
        "id": 45,
        "sensor_id": 1,
        "type_id": 1,
        "value": 20,
        "timestamp": "1970-01-02T07:52:44.000Z"
    },
    {
        "id": 46,
        "sensor_id": 1,
        "type_id": 2,
        "value": 30,
        "timestamp": "1970-01-02T07:52:44.000Z"
    },
    {
        "id": 47,
        "sensor_id": 1,
        "type_id": 1,
        "value": 28,
        "timestamp": "1970-01-02T09:16:06.000Z"
    },
    {
        "id": 48,
        "sensor_id": 1,
        "type_id": 2,
        "value": 42,
        "timestamp": "1970-01-02T09:16:06.000Z"
    },
    {
        "id": 49,
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-02T10:39:27.000Z"
    },
    {
        "id": 50,
        "sensor_id": 1,
        "type_id": 2,
        "value": 49,
        "timestamp": "1970-01-02T10:39:27.000Z"
    },
    {
        "id": 51,
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-02T12:02:48.000Z"
    },
    {
        "id": 52,
        "sensor_id": 1,
        "type_id": 2,
        "value": 57,
        "timestamp": "1970-01-02T12:02:48.000Z"
    },
    {
        "id": 53,
        "sensor_id": 1,
        "type_id": 1,
        "value": 24,
        "timestamp": "1970-01-02T13:26:09.000Z"
    },
    {
        "id": 54,
        "sensor_id": 1,
        "type_id": 2,
        "value": 41,
        "timestamp": "1970-01-02T13:26:09.000Z"
    },
    {
        "id": 55,
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-02T14:49:31.000Z"
    },
    {
        "id": 56,
        "sensor_id": 1,
        "type_id": 2,
        "value": 55,
        "timestamp": "1970-01-02T14:49:31.000Z"
    },
    {
        "id": 57,
        "sensor_id": 1,
        "type_id": 1,
        "value": 24,
        "timestamp": "1970-01-02T16:12:52.000Z"
    },
    {
        "id": 58,
        "sensor_id": 1,
        "type_id": 2,
        "value": 38,
        "timestamp": "1970-01-02T16:12:52.000Z"
    },
    {
        "id": 59,
        "sensor_id": 1,
        "type_id": 1,
        "value": 20,
        "timestamp": "1970-01-02T17:36:13.000Z"
    },
    {
        "id": 60,
        "sensor_id": 1,
        "type_id": 2,
        "value": 53,
        "timestamp": "1970-01-02T17:36:13.000Z"
    },
    {
        "id": 61,
        "sensor_id": 1,
        "type_id": 1,
        "value": 27,
        "timestamp": "1970-01-02T18:59:34.000Z"
    },
    {
        "id": 62,
        "sensor_id": 1,
        "type_id": 2,
        "value": 38,
        "timestamp": "1970-01-02T18:59:34.000Z"
    },
    {
        "id": 63,
        "sensor_id": 1,
        "type_id": 1,
        "value": 34,
        "timestamp": "1970-01-02T20:22:56.000Z"
    },
    {
        "id": 64,
        "sensor_id": 1,
        "type_id": 2,
        "value": 54,
        "timestamp": "1970-01-02T20:22:56.000Z"
    },
    {
        "id": 65,
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-02T21:46:17.000Z"
    },
    {
        "id": 66,
        "sensor_id": 1,
        "type_id": 2,
        "value": 51,
        "timestamp": "1970-01-02T21:46:17.000Z"
    },
    {
        "id": 67,
        "sensor_id": 1,
        "type_id": 1,
        "value": 26,
        "timestamp": "1970-01-02T23:09:38.000Z"
    },
    {
        "id": 68,
        "sensor_id": 1,
        "type_id": 2,
        "value": 46,
        "timestamp": "1970-01-02T23:09:38.000Z"
    },
    {
        "id": 69,
        "sensor_id": 1,
        "type_id": 1,
        "value": 26,
        "timestamp": "1970-01-03T00:32:59.000Z"
    },
    {
        "id": 70,
        "sensor_id": 1,
        "type_id": 2,
        "value": 58,
        "timestamp": "1970-01-03T00:32:59.000Z"
    },
    {
        "id": 71,
        "sensor_id": 1,
        "type_id": 1,
        "value": 27,
        "timestamp": "1970-01-03T01:56:21.000Z"
    },
    {
        "id": 72,
        "sensor_id": 1,
        "type_id": 2,
        "value": 52,
        "timestamp": "1970-01-03T01:56:21.000Z"
    },
    {
        "id": 73,
        "sensor_id": 1,
        "type_id": 1,
        "value": 31,
        "timestamp": "1970-01-03T03:19:42.000Z"
    },
    {
        "id": 74,
        "sensor_id": 1,
        "type_id": 2,
        "value": 50,
        "timestamp": "1970-01-03T03:19:42.000Z"
    },
    {
        "id": 75,
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-03T04:43:03.000Z"
    },
    {
        "id": 76,
        "sensor_id": 1,
        "type_id": 2,
        "value": 41,
        "timestamp": "1970-01-03T04:43:03.000Z"
    },
    {
        "id": 77,
        "sensor_id": 1,
        "type_id": 1,
        "value": 25,
        "timestamp": "1970-01-03T06:06:24.000Z"
    },
    {
        "id": 78,
        "sensor_id": 1,
        "type_id": 2,
        "value": 39,
        "timestamp": "1970-01-03T06:06:24.000Z"
    },
    {
        "id": 79,
        "sensor_id": 1,
        "type_id": 1,
        "value": 29,
        "timestamp": "1970-01-03T07:29:46.000Z"
    },
    {
        "id": 80,
        "sensor_id": 1,
        "type_id": 2,
        "value": 42,
        "timestamp": "1970-01-03T07:29:46.000Z"
    },
    {
        "id": 81,
        "sensor_id": 1,
        "type_id": 1,
        "value": 27,
        "timestamp": "1970-01-03T08:53:07.000Z"
    },
    {
        "id": 82,
        "sensor_id": 1,
        "type_id": 2,
        "value": 44,
        "timestamp": "1970-01-03T08:53:07.000Z"
    },
    {
        "id": 83,
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-03T10:16:28.000Z"
    },
    {
        "id": 84,
        "sensor_id": 1,
        "type_id": 2,
        "value": 41,
        "timestamp": "1970-01-03T10:16:28.000Z"
    },
    {
        "id": 85,
        "sensor_id": 1,
        "type_id": 1,
        "value": 27,
        "timestamp": "1970-01-03T11:39:49.000Z"
    },
    {
        "id": 86,
        "sensor_id": 1,
        "type_id": 2,
        "value": 42,
        "timestamp": "1970-01-03T11:39:49.000Z"
    },
    {
        "id": 87,
        "sensor_id": 1,
        "type_id": 1,
        "value": 34,
        "timestamp": "1970-01-03T13:03:11.000Z"
    },
    {
        "id": 88,
        "sensor_id": 1,
        "type_id": 2,
        "value": 34,
        "timestamp": "1970-01-03T13:03:11.000Z"
    },
    {
        "id": 89,
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-03T14:26:32.000Z"
    },
    {
        "id": 90,
        "sensor_id": 1,
        "type_id": 2,
        "value": 39,
        "timestamp": "1970-01-03T14:26:32.000Z"
    },
    {
        "id": 91,
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-03T15:49:53.000Z"
    },
    {
        "id": 92,
        "sensor_id": 1,
        "type_id": 2,
        "value": 59,
        "timestamp": "1970-01-03T15:49:53.000Z"
    },
    {
        "id": 93,
        "sensor_id": 1,
        "type_id": 1,
        "value": 21,
        "timestamp": "1970-01-03T17:13:14.000Z"
    },
    {
        "id": 94,
        "sensor_id": 1,
        "type_id": 2,
        "value": 57,
        "timestamp": "1970-01-03T17:13:14.000Z"
    },
    {
        "id": 95,
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-03T18:36:36.000Z"
    },
    {
        "id": 96,
        "sensor_id": 1,
        "type_id": 2,
        "value": 42,
        "timestamp": "1970-01-03T18:36:36.000Z"
    },
    {
        "id": 97,
        "sensor_id": 1,
        "type_id": 1,
        "value": 32,
        "timestamp": "1970-01-03T19:59:57.000Z"
    },
    {
        "id": 98,
        "sensor_id": 1,
        "type_id": 2,
        "value": 31,
        "timestamp": "1970-01-03T19:59:57.000Z"
    },
    {
        "id": 99,
        "sensor_id": 1,
        "type_id": 1,
        "value": 25,
        "timestamp": "1970-01-03T21:23:18.000Z"
    },
    {
        "id": 100,
        "sensor_id": 1,
        "type_id": 2,
        "value": 50,
        "timestamp": "1970-01-03T21:23:18.000Z"
    },
    {
        "id": 101,
        "sensor_id": 1,
        "type_id": 1,
        "value": 33,
        "timestamp": "1970-01-03T22:46:39.000Z"
    },
    {
        "id": 102,
        "sensor_id": 1,
        "type_id": 2,
        "value": 35,
        "timestamp": "1970-01-03T22:46:39.000Z"
    }
],
    skipDuplicates: true
  });

  console.log("✅");
}

main().catch(console.error).finally(() => prisma.$disconnect());