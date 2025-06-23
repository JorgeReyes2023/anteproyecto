const { CompanyModel } = require("../models/company.model");

class CompanyService {
  static async createCompany(name, address) {
    try {
      // Check if the company already exists
      const existingCompany = await CompanyModel.getCompanyByName(name);
      if (existingCompany) {
        throw new Error(`La empresa con el nombre ${name} ya existe`);
      }

      return await CompanyModel.createCompany(name, address);
    } catch (error) {
      throw new Error(`Error al crear la empresa: ${error.message}`);
    }
  }

  static async updateCompany(id, name, address) {
    try {
      const numberId = parseInt(id, 10);
      return await CompanyModel.updateCompany(numberId, name, address);
    } catch (error) {
      throw new Error(`Error al actualizar la empresa: ${error.message}`);
    }
  }

  static async deleteCompany(id) {
    try {
      const numberId = parseInt(id, 10);
      return await CompanyModel.deleteCompany(numberId);
    } catch (error) {
      if (error.code === "P2003") {
        // P2003 is the error code for foreign key constraint violation
        throw new Error(
          `No se puede eliminar la empresa porque tiene usuarios o proyectos asociados.`,
        );
      } else {
        throw new Error(`Error al eliminar la empresa: ${error.message}`);
      }
    }
  }

  static async getAllCompanies() {
    try {
      return await CompanyModel.getAllCompanies();
    } catch (error) {
      throw new Error(`Error al obtener las empresas: ${error.message}`);
    }
  }

  static async getCompanyById(id) {
    try {
      return await CompanyModel.getCompanyById(id);
    } catch (error) {
      throw new Error(`Error al obtener la empresa por ID: ${error.message}`);
    }
  }
}
module.exports = { CompanyService };
