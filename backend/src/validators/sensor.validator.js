import { object, number, string, array } from "joi";

const statusMap = {
  activo: "ACTIVE",
  inactivo: "INACTIVE",
  "en Mantenimiento": "MAINTENANCE",
  error: "ERROR",
};

// ---- Sensor Reading Type Schema ----
const SensorReadingTypeSchema = object({
  id: number().integer().positive().required(),
  name: string()
    .custom((value) => {
      const normalized = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
      return normalized;
    })
    .min(2)
    .max(255)
    .required(),
  unit: string().min(1).max(50).lowercase().required(),
  description: string().min(5).max(500).allow("", null),
});

const SensorReadingTypeSchemaWithoutId = object({
  name: string()
    .custom((value) => {
      const normalized = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
      return normalized;
    })
    .min(2)
    .max(255)
    .required(),
  unit: string().min(1).max(50).lowercase().required(),
  description: string().min(5).max(500).allow("", null),
});

// ---- Sensor Supported Type Schema ----
const sensorSupportedTypeSchema = object({
  id: number().integer().positive(),
  name: string().min(2).max(255).required(),
  nodeId: number().integer().positive().allow(null),
  status: string()
    .custom((value, helpers) => {
      if (["ACTIVE", "INACTIVE", "MAINTENANCE", "ERROR"].includes(value)) {
        return value;
      }
      if (statusMap[value]) {
        return statusMap[value];
      }
      return helpers.error("any.invalid");
    })
    .default("INACTIVE"),
  typeIds: array().items(number().integer().positive()).min(0).required(),
});

const sensorSchemaId = object({
  id: number().integer().positive().required(),
});

const attachingSensorsToNodeSchema = object({
  idNode: number().integer().positive().required(),
  sensorIds: array().items(number().integer().positive()).min(0).required(),
});

const getReadingsBySensorIdAndType = object({
  idSensor: number().integer().positive().required(),
  idType: number().integer().positive().required(),
});

export default {
  sensorSupportedTypeSchema,
  sensorSchemaId,
  SensorReadingTypeSchema,
  SensorReadingTypeSchemaWithoutId,
  attachingSensorsToNodeSchema,
  getReadingsBySensorIdAndType,
};
