const { Router } = require('express');
const { UserService } = require('../services/user.service');

const userRoutes = Router();

// Ruta para crear un usuario
userRoutes.post('/register', async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRoutes;