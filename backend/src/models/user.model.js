const prisma = require("../prisma");

class UserModel {
  static async getAllUsers() {
    try {
      const users = await prisma.usuarios.findMany({
        include: {
          roles_usuario: true,
          empresas: true,
        },
      });
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  static async createUser(username, email, password, role, company = null) {
    const roleId = await prisma.roles_usuario
      .findFirst({
        where: { name: role },
      })
      .then((role) => (role ? role.id : null));

    return prisma.usuarios.create({
      data: {
        u_nombre: username,
        u_email: email,
        u_contrasena: password,
        empresas: company
          ? {
              connect: { id: company },
            }
          : undefined,
        roles_usuario: {
          connect: { id: roleId },
        },
      },
    });
  }

  static async getUserByEmail(email) {
    try {
      const user = await prisma.usuarios.findUnique({
        where: { u_email: email },
        include: {
          roles_usuario: true,
          empresas: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }

  static async getUserById(id) {
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new Error("Invalid user ID");
      }
      const user = await prisma.usuarios.findUnique({
        where: { id: numericId },
        include: {
          roles_usuario: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }

  static async updateUser(id, updates) {
    try {
      const data = { ...updates };

      const user = await prisma.usuarios.update({
        where: { id },
        data,
        include: {
          roles_usuario: true,
          empresas: true,
        },
      });

      return user;
    } catch (error) {
      console.error(`Error al actualizar el usuario ${id}:`, error);
      throw new Error(`Error al actualizar: ${error.message}`);
    }
  }

  static async deleteUser(id) {
    try {
      const user = await prisma.usuarios.delete({
        where: { id: id },
      });
      return user;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

module.exports = { UserModel };
