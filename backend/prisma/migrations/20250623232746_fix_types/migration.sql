/*
  Warnings:

  - You are about to drop the column `type_id` on the `sensor_readings` table. All the data in the column will be lost.
  - You are about to drop the `sensor_reading_types` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `sensor_id` on table `thresholds` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "sensor_readings" DROP CONSTRAINT "sensor_readings_type_id_fkey";

-- DropIndex
DROP INDEX "sensor_readings_sensor_id_type_id_timestamp_idx";

-- AlterTable
ALTER TABLE "sensor_readings" DROP COLUMN "type_id";

-- AlterTable
ALTER TABLE "thresholds" ALTER COLUMN "sensor_id" SET NOT NULL;

-- DropTable
DROP TABLE "sensor_reading_types";

-- CreateIndex
CREATE INDEX "sensor_readings_sensor_id_timestamp_idx" ON "sensor_readings"("sensor_id", "timestamp");
