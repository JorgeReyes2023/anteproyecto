const prisma = require("../prisma");

class SensorReadingTypeModel {
  static async createSensorReadingType(name, unit, description) {
    return prisma.tipos_lectura_sensor.create({
      data: {
        tls_nombre: name,
        tls_unidad: unit,
        tls_descripcion: description,
      },
    });
  }

  static async getAllSensorReadingTypes() {
    return prisma.tipos_lectura_sensor.findMany();
  }

  static async updateSensorReadingType(id, sensorReadingTypeData) {
    return prisma.tipos_lectura_sensor.update({
      where: { tls_id: id },
      data: sensorReadingTypeData,
    });
  }

  static async deleteSensorReadingType(id) {
    return prisma.tipos_lectura_sensor.delete({
      where: { tls_id: id },
    });
  }
}

module.exports = { SensorReadingTypeModel };
