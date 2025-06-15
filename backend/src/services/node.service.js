const { NodeModel } = require('../models/node.model');

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
      return await NodeModel.getAllNodes();
    } catch (error) {
      throw new Error(`Error al obtener los nodos: ${error.message}`);
    }
  }
}

module.exports = { NodeService };