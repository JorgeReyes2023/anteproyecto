const { Router } = require('express');
const { AlertService } = require('../services/alert.service');

const alertRoutes = Router();
// Ruta para crear una alerta
alertRoutes.post('/', async (req, res) => {
  try {
    const alertData = req.body;
    if (!alertData.name || !alertData.type) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    const alert = await AlertService.createAlert(alertData);
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para actualizar una alerta
alertRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const alertData = req.body;
    if (!alertData.name || !alertData.type) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    const alert = await AlertService.updateAlert(id, alertData);
    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para eliminar una alerta
alertRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await AlertService.deleteAlert(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener todas las alertas
alertRoutes.get('/', async (req, res) => {
  try {
    const alerts = await AlertService.getAllAlerts();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener una alerta por ID
alertRoutes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await AlertService.getAlertById(id);
    if (!alert) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }
    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = { alertRoutes };