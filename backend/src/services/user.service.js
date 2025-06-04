const { UserModel } = require("../models/user.model");

class UserService {
  static async createUser(data) {
    try {
      const user = await UserModel.createUser(data);
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
  
  static async loginUser(email, password) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const user = await UserModel.getUserByEmail(email);
      console.log(user);
      if (user && user.password === password) {
        return user;
      }
      return null; // Credenciales inválidas
    } catch (error) {
      throw new Error(`Error logging in user: ${error.message}`);
    }
  }
}

module.exports = { UserService };