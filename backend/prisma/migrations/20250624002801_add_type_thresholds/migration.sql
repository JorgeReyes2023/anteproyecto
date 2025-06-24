/*
  Warnings:

  - Added the required column `type_id` to the `thresholds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "thresholds" ADD COLUMN     "type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "thresholds" ADD CONSTRAINT "thresholds_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "sensor_reading_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
