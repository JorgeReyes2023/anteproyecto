const { ProjectModel } = require("../models/project.model");
const {
  createProjectSchema,
  updateProjectSchema,
  deleteProjectSchema,
} = require("../validators/project.validator");
const { Utils } = require("../utils/utils");

/**
 * @typedef {Object} NodeInput
 * @property {number} id - ID del nodo.
 * @property {string} [name] - Nombre del nodo.
 */

/**
 * Servicio para la gestión de proyectos.
 * Incluye creación, actualización, eliminación y obtención de proyectos,
 * validando los datos y controlando las reglas de negocio.
 */
class ProjectService {
  /**
   * Crea un nuevo proyecto después de validar los datos y verificar que no exista uno con el mismo nombre.
   *
   * @param {string} name - Nombre del proyecto.
   * @param {string} description - Descripción del proyecto.
   * @param {number|string} companyId - ID de la empresa asociada.
   * @param {NodeInput[]} [nodes=[]] - IDs de los nodos asociados al proyecto.
   *
   * @returns {Promise<Project>} Proyecto creado exitosamente.
   *
   * @throws {Error} Si los datos son inválidos o el proyecto ya existe.
   */
  static async createProject(name, description, companyId) {
    try {
      const { value, error } = createProjectSchema.validate(
        { name, description, companyId },
        { convert: true },
      );

      if (error) throw new Error(`Datos inválidos: ${error.message}`);
      // Check if the project already exists
      const existingProject = await ProjectModel.getProjectByName(value.name);
      if (existingProject) {
        throw new Error(`El proyecto con el nombre ${value.name} ya existe`);
      }

      const createdProject = await ProjectModel.createProject(
        value.name,
        value.description,
        value.companyId,
      );

      return {
        id: Utils.convertBigIntToString(createdProject.p_id),
        name: createdProject.p_nombre,
        description: createdProject.p_descripcion,
        companyId: Utils.convertBigIntToString(createdProject.p_empresa_id),
      };
    } catch (error) {
      throw new Error(`Error al crear el proyecto: ${error.message}`);
    }
  }

  /**
   * Actualiza un proyecto existente con nuevos valores.
   *
   * @param {number} id - ID del proyecto a actualizar.
   * @param {string} name - Nuevo nombre del proyecto.
   * @param {string} description - Nueva descripción.
   * @param {number|string} companyId - ID de la empresa asociada.
   * @param {NodeInput[]} [nodes=[]] - IDs de los nodos a vincular.
   *
   * @returns {Promise<Project>} Proyecto actualizado.
   *
   * @throws {Error} Si los datos son inválidos o ocurre un error en la base de datos.
   */
  static async updateProject(id, name, description, companyId) {
    try {
      const { value, error } = updateProjectSchema.validate(
        {
          id,
          name,
          description,
          companyId,
        },
        { convert: true },
      );

      if (error) throw new Error(`Datos inválidos: ${error.message}`);

      const updatedProject = await ProjectModel.updateProject(
        value.id,
        value.name,
        value.description,
        value.companyId,
      );

      console.log(updatedProject);

      return {
        id: Utils.convertBigIntToString(updatedProject.p_id),
        name: updatedProject.p_nombre,
        description: updatedProject.p_descripcion,
        company: Array.isArray(updatedProject.empresas)
          ? updatedProject.empresas.map((c) => ({
              id: Utils.convertBigIntToString(c.e_id),
              name: c.e_nombre,
            }))
          : updatedProject.empresas
            ? [
                {
                  id: Utils.convertBigIntToString(updatedProject.empresas.e_id),
                  name: updatedProject.empresas.e_nombre,
                },
              ]
            : [],
        nodes: updatedProject.nodos.map((node) => ({
          id: Utils.convertBigIntToString(node.n_id),
          name: node.n_nombre,
          location: node.n_ubicacion,
          state: node.n_estado,
        })),
      };
    } catch (error) {
      throw new Error(`Error al actualizar el proyecto: ${error.message}`);
    }
  }

  /**
   * Elimina un proyecto por su ID.
   *
   * @param {number} id - ID del proyecto a eliminar.
   *
   * @returns {Promise<boolean>} `true` si se eliminó correctamente.
   *
   * @throws {Error} Si ocurre un error durante la eliminación.
   */
  static async deleteProject(id) {
    try {
      const { value, error } = deleteProjectSchema.validate(
        { id },
        { convert: true },
      );

      if (error) throw new Error(`Datos inválidos: ${error.message}`);
      return await ProjectModel.deleteProject(value.id);
    } catch (error) {
      throw new Error(`Error al eliminar el proyecto: ${error.message}`);
    }
  }

  /**
   * Obtiene todos los proyectos existentes junto con sus empresas asociadas y nodos.
   *
   * @returns {Promise<Array<Object>>} Lista de proyectos en formato DTO,
   * incluyendo la información básica de la empresa asociada.
   *
   * @throws {Error} Si ocurre un error al obtener los proyectos.
   */
  static async getAllProjects() {
    try {
      const projects = await ProjectModel.getAllProjects();
      console.log(projects[0].nodos);
      const projectsDto = projects.map((project) => ({
        id: Utils.convertBigIntToString(project.p_id),
        name: project.p_nombre,
        description: project.p_descripcion,
        nodes: project.nodos.map((node) => ({
          id: Utils.convertBigIntToString(node.n_id),
          name: node.n_nombre,
          location: node.n_ubicacion,
          state: node.n_estado,
        })),
        company: project.empresas
          ? {
              id: Utils.convertBigIntToString(project.empresas.e_id),
              name: project.empresas.e_nombre,
            }
          : null,
      }));
      return projectsDto;
    } catch (error) {
      throw new Error(`Error al obtener los proyectos: ${error.message}`);
    }
  }

  /**
   * Obtiene un proyecto por el ID de la empresa asociada.
   * @param {number} companyId - ID de la empresa asociada.
   * @returns {Promise<Array<Object>>} Lista de proyectos asociados a la empresa.
   * @throws {Error} Si ocurre un error al obtener los proyectos.
   */
  static async getProjectsByCompanyId(companyId) {
    try {
      if (companyId == 0) {
        return await ProjectService.getAllProjects();
      }

      const { value } = deleteProjectSchema.validate(
        { id: companyId },
        { convert: true },
      );
      const projects = await ProjectModel.getProjectsByCompanyId(value.id);
      return projects.map((project) => ({
        id: project.p_id,
        name: project.p_nombre,
        description: project.p_descripcion,
        companyId: project.p_empresa_id,
        company: project.empresas
          ? {
              id: project.empresas.e_id,
              name: project.empresas.e_nombre,
            }
          : null,
      }));
    } catch (error) {
      throw new Error(`Error al obtener los proyectos: ${error.message}`);
    }
  }
}

module.exports = { ProjectService };
