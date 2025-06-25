const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.companies.createMany({
    data: [
      {
        name: "EcuadorTech S.A.",
        address: "Av. Amazonas 1345, Quito",
      },
      {
        name: "Andes Soluciones",
        address: "Calle Chile y Aguirre, Guayaquil",
      },
      {
        name: "Control Climático Loja",
        address: "Av. Universitaria y Av. Manuel Agustín Aguirre, Loja",
      },
      {
        name: "Innovaciones Tungurahua",
        address: "Av. Cevallos y Montalvo, Ambato",
      },
      {
        name: "ClimaSmart S.A.",
        address: "Av. Remigio Crespo y Cornelio Merchán, Cuenca",
      },
      {
        name: "SensorData Ecuador",
        address: "Av. 6 de Diciembre y Naciones Unidas, Quito",
      },
      {
        name: "ElectroCloud Systems",
        address: "Malecón Simón Bolívar y 9 de Octubre, Guayaquil",
      },
      {
        name: "Carchi Electrónica",
        address: "Av. Bolívar y Av. Carchi, Tulcán",
      },
      {
        name: "IoT Solutions Riobamba",
        address: "Av. Daniel León Borja y Av. de los Shyris, Riobamba",
      },
      {
        name: "Ambiente Inteligente",
        address: "Av. 10 de Agosto y Av. El Inca, Quito",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.projects.createMany({
    data: [
      {
        name: "proyecto test",
        description: "dev data",
        company_id: 1,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.nodes.createMany({
    data: [
      {
        name: "node1",
        location: "loc node1",
        project_id: null,
        status: "ACTIVE",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.sensor_reading_types.createMany({
    data: [
      {
        name: "humidity",
        unit: "%",
        description: "Humedad relativa del aire",
      },
      {
        name: "temperature",
        unit: "C°",
        description:
          "Temperatura ambiente medida por el sensor, expresada en grados Celsius (°C).",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.user_roles.createMany({
    data: [
      {
        name: "admin",
        description: null,
      },
      {
        name: "user",
        description: null,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.users.createMany({
    data: [
      {
        name: "admin-dev",
        email: "admin@email.com",
        password:
          "$2y$10$K3Pfj0CiBqukj0qtIsQLA./2SZLG5Z94cg9pNhuUTvXcPXa0m/uM6",
        user_role_id: 1,
        company_id: null,
      },
      {
        name: "user-dev",
        email: "user@email.com",
        password:
          "$2y$10$ya31jyNfYQnDSu1qUVII.exGNT05GBf773lXrwk7JCLVYvfw9zStq",
        user_role_id: 2,
        company_id: 1,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.sensors.createMany({
    data: [
      {
        name: "ESP32-DHT11-SIMULADO",
        node_id: 1,
        status: "ACTIVE",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.sensor_readings.createMany({
    data: [
      {
        sensor_id: 1,
        type_id: 1,
        value: 33,
        timestamp: "1970-01-01T01:18:57.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 49,
        timestamp: "1970-01-01T01:18:57.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 20,
        timestamp: "1970-01-01T02:42:18.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 51,
        timestamp: "1970-01-01T02:42:18.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 33,
        timestamp: "1970-01-01T04:05:39.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 43,
        timestamp: "1970-01-01T04:05:39.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 31,
        timestamp: "1970-01-01T05:29:01.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 33,
        timestamp: "1970-01-01T05:29:01.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 27,
        timestamp: "1970-01-01T06:52:22.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 39,
        timestamp: "1970-01-01T06:52:22.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 23,
        timestamp: "1970-01-01T08:15:43.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 44,
        timestamp: "1970-01-01T08:15:43.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 25,
        timestamp: "1970-01-01T09:39:04.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 58,
        timestamp: "1970-01-01T09:39:04.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 26,
        timestamp: "1970-01-01T11:02:26.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 44,
        timestamp: "1970-01-01T11:02:26.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 21,
        timestamp: "1970-01-01T12:25:47.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 36,
        timestamp: "1970-01-01T12:25:47.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 20,
        timestamp: "1970-01-01T13:49:08.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 37,
        timestamp: "1970-01-01T13:49:08.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 26,
        timestamp: "1970-01-01T15:12:29.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 46,
        timestamp: "1970-01-01T15:12:29.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 24,
        timestamp: "1970-01-01T16:35:51.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 34,
        timestamp: "1970-01-01T16:35:51.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 33,
        timestamp: "1970-01-01T17:59:12.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 56,
        timestamp: "1970-01-01T17:59:12.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 21,
        timestamp: "1970-01-01T19:22:33.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 56,
        timestamp: "1970-01-01T19:22:33.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 21,
        timestamp: "1970-01-01T20:45:54.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 46,
        timestamp: "1970-01-01T20:45:54.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 31,
        timestamp: "1970-01-01T22:09:16.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 45,
        timestamp: "1970-01-01T22:09:16.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 25,
        timestamp: "1970-01-01T23:32:37.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 41,
        timestamp: "1970-01-01T23:32:37.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 24,
        timestamp: "1970-01-02T00:55:58.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 38,
        timestamp: "1970-01-02T00:55:58.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 34,
        timestamp: "1970-01-02T02:19:19.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 35,
        timestamp: "1970-01-02T02:19:19.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 21,
        timestamp: "1970-01-02T03:42:41.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 47,
        timestamp: "1970-01-02T03:42:41.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 22,
        timestamp: "1970-01-02T05:06:02.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 47,
        timestamp: "1970-01-02T05:06:02.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 20,
        timestamp: "1970-01-02T06:29:23.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 51,
        timestamp: "1970-01-02T06:29:23.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 20,
        timestamp: "1970-01-02T07:52:44.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 30,
        timestamp: "1970-01-02T07:52:44.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 28,
        timestamp: "1970-01-02T09:16:06.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 42,
        timestamp: "1970-01-02T09:16:06.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 32,
        timestamp: "1970-01-02T10:39:27.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 49,
        timestamp: "1970-01-02T10:39:27.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 33,
        timestamp: "1970-01-02T12:02:48.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 57,
        timestamp: "1970-01-02T12:02:48.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 24,
        timestamp: "1970-01-02T13:26:09.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 41,
        timestamp: "1970-01-02T13:26:09.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 32,
        timestamp: "1970-01-02T14:49:31.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 55,
        timestamp: "1970-01-02T14:49:31.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 24,
        timestamp: "1970-01-02T16:12:52.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 38,
        timestamp: "1970-01-02T16:12:52.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 20,
        timestamp: "1970-01-02T17:36:13.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 53,
        timestamp: "1970-01-02T17:36:13.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 27,
        timestamp: "1970-01-02T18:59:34.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 38,
        timestamp: "1970-01-02T18:59:34.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 34,
        timestamp: "1970-01-02T20:22:56.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 54,
        timestamp: "1970-01-02T20:22:56.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 21,
        timestamp: "1970-01-02T21:46:17.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 51,
        timestamp: "1970-01-02T21:46:17.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 26,
        timestamp: "1970-01-02T23:09:38.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 46,
        timestamp: "1970-01-02T23:09:38.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 26,
        timestamp: "1970-01-03T00:32:59.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 58,
        timestamp: "1970-01-03T00:32:59.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 27,
        timestamp: "1970-01-03T01:56:21.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 52,
        timestamp: "1970-01-03T01:56:21.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 31,
        timestamp: "1970-01-03T03:19:42.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 50,
        timestamp: "1970-01-03T03:19:42.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 21,
        timestamp: "1970-01-03T04:43:03.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 41,
        timestamp: "1970-01-03T04:43:03.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 25,
        timestamp: "1970-01-03T06:06:24.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 39,
        timestamp: "1970-01-03T06:06:24.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 29,
        timestamp: "1970-01-03T07:29:46.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 42,
        timestamp: "1970-01-03T07:29:46.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 27,
        timestamp: "1970-01-03T08:53:07.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 44,
        timestamp: "1970-01-03T08:53:07.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 32,
        timestamp: "1970-01-03T10:16:28.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 41,
        timestamp: "1970-01-03T10:16:28.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 27,
        timestamp: "1970-01-03T11:39:49.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 42,
        timestamp: "1970-01-03T11:39:49.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 34,
        timestamp: "1970-01-03T13:03:11.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 34,
        timestamp: "1970-01-03T13:03:11.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 32,
        timestamp: "1970-01-03T14:26:32.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 39,
        timestamp: "1970-01-03T14:26:32.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 32,
        timestamp: "1970-01-03T15:49:53.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 59,
        timestamp: "1970-01-03T15:49:53.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 21,
        timestamp: "1970-01-03T17:13:14.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 57,
        timestamp: "1970-01-03T17:13:14.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 33,
        timestamp: "1970-01-03T18:36:36.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 42,
        timestamp: "1970-01-03T18:36:36.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 32,
        timestamp: "1970-01-03T19:59:57.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 31,
        timestamp: "1970-01-03T19:59:57.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 25,
        timestamp: "1970-01-03T21:23:18.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 50,
        timestamp: "1970-01-03T21:23:18.000Z",
      },
      {
        sensor_id: 1,
        type_id: 1,
        value: 33,
        timestamp: "1970-01-03T22:46:39.000Z",
      },
      {
        sensor_id: 1,
        type_id: 2,
        value: 35,
        timestamp: "1970-01-03T22:46:39.000Z",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.thresholds.createMany({
    data: [
      {
        sensor_id: 1,
        type_id: 1,
        min_value: 18,
        max_value: 26,
      },
      {
        sensor_id: 1,
        type_id: 2,
        min_value: 30,
        max_value: 60,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Base de datos reinicializada con éxito");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
