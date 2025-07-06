const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const companyRoutes = require("./routes/company.routes");
const projectRoutes = require("./routes/project.routes");
const nodeRoutes = require("./routes/node.routes");
const alertRoutes = require("./routes/alert.routes");
const sensorRoutes = require("./routes/sensor.routes");
const thresholdRoutes = require("./routes/threshold.routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal" });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
