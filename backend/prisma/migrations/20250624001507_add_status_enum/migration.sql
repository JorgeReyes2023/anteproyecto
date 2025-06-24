/*
  Warnings:

  - You are about to drop the `sensor_types` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `sensors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type_id` to the `sensor_readings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'ERROR');

-- DropForeignKey
ALTER TABLE "sensors" DROP CONSTRAINT "sensors_type_id_fkey";

-- DropIndex
DROP INDEX "sensor_readings_sensor_id_timestamp_idx";

-- AlterTable
ALTER TABLE "nodes" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "sensor_readings" ADD COLUMN     "type_id" INTEGER NOT NULL,
ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "sensors" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "sensor_types";

-- CreateTable
CREATE TABLE "sensor_reading_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "sensor_reading_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sensor_reading_types_name_key" ON "sensor_reading_types"("name");

-- CreateIndex
CREATE INDEX "sensor_readings_sensor_id_type_id_timestamp_idx" ON "sensor_readings"("sensor_id", "type_id", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "sensors_name_key" ON "sensors"("name");

-- AddForeignKey
ALTER TABLE "sensor_readings" ADD CONSTRAINT "sensor_readings_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "sensor_reading_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
