/*
  Warnings:

  - You are about to drop the column `galleryurl` on the `Gallery` table. All the data in the column will be lost.
  - Added the required column `galleryImageUrl` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "galleryurl",
ADD COLUMN     "galleryImageUrl" VARCHAR(255) NOT NULL;
