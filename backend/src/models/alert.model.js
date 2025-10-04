const prisma = require("../prisma");

class AlertModel {
  static async createAlert(alertData) {
    return prisma.alertas.create({
      data: alertData,
    });
  }

  static async getAlertById(id) {
    return prisma.alertas.findUnique({
      where: { a_id: id },
    });
  }

  static async getAllAlerts() {
    return prisma.alertas.findMany({
      include: {
        alertas_usuarios: true,
      },
      orderBy: { a_creado_en: "desc" },
    });
  }

  static async updateAlert(id, alertData) {
    return prisma.alertas.update({
      where: { a_id: id },
      data: alertData,
    });
  }

  static async deleteAlert(id) {
    return prisma.alertas.delete({
      where: { a_id: id },
    });
  }

  static async getAlertsByCompanyId(companyId) {
    return prisma.alertas.findMany({
      where: {
        sensores: {
          nodos: {
            proyectos: {
              p_empresa_id: companyId,
            },
          },
        },
      },
      include: {
        alertas_usuarios: true,
      },
      orderBy: { a_creado_en: "desc" },
    });
  }
}

module.exports = { AlertModel };
