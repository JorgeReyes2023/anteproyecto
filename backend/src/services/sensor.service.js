const { SensorModel } = require("../models/sensor.model.js");
const { SensorTypeModel } = require("../models/sensor-type.model.js");

/**
 * Servicio para la gestión de sensores y sus tipos.
 *
 * Este servicio permite crear, obtener, actualizar y eliminar sensores y tipos de sensores,
 * centralizando la lógica de negocio relacionada a estos componentes.
 */
class SensorService {
  /**
   * Crea un nuevo sensor con los datos proporcionados.
   *
   * @param {Object} sensorData - Datos del sensor (nombre, ubicación, estado, etc.).
   * @returns {Promise<Object>} Sensor creado exitosamente.
   * @throws {Error} Si ocurre un error al crear el sensor.
   */
  static async createSensor(sensorData) {
    try {
      return await SensorModel.createSensor(sensorData);
    } catch (error) {
      throw new Error(`Error creating sensor: ${error.message}`);
    }
  }

  /**
   * Obtiene un sensor por su ID.
   *
   * @param {number|string} id - ID del sensor a buscar.
   * @returns {Promise<Object>} Sensor encontrado.
   * @throws {Error} Si ocurre un error durante la búsqueda.
   */
  static async getSensorById(id) {
    try {
      return await SensorModel.getSensorById(id);
    } catch (error) {
      throw new Error(`Error fetching sensor by ID: ${error.message}`);
    }
  }

  /**
   * Obtiene todos los sensores registrados.
   *
   * @returns {Promise<Array<Object>>} Lista de sensores.
   * @throws {Error} Si ocurre un error al obtener los sensores.
   */
  static async getAllSensors() {
    try {
      return await SensorModel.getAllSensors();
    } catch (error) {
      throw new Error(`Error fetching all sensors: ${error.message}`);
    }
  }

  /**
   * Actualiza un sensor existente con nuevos datos.
   *
   * @param {number|string} id - ID del sensor a actualizar.
   * @param {Object} sensorData - Nuevos datos para el sensor.
   * @returns {Promise<Object>} Sensor actualizado.
   * @throws {Error} Si ocurre un error durante la actualización.
   */
  static async updateSensor(id, sensorData) {
    try {
      return await SensorModel.updateSensor(id, sensorData);
    } catch (error) {
      throw new Error(`Error updating sensor: ${error.message}`);
    }
  }

  /**
   * Elimina un sensor por su ID.
   *
   * @param {number|string} id - ID del sensor a eliminar.
   * @returns {Promise<Object>} Resultado de la operación.
   * @throws {Error} Si ocurre un error al eliminar el sensor.
   */
  static async deleteSensor(id) {
    try {
      return await SensorModel.deleteSensor(id);
    } catch (error) {
      throw new Error(`Error deleting sensor: ${error.message}`);
    }
  }

  // ────────────────────────────────────────────────────────────────

  /**
   * Crea un nuevo tipo de sensor.
   *
   * @param {Object} sensorTypeData - Datos del tipo de sensor (nombre, unidad, etc.).
   * @returns {Promise<Object>} Tipo de sensor creado.
   * @throws {Error} Si ocurre un error al crear el tipo de sensor.
   */
  static async createSensorType(sensorTypeData) {
    try {
      return await SensorTypeModel.createSensorType(sensorTypeData);
    } catch (error) {
      throw new Error(`Error creating sensor type: ${error.message}`);
    }
  }

  /**
   * Obtiene todos los tipos de sensores registrados.
   *
   * @returns {Promise<Array<Object>>} Lista de tipos de sensores.
   * @throws {Error} Si ocurre un error al obtener los tipos de sensores.
   */
  static async getAllSensorTypes() {
    try {
      return await SensorTypeModel.getAllSensorTypes();
    } catch (error) {
      throw new Error(`Error fetching all sensor types: ${error.message}`);
    }
  }

  /**
   * Actualiza un tipo de sensor existente.
   *
   * @param {number|string} id - ID del tipo de sensor a actualizar.
   * @param {Object} sensorTypeData - Nuevos datos del tipo de sensor.
   * @returns {Promise<Object>} Tipo de sensor actualizado.
   * @throws {Error} Si ocurre un error durante la actualización.
   */
  static async updateSensorType(id, sensorTypeData) {
    try {
      return await SensorTypeModel.updateSensorType(id, sensorTypeData);
    } catch (error) {
      throw new Error(`Error updating sensor type: ${error.message}`);
    }
  }

  /**
   * Elimina un tipo de sensor por su ID.
   *
   * @param {number|string} id - ID del tipo de sensor a eliminar.
   * @returns {Promise<Object>} Resultado de la operación.
   * @throws {Error} Si ocurre un error al eliminar el tipo de sensor.
   */
  static async deleteSensorType(id) {
    try {
      return await SensorTypeModel.deleteSensorType(id);
    } catch (error) {
      throw new Error(`Error deleting sensor type: ${error.message}`);
    }
  }
}
module.exports = { SensorService };
