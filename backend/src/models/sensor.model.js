const prisma = require("../prisma");

class SensorModel {
  static async createSensor(name, nodeId = null, status = "INACTIVO") {
    return prisma.sensores.create({
      data: {
        s_nombre: name,
        s_nodo_id: nodeId,
        s_estado: status,
      },
    });
  }

  static async getSensorByName(name) {
    return prisma.sensores.findUnique({
      where: { s_nombre: name },
    });
  }

  static async getSensorById(id) {
    return prisma.sensores.findUnique({
      where: { s_id: id },
      include: {
        tipos_soportados: {
          include: {
            tipo: true,
          },
        },
        nodos: true,
      },
    });
  }

  static async getAllSensors() {
    return prisma.sensores.findMany();
  }

  static async getSensorsByNodeId(nodeId) {
    return prisma.sensores.findMany({
      where: { s_nodo_id: nodeId },
      include: {
        nodos: true,
      },
    });
  }

  static async updateSensor(id, sensorData) {
    return prisma.sensores.update({
      where: { s_id: id },
      data: sensorData,
    });
  }

  static async unsetSensorsFromNode(nodeId, sensorIds) {
    return prisma.sensores.updateMany({
      where: {
        s_nodo_id: nodeId,
        NOT: {
          s_id: { in: sensorIds },
        },
      },
      data: { s_nodo_id: null },
    });
  }

  static async setSensorsToNode(nodeId, sensorIds) {
    return prisma.sensores.updateMany({
      where: { s_id: { in: sensorIds } },
      data: { s_nodo_id: nodeId },
    });
  }

  static async getSensorsByIds(sensorIds) {
    return prisma.sensores.findMany({
      where: { s_id: { in: sensorIds } },
    });
  }
  static async updateSensorsForNode(nodeId, sensorIds) {
    return await prisma.$transaction(async () => {
      await this.unsetSensorsFromNode(nodeId, sensorIds);
      await this.setSensorsToNode(nodeId, sensorIds);
      return this.getSensorsByIds(sensorIds);
    });
  }

  static async deleteSensor(id) {
    return prisma.sensores.delete({
      where: { s_id: id },
    });
  }
}

module.exports = { SensorModel };
