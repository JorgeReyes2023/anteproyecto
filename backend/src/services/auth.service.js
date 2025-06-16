const { generateToken, verifyToken } = require("./token.service");
const bcrypt = require("bcryptjs");

const { UserModel } = require("../models/user.model");

class AuthService {
  static async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }
  }

  static async checkPassword(password, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error(`Error checking password: ${error.message}`);
    }
  }

  static async login(email, password) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const user = await UserModel.getUserByEmail(email);
      if (!user || !this.checkPassword(password, user.password)) {
        throw new Error("Invalid email or password");
      }

      const userDto = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.user_roles.name,
      };

      // generar token
      const token = generateToken({
        id: user.id,
        role: user.role,
        email: user.email,
      });

      return { user: userDto, token };
    } catch (error) {
      throw new Error(`Error logging in user: ${error.message}`);
    }
  }

  static async register(username, email, password, role = "user") {
    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await UserModel.createUser(
        username,
        email,
        hashedPassword,
        role,
      );
      const token = generateToken({
        id: user.id,
        role: user.role,
        email: user.email,
      });
      return { user, token };
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  static async verifyToken(token) {
    try {
      return verifyToken(token);
    } catch (error) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }
}
module.exports = { AuthService };
