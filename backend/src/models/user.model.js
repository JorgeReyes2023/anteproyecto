const prisma = require("../prisma");

class UserModel {
  static async createUser(username, email, password, role, company = null) {
    //get roleId from role name
    const roleId = await prisma.user_roles
      .findFirst({
        where: { name: role },
      })
      .then((role) => (role ? role.id : null));

    return prisma.users.create({
      data: {
        name: username,
        email: email,
        password: password,
        companies: company
          ? {
              connect: { id: company },
            }
          : undefined, // Connect to company if provided
        user_roles: {
          connect: { id: roleId },
        },
      },
    });
  }

  static async getUserByEmail(email) {
    try {
      const user = await prisma.users.findUnique({
        where: { email: email },
        include: {
          user_roles: true, // Include the user role information
          companies: true, // Include the company information
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
      const user = await prisma.users.findUnique({
        where: { id: numericId },
        include: {
          user_roles: true, // Include the user role information
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }

  static async updateUser(id, updates) {
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new Error("Invalid user ID");
      }
      const user = await prisma.users.update({
        where: { id: numericId },
        data: updates,
        include: {
          user_roles: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }
}

module.exports = { UserModel };
