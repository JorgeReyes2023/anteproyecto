const jwt = require("jsonwebtoken");
const { generateToken } = require("../src/services/token.service");

jest.mock("jsonwebtoken");

describe("TokenService", () => {
  describe("generateToken", () => {
    it("should generate a JWT with correct payload", () => {
      process.env.JWT_SECRET = "supersecret";
      process.env.JWT_EXPIRATION = "1h";

      const user = {
        id: 42,
        user_roles: { name: "admin" },
        email: "kaeli@example.com",
        company: "Test Inc",
      };

      jwt.sign.mockReturnValue("mockedToken");

      const token = generateToken({
        id: user.id,
        role: user.user_roles?.name || user.user_roles,
        email: user.email,
        company: user.company,
      });

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: 42,
          role: "admin",
          email: "kaeli@example.com",
          company: "Test Inc",
        },
        "supersecret",
        { expiresIn: "1h" },
      );

      expect(token).toBe("mockedToken");
    });
  });
});
