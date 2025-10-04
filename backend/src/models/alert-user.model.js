const prisma = require("../prisma");

class AlertUserModel {
  static async getAlertUserById(id) {
    return prisma.alertas_usuarios.findUnique({
      where: { au_id: id },
    });
  }

  static async getAllAlertUsers() {
    return prisma.alertas_usuarios.findMany({
      orderBy: { au_creado_en: "desc" },
    });
  }

  static async markAlertAsRead(read, id, userId) {
    return prisma.alertas_usuarios.update({
      where: { au_alerta_id_au_usuario_id: { au_alerta_id: id, au_usuario_id: userId } },
      data: { au_leido: read },
    });
  }

  static async markAllAlertsAsRead(userId) {
    return prisma.alertas_usuarios.updateMany({
      where: { au_leido: false, au_usuario_id: userId },
      data: { au_leido: true },
    });
  }
}

module.exports = { AlertUserModel };
