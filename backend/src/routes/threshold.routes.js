const { Router } = require("express");

const { ThresholdService } = require("../services/threshold.service");

const thresholdRoutes = Router();

// Ruta para crear un umbral
thresholdRoutes.post("/", async (req, res) => {
  try {
    const thresholdData = req.body;
    if (!thresholdData.name || !thresholdData.value) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const threshold = await ThresholdService.createThreshold(thresholdData);
    res.status(201).json(threshold);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para actualizar un umbral
thresholdRoutes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thresholdData = req.body;
    if (!thresholdData.name || !thresholdData.value) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const threshold = await ThresholdService.updateThreshold(id, thresholdData);
    res.status(200).json(threshold);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para eliminar un umbral
thresholdRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ThresholdService.deleteThreshold(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener todos los umbrales
thresholdRoutes.get("/", async (req, res) => {
  try {
    const thresholds = await ThresholdService.getAllThresholds();
    res.status(200).json(thresholds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener un umbral por ID
thresholdRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const threshold = await ThresholdService.getThresholdById(id);
    if (!threshold) {
      return res.status(404).json({ error: "Umbral no encontrado" });
    }
    res.status(200).json(threshold);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = { thresholdRoutes };
