const prisma = require("../prisma");

class SensorReadingModel {
  // only reading - old one
  static async fetchSensorReadings(sensorId, startDate, endDate) {
    const readings = await prisma.sensor_readings.findMany({
      where: {
        sensor_id: sensorId,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { timestamp: "desc" },
    });
    return readings;
  }

  // aggregated readings
  static async getSensorAggregated(sensorId, interval) {
    const groupBy =
      interval === "hour"
        ? "DATE_TRUNC('hour', timestamp)"
        : "DATE_TRUNC('minute', timestamp)";

    const result = await prisma.$queryRawUnsafe(
      `
    SELECT
      ${groupBy} AS time_group,
      AVG(temperature) AS avg_temp,
      AVG(humidity) AS avg_humidity
    FROM sensor_readings
    WHERE sensor_id = $1
      AND timestamp >= NOW() - INTERVAL '24 hours'
    GROUP BY time_group
    ORDER BY time_group ASC;
    `,
      sensorId,
    );

    return result;
  }
}
module.exports = { SensorReadingModel };
