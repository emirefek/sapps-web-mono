/*
  Warnings:

  - You are about to drop the column `co` on the `StationData` table. All the data in the column will be lost.
  - You are about to drop the column `co2` on the `StationData` table. All the data in the column will be lost.
  - You are about to drop the column `no2` on the `StationData` table. All the data in the column will be lost.
  - Added the required column `airq` to the `StationData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humidity` to the `StationData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temp` to the `StationData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StationData" DROP COLUMN "co",
DROP COLUMN "co2",
DROP COLUMN "no2",
ADD COLUMN     "airq" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "humidity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "temp" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
