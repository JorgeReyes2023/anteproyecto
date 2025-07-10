const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const companyRoutes = require("./routes/company.routes");
const projectRoutes = require("./routes/project.routes");
const nodeRoutes = require("./routes/node.routes");
const alertRoutes = require("./routes/alert.routes");
const sensorRoutes = require("./routes/sensor.routes");
const thresholdRoutes = require("./routes/threshold.routes");

dotenv.config();

const clients = []; // clients SSE conectados

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/docs", express.static(path.join(__dirname, "..", "docs")));
app.use("/coverage", express.static(path.join(__dirname, "..", "coverage")));

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

app.get("/sse/alerts", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  clients.push(res);
  console.log("Cliente SSE conectado");

  req.on("close", () => {
    console.log("Cliente SSE desconectado");
    clients.splice(clients.indexOf(res), 1);
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

function broadcastAlert(alert) {
  const data = `data: ${JSON.stringify(alert)}\n\n`;
  clients.forEach((client) => client.write(data));
}

module.exports = { app, broadcastAlert };
