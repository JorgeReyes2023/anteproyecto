const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");

class UserService {
  static async getUserById(id) {
    try {
      if (!id) {
        throw new Error("User ID is required");
      }
      const user = await UserModel.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }
  static async getUserByEmail(email) {
    try {
      if (!email) {
        throw new Error("Email is required");
      }
      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }
  static async updateUser(id, updates) {
    try {
      if (!id || !updates) {
        throw new Error("User ID and updates are required");
      }
      const user = await UserModel.updateUser(id, updates);
      if (!user) {
        throw new Error("User not found or update failed");
      }
      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }
  static async deleteUser(id) {
    try {
      if (!id) {
        throw new Error("User ID is required");
      }
      const result = await UserModel.deleteUser(id);
      if (!result) {
        throw new Error("User not found or deletion failed");
      }
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
  static async changePassword(id, currentPassword, newPassword) {
    try {
      if (!id || !currentPassword || !newPassword) {
        throw new Error(
          "User ID, current password, and new password are required",
        );
      }
      const user = await UserModel.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        throw new Error("Old password is incorrect");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      const updatedUser = await UserModel.updateUser(id, {
        password: hashedNewPassword,
      });

      return {
        message: "Password changed successfully",
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.user_roles.name, // Assuming user_roles is included in the model
        },
      };
    } catch (error) {
      throw new Error(`Error changing password: ${error.message}`);
    }
  }
}

module.exports = { UserService };
