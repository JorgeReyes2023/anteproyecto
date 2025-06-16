const { ProjectModel } = require("../models/project.model");

class ProjectService {
  static async createProject(name, description, companyId, nodes = []) {
    try {
      // Check if the project already exists
      const existingProject = await ProjectModel.getProjectByName(name);
      if (existingProject) {
        throw new Error(`El proyecto con el nombre ${name} ya existe`);
      }
      return await ProjectModel.createProject(
        name,
        description,
        companyId,
        nodes,
      );
    } catch (error) {
      throw new Error(`Error al crear el proyecto: ${error.message}`);
    }
  }

  static async updateProject(id, name, description, companyId, nodes = []) {
    try {
      return await ProjectModel.updateProject(
        id,
        name,
        description,
        companyId,
        nodes,
      );
    } catch (error) {
      throw new Error(`Error al actualizar el proyecto: ${error.message}`);
    }
  }

  static async deleteProject(id) {
    try {
      return await ProjectModel.deleteProject(id);
    } catch (error) {
      throw new Error(`Error al eliminar el proyecto: ${error.message}`);
    }
  }

  static async getAllProjects() {
    try {
      return await ProjectModel.getAllProjects();
    } catch (error) {
      throw new Error(`Error al obtener los proyectos: ${error.message}`);
    }
  }
}
module.exports = { ProjectService };
