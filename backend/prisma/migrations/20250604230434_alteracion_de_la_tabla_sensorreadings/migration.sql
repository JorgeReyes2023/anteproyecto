/*
  Warnings:

  - You are about to drop the column `value` on the `sensor_readings` table. All the data in the column will be lost.
  - Added the required column `humidity` to the `sensor_readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature` to the `sensor_readings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sensor_readings" DROP COLUMN "value",
ADD COLUMN     "humidity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "temperature" DOUBLE PRECISION NOT NULL;
