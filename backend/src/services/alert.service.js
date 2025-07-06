const { AlertModel } = require("../models/alert.model");

/**
 * Servicio para la gestión de alertas.
 * Este servicio proporciona funciones para crear, actualizar, eliminar y obtener alertas,
 * centralizando la lógica de negocio relacionada a estos componentes.
 */
class AlertService {
  /**
   * Crea una nueva alerta.
   * @param {Object} alertData - Datos de la alerta a crear.
   * @returns {Promise<Object>} Alerta creada.
   * @throws {Error} Si ocurre un error durante la creación.
   */
  static async createAlert(alertData) {
    // Llama al modelo para crear una nueva alerta con los datos proporcionados
    try {
      return await AlertModel.createAlert(alertData);
    } catch (error) {
      throw new Error(`Error creating alert: ${error.message}`);
    }
  }

  /**
   * Obtiene una alerta por su ID.
   * @param {string} id - ID de la alerta a buscar.
   * @returns {Promise<Object>} Alerta encontrada.
   * @throws {Error} Si ocurre un error durante la búsqueda.
   */
  static async getAlertById(id) {
    try {
      return await AlertModel.getAlertById(id);
    } catch (error) {
      throw new Error(`Error fetching alert by ID: ${error.message}`);
    }
  }

  /**
   * Obtiene todas las alertas.
   * @returns {Promise<Array>} Lista de todas las alertas.
   * @throws {Error} Si ocurre un error durante la obtención.
   */
  static async getAllAlerts() {
    try {
      return await AlertModel.getAllAlerts();
    } catch (error) {
      throw new Error(`Error fetching all alerts: ${error.message}`);
    }
  }

  /**
   * Actualiza una alerta existente.
   * @param {string} id - ID de la alerta a actualizar.
   * @param {Object} alertData - Datos nuevos para la alerta.
   * @returns {Promise<Object>} Alerta actualizada.
   * @throws {Error} Si ocurre un error durante la actualización.
   */
  static async updateAlert(id, alertData) {
    try {
      return await AlertModel.updateAlert(id, alertData);
    } catch (error) {
      throw new Error(`Error updating alert: ${error.message}`);
    }
  }

  /**
   * Elimina una alerta por su ID.
   * @param {string} id - ID de la alerta a eliminar.
   * @returns {Promise<Object>} Resultado de la eliminación.
   * @throws {Error} Si ocurre un error durante la eliminación.
   */
  static async deleteAlert(id) {
    try {
      return await AlertModel.deleteAlert(id);
    } catch (error) {
      throw new Error(`Error deleting alert: ${error.message}`);
    }
  }
}

module.exports = { AlertService };
