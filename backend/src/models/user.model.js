const prisma = require('../prisma');

class UserModel {
  static async createUser(data) {
    return prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        user_roles: {
          connect: { name: data.role || 'user' }
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