const { Router } = require('express');
const { UserService } = require('../services/user.service');

const userRoutes = Router();

// Ruta para crear un usuario
userRoutes.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    const user = await UserService.createUser(username, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Ruta login
userRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await UserService.loginUser(email, password);
        
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRoutes;