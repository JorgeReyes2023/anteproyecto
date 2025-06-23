/*
  Warnings:

  - The primary key for the `sensor_readings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `humidity` on the `sensor_readings` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `sensor_readings` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `sensor_readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `sensor_readings` table without a default value. This is not possible if the table is not empty.
  - Made the column `sensor_id` on table `sensor_readings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "sensor_readings" DROP CONSTRAINT "sensor_readings_sensor_id_fkey";

-- AlterTable
ALTER TABLE "sensor_readings" DROP CONSTRAINT "sensor_readings_pkey",
DROP COLUMN "humidity",
DROP COLUMN "temperature",
ADD COLUMN     "type_id" INTEGER NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "sensor_id" SET NOT NULL,
ADD CONSTRAINT "sensor_readings_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "sensor_reading_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "unit" VARCHAR(20) NOT NULL,

    CONSTRAINT "sensor_reading_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sensor_reading_types_name_key" ON "sensor_reading_types"("name");

-- CreateIndex
CREATE INDEX "sensor_readings_sensor_id_type_id_timestamp_idx" ON "sensor_readings"("sensor_id", "type_id", "timestamp");

-- AddForeignKey
ALTER TABLE "sensor_readings" ADD CONSTRAINT "sensor_readings_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_readings" ADD CONSTRAINT "sensor_readings_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "sensor_reading_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
