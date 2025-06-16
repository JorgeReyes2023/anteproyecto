const { Router } = require("express");
const { CompanyService } = require("../services/company.service");

const companyRoutes = Router();
// Ruta para crear una empresa
companyRoutes.post("/", async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const company = await CompanyService.createCompany(name, address);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para actualizar una empresa
companyRoutes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const company = await CompanyService.updateCompany(id, name, address);
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para eliminar una empresa
companyRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await CompanyService.deleteCompany(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener todas las empresas
companyRoutes.get("/", async (req, res) => {
  try {
    const companies = await CompanyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener una empresa por ID
companyRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const company = await CompanyService.getCompanyById(id);
    if (!company) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener una empresa por nombre
companyRoutes.get("/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const company = await CompanyService.getCompanyByName(name);
    if (!company) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener una empresa por ID de usuario
//TODO: Cambiar a user routes/service
companyRoutes.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const company = await CompanyService.getCompanyByUserId(userId);
    if (!company) {
      return res
        .status(404)
        .json({ error: "Empresa no encontrada para el usuario" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = { companyRoutes };
