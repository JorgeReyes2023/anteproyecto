const prisma = require("../prisma");

class SensorSupportedTypeModel {
  static async createSensorSupportedType(sensorSupportedTypeData) {
    return prisma.tipos_sensor_soportados.create({
      data: sensorSupportedTypeData,
    });
  }

  static async getAllSensorSupportedTypes() {
    return prisma.tipos_sensor_soportados.findMany();
  }

  static async getSensorSupportedTypeBySensorId(sensorId) {
    return prisma.tipos_sensor_soportados.findMany({
      where: { tss_sensor_id: sensorId },
      include: {
        tipo: true,
      },
    });
  }

  static async updateSensorSupportedType(id, sensorSupportedTypeData) {
    return prisma.tipos_sensor_soportados.update({
      where: { tss_sensor_id_tss_tipo_id: id },
      data: sensorSupportedTypeData,
    });
  }

  static async deleteSensorSupportedType(id) {
    return prisma.tipos_sensor_soportados.delete({
      where: { tss_sensor_id_tss_tipo_id: id },
    });
  }
}
module.exports = { SensorSupportedTypeModel };
