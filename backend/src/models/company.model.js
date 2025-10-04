const prisma = require("../prisma");

class CompanyModel {
  static async createCompany(name, address) {
    return prisma.empresas.create({
      data: {
        e_nombre: name,
        e_direccion: address,
      },
    });
  }

  static async updateCompany(id, name, address) {
    return prisma.empresas.update({
      where: { e_id: id },
      data: {
        e_nombre: name,
        e_direccion: address,
      },
    });
  }

  static async deleteCompany(id) {
    return prisma.empresas.delete({
      where: { e_id: id },
    });
  }

  static async getAllCompanies() {
    try {
      const companies = await prisma.empresas.findMany();
      return companies;
    } catch (error) {
      throw new Error(`Error fetching companies: ${error.message}`);
    }
  }

  static async getCompanyById(id) {
    try {
      const company = await prisma.empresas.findUnique({
        where: { e_id: id },
      });
      return company;
    } catch (error) {
      throw new Error(`Error fetching company by ID: ${error.message}`);
    }
  }

  static async getCompanyByName(name) {
    try {
      const company = await prisma.empresas.findFirst({
        where: { e_nombre: name },
      });
      return company;
    } catch (error) {
      throw new Error(`Error fetching company by name: ${error.message}`);
    }
  }

  static async getCompanyByUserId(userId) {
    try {
      const company = await prisma.empresas.findFirst({
        where: {
          usuarios: {
            some: {
              u_id: userId,
            },
          },
        },
      });
      return company;
    } catch (error) {
      throw new Error(`Error fetching company by user ID: ${error.message}`);
    }
  }
}
module.exports = { CompanyModel };
