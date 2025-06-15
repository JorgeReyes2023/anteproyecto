// gestion de sensores (types y data)
const { SensorModel } = require('../models/sensor.model.js');
const { SensorTypeModel } = require('../models/sensor-type.model.js');

class SensorService {
    static async createSensor(sensorData) {
        try {
            return await SensorModel.createSensor(sensorData);
        } catch (error) {
            throw new Error(`Error creating sensor: ${error.message}`);
        }
    }

    static async getSensorById(id) {
        try {
            return await SensorModel.getSensorById(id);
        } catch (error) {
            throw new Error(`Error fetching sensor by ID: ${error.message}`);
        }
    }

    static async getAllSensors() {
        try {
            return await SensorModel.getAllSensors();
        } catch (error) {
            throw new Error(`Error fetching all sensors: ${error.message}`);
        }
    }

    static async updateSensor(id, sensorData) {
        try {
            return await SensorModel.updateSensor(id, sensorData);
        } catch (error) {
            throw new Error(`Error updating sensor: ${error.message}`);
        }
    }

    static async deleteSensor(id) {
        try {
            return await SensorModel.deleteSensor(id);
        } catch (error) {
            throw new Error(`Error deleting sensor: ${error.message}`);
        }
    }

    static async createSensorType(sensorTypeData) {
        try {
            return await SensorTypeModel.createSensorType(sensorTypeData);
        } catch (error) {
            throw new Error(`Error creating sensor type: ${error.message}`);
        }
    }

    static async getAllSensorTypes() {
        try {
            return await SensorTypeModel.getAllSensorTypes();
        } catch (error) {
            throw new Error(`Error fetching all sensor types: ${error.message}`);
        }
    }

    static async updateSensorType(id, sensorTypeData) {
        try {
            return await SensorTypeModel.updateSensorType(id, sensorTypeData);
        } catch (error) {
            throw new Error(`Error updating sensor type: ${error.message}`);
        }
    }

    static async deleteSensorType(id) {
        try {
            return await SensorTypeModel.deleteSensorType(id);
        } catch (error) {
            throw new Error(`Error deleting sensor type: ${error.message}`);
        }
    }
}
module.exports = { SensorService };