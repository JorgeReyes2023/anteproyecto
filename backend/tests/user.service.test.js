const { UserService } = require("../src/services/user.service");
const { UserModel } = require("../src/models/user.model");
const { RoleModel } = require("../src/models/role.model");
const { CompanyModel } = require("../src/models/company.model");
const bcrypt = require("bcryptjs");

jest.mock("../src/models/user.model");
jest.mock("../src/models/role.model");
jest.mock("../src/models/company.model");
jest.mock("bcryptjs");

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return a formatted list of users", async () => {
      UserModel.getAllUsers.mockResolvedValue([
        {
          id: 1,
          name: "Kaeli",
          email: "kaeli@example.com",
          user_roles: { name: "admin" },
          companies: { name: "TechCorp" },
        },
      ]);

      const result = await UserService.getAllUsers();
      expect(result).toEqual([
        {
          id: 1,
          name: "Kaeli",
          email: "kaeli@example.com",
          role: "admin",
          company: "TechCorp",
        },
      ]);
    });

    it("should throw error if something goes wrong", async () => {
      UserModel.getAllUsers.mockRejectedValue(new Error("DB failure"));
      await expect(UserService.getAllUsers()).rejects.toThrow(
        "Error fetching users: DB failure",
      );
    });
  });

  describe("getUserById", () => {
    it("should return user if found", async () => {
      UserModel.getUserById.mockResolvedValue({ id: 1, name: "Kaeli" });
      const result = await UserService.getUserById(1);
      expect(result).toEqual({ id: 1, name: "Kaeli" });
    });

    it("should throw if id is missing", async () => {
      await expect(UserService.getUserById(null)).rejects.toThrow(
        "User ID is required",
      );
    });

    it("should throw if user not found", async () => {
      UserModel.getUserById.mockResolvedValue(null);
      await expect(UserService.getUserById(99)).rejects.toThrow(
        "User not found",
      );
    });
  });

  describe("changePassword", () => {
    it("should change password successfully", async () => {
      const mockUser = {
        id: 1,
        name: "Kaeli",
        email: "kaeli@example.com",
        password: "hashed",
        user_roles: { name: "admin" },
      };
      UserModel.getUserById.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("newHashed");
      UserModel.updateUser.mockResolvedValue({
        ...mockUser,
        password: "newHashed",
      });

      const result = await UserService.changePassword(
        1,
        "oldPassword",
        "newPassword",
      );

      expect(result).toEqual({
        message: "Password changed successfully",
        user: {
          id: 1,
          name: "Kaeli",
          email: "kaeli@example.com",
          role: "admin",
        },
      });

      expect(bcrypt.compare).toHaveBeenCalledWith("oldPassword", "hashed");
    });

    it("should throw if passwords do not match", async () => {
      UserModel.getUserById.mockResolvedValue({ password: "hashed" });
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        UserService.changePassword(1, "wrong", "new"),
      ).rejects.toThrow("Old password is incorrect");
    });
  });
});
