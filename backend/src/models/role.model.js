const prisma = require("../prisma");

class RoleModel {
  static async getRoleByName(name) {
    try {
      const role = await prisma.roles_usuario.findFirst({
        where: { ru_nombre: name },
      });
      return role;
    } catch (error) {
      throw new Error(`Error fetching role by name: ${error.message}`);
    }
  }

  static async getAllRoles() {
    try {
      const roles = await prisma.roles_usuario.findMany();
      return roles;
    } catch (error) {
      throw new Error(`Error fetching roles: ${error.message}`);
    }
  }
}
module.exports = { RoleModel };
