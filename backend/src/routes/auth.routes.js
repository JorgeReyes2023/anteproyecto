const { Router } = require("express");
const { AuthService } = require("../services/auth.service");

const authRoutes = Router();
// Ruta para registrar un nuevo usuario
authRoutes.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const user = await AuthService.register(name, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para iniciar sesión
authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const { user, token } = await AuthService.login(email, password);
    if (!token || !user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    res.status(200).json({ message: "Inicio de sesión exitoso", user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para verificar el token
authRoutes.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }
    const decoded = AuthService.verifyToken(token);
    res.status(200).json({ message: "Token válido", user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
});
module.exports = authRoutes;
