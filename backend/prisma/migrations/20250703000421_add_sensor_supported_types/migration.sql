-- CreateTable
CREATE TABLE "sensor_supported_types" (
    "sensor_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,

    CONSTRAINT "sensor_supported_types_pkey" PRIMARY KEY ("sensor_id","type_id")
);

-- AddForeignKey
ALTER TABLE "sensor_supported_types" ADD CONSTRAINT "sensor_supported_types_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_supported_types" ADD CONSTRAINT "sensor_supported_types_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "sensor_reading_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
