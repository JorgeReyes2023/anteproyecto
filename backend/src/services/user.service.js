const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");

class UserService {
 
  static async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }
  }

  static async loginUser(email, password) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const user = await UserModel.getUserByEmail(email);
      console.log(user);
      if (user && this.checkPassword(password, user.password)) {
        return user;
      }
      return null; // Credenciales inválidas
    } catch (error) {
      throw new Error(`Error logging in user: ${error.message}`);
    }
  }

  static async checkPassword(password, hashedPassword) {
    try {
      console.log("Checking password:", password, hashedPassword);
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error(`Error checking password: ${error.message}`);
    }
  }

  static async createUser(username, email, password, role = "user") {
    try {
      console.log("Creating user en el servicio:", username, email, role);
      const hashedPassword = await this.hashPassword(password);
      const user = await UserModel.createUser( username, email, hashedPassword, role );
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
}

module.exports = { UserService };