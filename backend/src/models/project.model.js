const prisma = require("../prisma");

class ProjectModel {
  static async createProject(name, description, companyId, nodes = []) {
    return prisma.proyectos.create({
      data: {
        p_nombre: name,
        p_descripcion: description,
        p_empresa_id: companyId,
        nodos: {
          create: nodes,
        },
      },
    });
  }

  static async updateProject(id, name, description, companyId, nodes = []) {
    return prisma.proyectos.update({
      where: { p_id: id },
      data: {
        p_nombre: name,
        p_descripcion: description,
        p_empresa_id: companyId,
        nodos: {
          create: nodes,
        },
      },
    });
  }

  static async deleteProject(id) {
    return prisma.proyectos.delete({
      where: { p_id: id },
    });
  }

  static async getAllProjects() {
    try {
      const projects = await prisma.proyectos.findMany({
        include: {
          nodos: true,
          empresas: true,
        },
      });
      return projects;
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }
  }

  static async getProjectById(id) {
    try {
      const project = await prisma.proyectos.findUnique({
        where: { p_id: id },
      });
      return project;
    } catch (error) {
      throw new Error(`Error fetching project by ID: ${error.message}`);
    }
  }

  static async getProjectByName(name) {
    try {
      const project = await prisma.proyectos.findFirst({
        where: { p_nombre: name },
      });
      return project;
    } catch (error) {
      throw new Error(`Error fetching project by name: ${error.message}`);
    }
  }

  static async getProjectsByCompanyId(companyId) {
    try {
      const projects = await prisma.proyectos.findMany({
        where: { p_empresa_id: companyId },
        include: {
          empresas: true,
        },
      });
      return projects;
    } catch (error) {
      throw new Error(
        `Error fetching projects by company ID: ${error.message}`,
      );
    }
  }
}
module.exports = { ProjectModel };
