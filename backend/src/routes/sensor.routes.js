const { Router } = require("express");

const { SensorService } = require("../services/sensor.service");

const sensorRoutes = Router();
// Ruta para crear un sensor type
sensorRoutes.post("/types", async (req, res) => {
  try {
    const sensorTypeData = req.body;
    if (!sensorTypeData.name || !sensorTypeData.description) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const sensorType = await SensorService.createSensorType(sensorTypeData);
    res.status(201).json(sensorType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener todos los sensor types
sensorRoutes.get("/types", async (req, res) => {
  try {
    const sensorTypes = await SensorService.getAllSensorTypes();
    res.status(200).json(sensorTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para actualizar un sensor type
sensorRoutes.put("/types/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sensorTypeData = req.body;
    if (!sensorTypeData.name || !sensorTypeData.description) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const sensorType = await SensorService.updateSensorType(id, sensorTypeData);
    res.status(200).json(sensorType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para eliminar un sensor type
sensorRoutes.delete("/types/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await SensorService.deleteSensorType(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para crear un sensor
sensorRoutes.post("/", async (req, res) => {
  try {
    const sensorData = req.body;
    if (!sensorData.name || !sensorData.typeId) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const sensor = await SensorService.createSensor(sensorData);
    res.status(201).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener un sensor por ID
sensorRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await SensorService.getSensorById(id);
    if (!sensor) {
      return res.status(404).json({ error: "Sensor no encontrado" });
    }
    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener todos los sensores
sensorRoutes.get("/", async (req, res) => {
  try {
    const sensors = await SensorService.getAllSensors();
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para actualizar un sensor
sensorRoutes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sensorData = req.body;
    if (!sensorData.name || !sensorData.typeId) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const sensor = await SensorService.updateSensor(id, sensorData);
    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para eliminar un sensor
sensorRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await SensorService.deleteSensor(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { sensorRoutes };
