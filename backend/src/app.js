const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {userRoutes} = require('./routes/user.routes.js');
const {companyRoutes} = require('./routes/company.routes.js');
const {projectRoutes} = require('./routes/project.routes.js');
const {nodeRoutes} = require('./routes/node.routes.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/nodes', nodeRoutes);
// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal' });
});
// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
