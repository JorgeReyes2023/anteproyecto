/*
  Warnings:

  - A unique constraint covering the columns `[name,unit]` on the table `sensor_reading_types` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "sensor_reading_types_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "sensor_reading_types_name_unit_key" ON "sensor_reading_types"("name", "unit");
