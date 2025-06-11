const { UserModel } = require("../models/user.model");
const {Bcrypt} = require("bcryptjs");

class UserService {
  static async createUser(data) {
    try {
      const user = await UserModel.createUser(data);
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
  
  static async hashPassword(password) {
    try {
      const salt = await Bcrypt.genSalt(10);
      const hashedPassword = await Bcrypt.hash(password, salt);
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
      const isMatch = await Bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error(`Error checking password: ${error.message}`);
    }
  }

  static async createUser(email, password) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const hashedPassword = await this.hashPassword(password);
      const user = await UserModel.createUser({ email, password: hashedPassword });
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
}

module.exports = { UserService };