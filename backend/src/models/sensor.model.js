const prisma = require("../prisma");

class SensorModel {
  static async createSensor(sensorData) {
    return prisma.sensors.create({
      data: sensorData,
    });
  }

  static async getSensorById(id) {
    return prisma.sensors.findUnique({
      where: { id: id },
    });
  }

  static async getAllSensors() {
    return prisma.sensors.findMany();
  }

  static async updateSensor(id, sensorData) {
    return prisma.sensors.update({
      where: { id: id },
      data: sensorData,
    });
  }

  static async deleteSensor(id) {
    return prisma.sensors.delete({
      where: { id: id },
    });
  }
}

module.exports = { SensorModel };
