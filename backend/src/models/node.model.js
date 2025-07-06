const { Status } = require("@prisma/client");
const prisma = require("../prisma");

const NodeModel = {
  async createNode(name, location, status, projectId) {
    return prisma.nodes.create({
      data: {
        name: name,
        location: location,
        status: status,
        project_id: projectId,
      },
      include: {
        projects: true, // Include the project relation if needed
        sensors: true, // Include the sensors relation if needed
      },
    });
  },

  async getNodeById(id) {
    return prisma.nodes.findUnique({
      where: { id: id },
    });
  },

  async updateNode(id, name, location, status, projectId) {
    return prisma.nodes.update({
      where: { id: id },
      data: {
        name: name,
        location: location,
        status: status,
        project_id: projectId,
      },
      include: {
        projects: true, // Include the project relation if needed
        sensors: true, // Include the sensors relation if needed
      },
    });
  },

  async deleteNode(id) {
    return prisma.nodes.delete({
      where: { id: id },
    });
  },

  async getAllNodes() {
    return prisma.nodes.findMany({
      include: {
        projects: true, // Include the project relation if needed
        sensors: true, // Include the sensors relation if needed
      },
    });
  },
};
module.exports = { NodeModel };
