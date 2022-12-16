/*
  Warnings:

  - You are about to drop the column `businessProfileId` on the `OperatingTime` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `businessProfileId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the `BusinessProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `providerId` to the `OperatingTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradingName` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessProfile" DROP CONSTRAINT "BusinessProfile_addressId_fkey";

-- DropForeignKey
ALTER TABLE "OperatingTime" DROP CONSTRAINT "OperatingTime_businessProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_businessProfileId_fkey";

-- DropIndex
DROP INDEX "OperatingTime_businessProfileId_key";

-- DropIndex
DROP INDEX "Provider_profileId_key";

-- DropIndex
DROP INDEX "Staff_businessProfileId_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "providerId" INTEGER;

-- AlterTable
ALTER TABLE "OperatingTime" DROP COLUMN "businessProfileId",
ADD COLUMN     "providerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "profileId",
ADD COLUMN     "logoUrl" VARCHAR(255),
ADD COLUMN     "phone" VARCHAR(255) NOT NULL,
ADD COLUMN     "tradingName" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "businessProfileId",
ADD COLUMN     "providerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "BusinessProfile";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperatingTime" ADD CONSTRAINT "OperatingTime_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
