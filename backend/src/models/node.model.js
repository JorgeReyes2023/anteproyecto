const prisma = require('../prisma');

const NodeModel = {
  async createNode(name, type, projectId) {
    return prisma.nodes.create({
      data: {
        name: name,
        type: type,
        project: {
          connect: { id: projectId }
        }
      }
    });
  },

  async getNodeById(id) {
    return prisma.nodes.findUnique({
      where: { id: id },
    });
  },

  async updateNode(id, name, type) {
    return prisma.nodes.update({
      where: { id: id },
      data: { name: name, type: type },
    });
  },

  async deleteNode(id) {
    return prisma.nodes.delete({
      where: { id: id },
    });
  },

  async getAllNodes() {
    return prisma.nodes.findMany();
  }
};
module.exports = NodeModel;
