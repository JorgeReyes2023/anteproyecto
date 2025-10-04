const prisma = require("../prisma");

class ThresholdModel {
  static async createThreshold(thresholdData) {
    return prisma.umbrales.create({
      data: thresholdData,
    });
  }

  static async getThresholdById(id) {
    return prisma.umbrales.findUnique({
      where: { um_id: id },
    });
  }

  static async getAllThresholds() {
    return prisma.umbrales.findMany();
  }

  static async updateThreshold(id, thresholdData) {
    return prisma.umbrales.update({
      where: { um_id: id },
      data: thresholdData,
    });
  }

  static async deleteThreshold(id) {
    return prisma.umbrales.delete({
      where: { um_id: id },
    });
  }
}
module.exports = { ThresholdModel };
