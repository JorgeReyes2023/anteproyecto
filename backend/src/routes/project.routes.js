const { Router } = require("express");

const { ProjectService } = require("../services/project.service");

const projectRoutes = Router();
// Ruta para crear un proyecto
projectRoutes.post("/", async (req, res) => {
  try {
    const { name, description, companyId, nodes } = req.body;
    if (!name || !description || !companyId) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const project = await ProjectService.createProject(
      name,
      description,
      companyId,
      nodes,
    );
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para actualizar un proyecto
projectRoutes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, companyId, nodes } = req.body;
    if (!name || !description || !companyId) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const project = await ProjectService.updateProject(
      id,
      name,
      description,
      companyId,
      nodes,
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para eliminar un proyecto
projectRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ProjectService.deleteProject(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener todos los proyectos
projectRoutes.get("/", async (req, res) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener un proyecto por ID
projectRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(id);
    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = { projectRoutes };
