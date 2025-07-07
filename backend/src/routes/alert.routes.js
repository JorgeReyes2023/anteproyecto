const { Router } = require("express");
const { AlertService } = require("../services/alert.service");

const alertRoutes = Router();
/**
 * @swagger
 * /api/alerts:
 *   post:
 *     summary: Crear una nueva alerta
 *     tags:
 *       - Alertas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Alerta creada
 *       400:
 *         description: Faltan datos requeridos
 */
alertRoutes.post("/", async (req, res) => {
  try {
    const alertData = req.body;
    if (!alertData.name || !alertData.type) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const alert = await AlertService.createAlert(alertData);
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/alerts/{id}:
 *   put:
 *     summary: Actualizar una alerta existente
 *     tags:
 *       - Alertas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la alerta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Alerta actualizada correctamente
 *       400:
 *         description: Faltan datos requeridos
 *       500:
 *         description: Error interno del servidor
 */
alertRoutes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const alertData = req.body;
    if (!alertData.name || !alertData.type) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const alert = await AlertService.updateAlert(id, alertData);
    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/alerts/{id}:
 *   delete:
 *     summary: Eliminar una alerta por ID
 *     tags:
 *       - Alertas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la alerta a eliminar
 *     responses:
 *       204:
 *         description: Alerta eliminada exitosamente
 *       500:
 *         description: Error al eliminar la alerta
 */

alertRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await AlertService.deleteAlert(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/alerts:
 *   get:
 *     summary: Obtener todas las alertas
 *     tags:
 *       - Alertas
 *     responses:
 *       200:
 *         description: Lista de alertas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *       500:
 *         description: Error interno del servidor
 */

alertRoutes.get("/", async (req, res) => {
  try {
    const alerts = await AlertService.getAllAlerts();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/alerts/{id}:
 *   get:
 *     summary: Obtener una alerta por ID
 *     tags:
 *       - Alertas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la alerta
 *     responses:
 *       200:
 *         description: Detalle de la alerta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *       404:
 *         description: Alerta no encontrada
 *       500:
 *         description: Error interno del servidor
 */

alertRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await AlertService.getAlertById(id);
    if (!alert) {
      return res.status(404).json({ error: "Alerta no encontrada" });
    }
    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = alertRoutes;
