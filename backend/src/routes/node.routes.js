const { Router } = require('express');

const { NodeService } = require('../services/node.service');
const nodeRoutes = Router();

// Ruta para crear un nodo
nodeRoutes.post('/', async (req, res) => {
  try {
    const { name, type, projectId } = req.body;
    if (!name || !type || !projectId) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    const node = await NodeService.createNode(name, type, projectId);
    res.status(201).json(node);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para actualizar un nodo
nodeRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    if (!name || !type) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    const node = await NodeService.updateNode(id, name, type);
    res.status(200).json(node);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para eliminar un nodo
nodeRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await NodeService.deleteNode(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener todos los nodos
nodeRoutes.get('/', async (req, res) => {
  try {
    const nodes = await NodeService.getAllNodes();
    res.status(200).json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener un nodo por ID
nodeRoutes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const node = await NodeService.getNodeById(id);
    if (!node) {
      return res.status(404).json({ error: 'Nodo no encontrado' });
    }
    res.status(200).json(node);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = { nodeRoutes };