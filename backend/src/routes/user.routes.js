const { Router } = require("express");
const { UserService } = require("../services/user.service");
const { AuthService } = require("../services/auth.service");

const userRoutes = Router();

// Ruta para obtener todos los usuarios
userRoutes.get("/", async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un usuario por ID
userRoutes.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const user = await UserService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para actualizar un usuario
userRoutes.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    if (!userId || !updates) {
      return res
        .status(400)
        .json({ error: "User ID and updates are required" });
    }
    const updatedUser = await UserService.updateUser(userId, updates);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para eliminar un usuario
userRoutes.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const result = await UserService.deleteUser(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para update el password de un usuario
userRoutes.put("/:id/password", async (req, res) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({
        error: "User ID, current password and new password are required",
      });
    }

    const updatedUser = await UserService.changePassword(
      userId,
      currentPassword,
      newPassword,
    );

    res
      .status(200)
      .json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = userRoutes;
