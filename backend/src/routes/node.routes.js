const { Router } = require("express");

const { NodeService } = require("../services/node.service");
const nodeRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Node:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Nodo Principal"
 *         location:
 *           type: string
 *           example: "Edificio A, Piso 2"
 *         status:
 *           type: string
 *           example: "activo"
 *         projectId:
 *           type: integer
 *           example: 3
 *       required:
 *         - name
 */

/**
 * @swagger
 * /api/nodes:
 *   post:
 *     summary: Crea un nuevo nodo
 *     tags: [Node]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               status:
 *                 type: string
 *               projectId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Nodo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Node'
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error interno del servidor
 */
nodeRoutes.post("/", async (req, res) => {
  try {
    const { name, location, status, projectId } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const node = await NodeService.createNode(
      name,
      location,
      status,
      projectId,
    );
    res.status(201).json(node);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/nodes/{id}:
 *   put:
 *     summary: Actualiza un nodo por su ID
 *     tags: [Node]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del nodo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               status:
 *                 type: string
 *               projectId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Nodo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Node'
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error interno del servidor
 */
nodeRoutes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, status, projectId } = req.body;
    if (!name || !id) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const node = await NodeService.updateNode(
      id,
      name,
      location,
      status,
      projectId,
    );
    res.status(200).json(node);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/nodes/{id}:
 *   delete:
 *     summary: Elimina un nodo por su ID
 *     tags: [Node]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del nodo
 *     responses:
 *       204:
 *         description: Nodo eliminado exitosamente
 *       500:
 *         description: Error interno del servidor
 */
nodeRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await NodeService.deleteNode(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/nodes:
 *   get:
 *     summary: Obtiene todos los nodos
 *     tags: [Node]
 *     responses:
 *       200:
 *         description: Lista de nodos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Node'
 *       500:
 *         description: Error interno del servidor
 */
nodeRoutes.get("/", async (req, res) => {
  try {
    const nodes = await NodeService.getAllNodes();
    res.status(200).json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/nodes/{id}:
 *   get:
 *     summary: Obtiene un nodo por su ID
 *     tags: [Node]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del nodo
 *     responses:
 *       200:
 *         description: Nodo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Node'
 *       404:
 *         description: Nodo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
nodeRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const node = await NodeService.getNodeById(id);
    if (!node) {
      return res.status(404).json({ error: "Nodo no encontrado" });
    }
    res.status(200).json(node);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = nodeRoutes;
