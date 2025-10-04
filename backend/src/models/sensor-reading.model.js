const prisma = require("../prisma");

class SensorReadingModel {
  static async getAllSensorReadings() {
    return prisma.lecturas_sensores.findMany();
  }

  static async getReadingsBySensorTypeId(sensorTypeId) {
    return prisma.lecturas_sensores.findMany({
      where: {
        ls_tipo_id: sensorTypeId,
      },
      orderBy: {
        ls_fecha: "desc",
      },
      take: 100,
    });
  }

  static async getReadingsBySensorIdAndType(sensorId, typeId) {
    return prisma.lecturas_sensores.findMany({
      where: {
        ls_sensor_id: sensorId,
        ls_tipo_id: typeId,
      },
      orderBy: {
        ls_fecha: "desc",
      },
      take: 100,
    });
  }
}

module.exports = { SensorReadingModel };
