const prisma = require('../prisma');

class UserModel {
  static async createUser(email, password, role) {
    return prisma.users.create({
      data: {
        email: email,
        password: password,
        user_roles: {
          connect: { name: role || 'user' }
        }
      }
    });
  }

  static async getUserByEmail(email) {
    try {
      const user = await prisma.users.findUnique({
        where: { email: email },
        });
        return user;
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }
}

module.exports = { UserModel };