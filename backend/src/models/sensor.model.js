const prisma = require("../prisma"); //Se importa el cliente Prisma para interactuar con la base de datos

class SensorModel {
  static async createSensor(name, nodeId = null, status = "INACTIVE") {
    // Método para crear un nuevo sensor
    return prisma.sensors.create({
      data: {
        name: name,
        node_id: nodeId,
        status: status,
      },
    });
  }

  static async getSensorByName(name) {
    // Método para obtener un sensor por su nombre
    return prisma.sensors.findFirst({
      where: { name: name },
    });
  }

  // Método para obtener un sensor por su ID
  static async getSensorById(id) {
    return prisma.sensors.findUnique({
      where: { id: id },
    });
  }
  // Método para obtener todos los sensores
  static async getAllSensors() {
    return prisma.sensors.findMany();
  }

  static async updateSensor(id, sensorData) {
    return prisma.sensors.update({
      where: { id: id },
      data: sensorData,
    });
  }

  static async attachSensorsToNode(nodeId, sensorIds) {
    // Método para asociar sensores a un nodo
    return prisma.sensors.updateMany({
      where: { id: { in: sensorIds } },
      data: { node_id: nodeId },
    });
  }

  static async deleteSensor(id) {
    return prisma.sensors.delete({
      where: { id: id },
    });
  }
}

module.exports = { SensorModel };
