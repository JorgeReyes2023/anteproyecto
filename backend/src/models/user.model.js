const prisma = require('../prisma');

class UserModel {
  static async createUser(data) {
    try {
      const user = await prisma.users.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password, // Asegúrate de hashear la contraseña antes de guardarla
          
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }
}

module.exports = UserModel;