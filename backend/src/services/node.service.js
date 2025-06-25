const { NodeModel } = require("../models/node.model");
const { State } = require("../constants/states");
const { nodeSchema, nodeSchemaId } = require("../validators/node.validator");

class NodeService {
  static async createNode(name, location, status, projectId) {
    try {
      // Validar los parámetros de entrada
      const { value, error } = nodeSchema.validate(
        {
          name,
          location,
          status,
          projectId,
        },
        { convert: true },
      );
      if (error) {
        throw new Error(`Error de validación: ${error.message}`);
      }
      const node = await NodeModel.createNode(
        value.name,
        value.location,
        value.status,
        value.projectId,
      );
      return {
        ...node,
        status: State[node.status], // Convertir el estado a un valor del enum State
      };
    } catch (error) {
      throw new Error(`Error al crear el nodo: ${error.message}`);
    }
  }

  static async getNodeById(id) {
    try {
      const { value, error } = nodeSchemaId.validate({ id }, { convert: true });
      if (error) throw new Error(`Error de validación: ${error.message}`);
      return await NodeModel.getNodeById(value.id);
    } catch (error) {
      throw new Error(`Error al obtener el nodo: ${error.message}`);
    }
  }

  static async updateNode(id, name, location, status, projectId) {
    try {
      const { value, error } = nodeSchema.validate(
        {
          id,
          name,
          location,
          status,
          projectId,
        },
        { convert: true },
      );
      if (error) {
        throw new Error(`Error de validación: ${error.message}`);
      }
      const node = await NodeModel.updateNode(
        value.id,
        value.name,
        value.location,
        value.status,
        value.projectId,
      );
      return {
        ...node,
        status: State[node.status], // Convertir el estado a un valor del enum State
      };
    } catch (error) {
      throw new Error(`Error al actualizar el nodo: ${error.message}`);
    }
  }

  static async deleteNode(id) {
    try {
      const { value, error } = nodeSchemaId.validate({ id }, { convert: true });
      if (error) throw new Error(`Error de validación: ${error.message}`);
      return await NodeModel.deleteNode(value.id);
    } catch (error) {
      throw new Error(`Error al eliminar el nodo: ${error.message}`);
    }
  }

  static async getAllNodes() {
    try {
      const nodes = await NodeModel.getAllNodes();
      // Mapear los nodos para convertir el string de estado en un valor del enum State
      return nodes.map((node) => ({
        ...node,
        status: State[node.status],
      }));
    } catch (error) {
      throw new Error(`Error al obtener los nodos: ${error.message}`);
    }
  }
}

module.exports = { NodeService };
