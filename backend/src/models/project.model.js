const prisma = require('../prisma');

class ProjectModel {
  static async createProject(name, description, companyId, nodes = []) {
    return prisma.projects.create({
      data: {
        name: name,
        description: description,
        companyId: companyId,
        nodes: {
          create: nodes
        }
      }
    });
  }

  static async updateProject(id, name, description, companyId, nodes = []) {
    return prisma.projects.update({
      where: { id: id },
      data: {
        name: name,
        description: description,
        companyId: companyId,
        nodes: {
          create: nodes
        }
      }
    });
  }

  static async deleteProject(id) {
    return prisma.projects.delete({
      where: { id: id },
    });
  }

  static async getAllProjects() {
    try {
      const projects = await prisma.projects.findMany();
      return projects;
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }
  }
}
module.exports = { ProjectModel };