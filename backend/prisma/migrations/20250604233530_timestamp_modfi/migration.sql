/*
  Warnings:

  - The primary key for the `sensor_readings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `timestamp` on table `sensor_readings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "sensor_readings" DROP CONSTRAINT "sensor_readings_pkey",
ALTER COLUMN "timestamp" SET NOT NULL,
ADD CONSTRAINT "sensor_readings_pkey" PRIMARY KEY ("id", "timestamp");
