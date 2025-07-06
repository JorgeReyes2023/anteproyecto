// gestion de sensores (types y data)
const { SensorModel } = require("../models/sensor.model.js");
const { SensorTypeModel } = require("../models/sensor-type.model.js");
const {
  SensorSupportedTypeModel,
} = require("../models/sensor-supported-type.model.js");

const {
  sensorSchemaId,
  sensorSupportedTypeSchema,
} = require("../validators/sensor.validator.js");

class SensorService {
  static async createSensor(name, nodeId, status) {
    try {
      const { value, error } = sensorSupportedTypeSchema.validate(
        { name, nodeId, status },
        { convert: true },
      );

      if (error) throw new Error(`Datos inválidos: ${error.message}`);

      const existingSensor = await SensorModel.getSensorByName(value.name);
      if (existingSensor) {
        throw new Error(`El sensor con el nombre ${value.name} ya existe`);
      }

      const newSensor = await SensorModel.createSensor(
        value.name,
        value.nodeId,
        value.status,
      );

      if (value.typeIds && value.typeIds.length > 0) {
        await Promise.all(
          value.typeIds.map((typeId) =>
            SensorSupportedTypeModel.createSensorSupportedType({
              sensor_id: newSensor.id,
              type_id: typeId,
            }),
          ),
        );
      }
      return newSensor;
    } catch (error) {
      throw new Error(`Error al crear el sensor: ${error.message}`);
    }
  }

  static async getSensorById(id) {
    try {
      const { value, error } = sensorSchemaId.validate(
        { id },
        { convert: true },
      );
      if (error) throw new Error(`ID inválido: ${error.message}`);

      return await SensorModel.getSensorById(value.id);
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

  static async createSensorSupportedType(sensorSupportedTypeData) {
    try {
      return await SensorSupportedTypeModel.createSensorSupportedType(
        sensorSupportedTypeData,
      );
    } catch (error) {
      throw new Error(`Error creating sensor supported type: ${error.message}`);
    }
  }

  static async getAllSensorSupportedTypes() {
    try {
      return await SensorSupportedTypeModel.getAllSensorSupportedTypes();
    } catch (error) {
      throw new Error(
        `Error fetching all sensor supported types: ${error.message}`,
      );
    }
  }

  static async updateSensorSupportedType(id, sensorSupportedTypeData) {
    try {
      return await SensorSupportedTypeModel.updateSensorSupportedType(
        id,
        sensorSupportedTypeData,
      );
    } catch (error) {
      throw new Error(`Error updating sensor supported type: ${error.message}`);
    }
  }

  static async deleteSensorSupportedType(id) {
    try {
      return await SensorSupportedTypeModel.deleteSensorSupportedType(id);
    } catch (error) {
      throw new Error(`Error deleting sensor supported type: ${error.message}`);
    }
  }
}
module.exports = { SensorService };
