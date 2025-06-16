const prisma = require("../prisma");

class UserModel {
  static async createUser(username, email, password, role) {
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
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }
}

module.exports = { UserModel };
