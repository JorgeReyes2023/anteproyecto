const { ProjectModel } = require("../models/project.model");
const { projectSchema } = require("../validators/project.validator");

class ProjectService {
  /**
   * @param {string} name
   * @param {string} description
   * @param {number|string} companyId
   * @param {number[]} nodes
   */
  static async createProject(name, description, companyId, nodes = []) {
    try {
      const { value, error } = projectSchema.validate(
        { name, description, companyId, nodes },
        { convert: true },
      );

      if (error) throw new Error(`Datos inválidos: ${error.message}`);
      // Check if the project already exists
      const existingProject = await ProjectModel.getProjectByName(value.name);
      if (existingProject) {
        throw new Error(`El proyecto con el nombre ${value.name} ya existe`);
      }
      return await ProjectModel.createProject(
        value.name,
        value.description,
        value.companyId,
        value.nodes,
      );
    } catch (error) {
      throw new Error(`Error al crear el proyecto: ${error.message}`);
    }
  }

  /**
   * @param {number} id
   * @param {string} name
   * @param {string} description
   * @param {number|string} companyId
   * @param {Nodes[]} nodes
   */
  static async updateProject(id, name, description, companyId, nodes = []) {
    try {
      const { value, error } = projectSchema.validate(
        {
          id,
          name,
          description,
          companyId,
          nodes,
        },
        { convert: true },
      );

      if (error) throw new Error(`Datos inválidos: ${error.message}`);

      return await ProjectModel.updateProject(
        value.id,
        value.name,
        value.description,
        value.companyId,
        value.nodes,
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
      const projects = await ProjectModel.getAllProjects();
      const projectsDto = projects.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        companyId: project.company_id,
        nodes: project.nodes,
        company: project.companies
          ? {
              id: project.companies.id,
              name: project.companies.name,
            }
          : null,
      }));
      return projectsDto;
    } catch (error) {
      throw new Error(`Error al obtener los proyectos: ${error.message}`);
    }
  }
}

module.exports = { ProjectService };
