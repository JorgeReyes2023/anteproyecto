const prisma = require("../prisma");

class SensorReadingModel {
  // only reading
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
}
module.exports = { SensorReadingModel };
