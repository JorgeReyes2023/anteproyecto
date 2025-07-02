const prisma = require("../prisma");

class SensorTypeModel {
  static async createSensorType(sensorTypeData) {
    return prisma.sensor_reading_types.create({
      data: sensorTypeData,
    });
  }

  static async getAllSensorTypes() {
    return prisma.sensor_reading_types.findMany();
  }

  static async updateSensorType(id, sensorTypeData) {
    return prisma.sensor_reading_types.update({
      where: { id: id },
      data: sensorTypeData,
    });
  }

  static async deleteSensorType(id) {
    return prisma.sensor_reading_types.delete({
      where: { id: id },
    });
  }
}
module.exports = { SensorTypeModel };
