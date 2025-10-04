const prisma = require("../prisma");

const NodeModel = {
  async createNode(name, location, status, projectId) {
    return prisma.nodos.create({
      data: {
        n_nombre: name,
        n_ubicacion: location,
        n_estado: status,
        n_proyecto_id: projectId,
      },
      include: {
        proyectos: true,
        sensores: true,
      },
    });
  },

  async getNodeById(id) {
    return prisma.nodos.findUnique({
      where: { n_id: id },
    });
  },

  async updateNode(id, name, location, status, projectId) {
    return prisma.nodos.update({
      where: { n_id: id },
      data: {
        n_nombre: name,
        n_ubicacion: location,
        n_estado: status,
        n_proyecto_id: projectId,
      },
      include: {
        proyectos: true,
        sensores: true,
      },
    });
  },

  async deleteNode(id) {
    return prisma.nodos.delete({
      where: { n_id: id },
    });
  },

  async getAllNodes() {
    return prisma.nodos.findMany({
      include: {
        proyectos: true,
        sensores: true,
      },
    });
  },

  async getNodesByProjectId(projectId) {
    return prisma.nodos.findMany({
      where: { n_proyecto_id: projectId },
      include: {
        proyectos: true,
        sensores: true,
      },
    });
  },
};
module.exports = { NodeModel };
