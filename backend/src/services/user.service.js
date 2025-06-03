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

  static async getUserByEmail(email) {
    try {
      const user = await UserModel.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }
}

module.exports = { UserService };