const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { authRoutes } = require("./routes/auth.routes.js");
const { userRoutes } = require("./routes/user.routes.js");
const { companyRoutes } = require("./routes/company.routes.js");
const { projectRoutes } = require("./routes/project.routes.js");
const { nodeRoutes } = require("./routes/node.routes.js");
const { alertRoutes } = require("./routes/alert.routes.js");
const { sensorRoutes } = require("./routes/sensor.routes.js");
const { thresholdRoutes } = require("./routes/threshold.routes.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/nodes", nodeRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/thresholds", thresholdRoutes);

// Manejo de errores
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal" });
});
// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
