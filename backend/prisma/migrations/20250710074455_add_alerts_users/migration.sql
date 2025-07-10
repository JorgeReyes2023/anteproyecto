/*
  Warnings:

  - You are about to drop the column `is_read` on the `alerts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "alerts" DROP COLUMN "is_read";

-- CreateTable
CREATE TABLE "alerts_users" (
    "id" SERIAL NOT NULL,
    "alert_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),

    CONSTRAINT "alerts_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alerts_users_alert_id_user_id_key" ON "alerts_users"("alert_id", "user_id");

-- AddForeignKey
ALTER TABLE "alerts_users" ADD CONSTRAINT "alerts_users_alert_id_fkey" FOREIGN KEY ("alert_id") REFERENCES "alerts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts_users" ADD CONSTRAINT "alerts_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
