const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const { createClient } = require("redis");

const healthRoutes = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Vérification de l'état du système
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Système en bonne santé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "healthy"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 services:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: string
 *                       example: "connected"
 *                     redis:
 *                       type: string
 *                       example: "connected"
 *       503:
 *         description: Problème avec un ou plusieurs services
 */
healthRoutes.get("/health", async (req, res) => {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      database: "disconnected",
      redis: "disconnected",
    },
  };

  let isHealthy = true;

  // Vérifier la base de données
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = "connected";
  } catch {
    health.services.database = "error";
    isHealthy = false;
  }

  // Vérifier Redis
  try {
    const redisClient = createClient({
      url: process.env.REDIS_URL,
    });
    await redisClient.connect();
    await redisClient.ping();
    health.services.redis = "connected";
    await redisClient.quit();
  } catch {
    health.services.redis = "error";
    isHealthy = false;
  }

  if (!isHealthy) {
    health.status = "unhealthy";
    return res.status(503).json(health);
  }

  res.status(200).json(health);
});

module.exports = healthRoutes;
