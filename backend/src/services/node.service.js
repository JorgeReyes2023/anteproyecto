const { NodeModel } = require("../models/node.model");
const { State } = require("../constants/states");

class NodeService {
  static async createNode(name, type, projectId) {
    try {
      return await NodeModel.createNode(name, type, projectId);
    } catch (error) {
      throw new Error(`Error al crear el nodo: ${error.message}`);
    }
  }

  static async getNodeById(id) {
    try {
      return await NodeModel.getNodeById(id);
    } catch (error) {
      throw new Error(`Error al obtener el nodo: ${error.message}`);
    }
  }

  static async updateNode(id, name, type) {
    try {
      return await NodeModel.updateNode(id, name, type);
    } catch (error) {
      throw new Error(`Error al actualizar el nodo: ${error.message}`);
    }
  }

  static async deleteNode(id) {
    try {
      return await NodeModel.deleteNode(id);
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
