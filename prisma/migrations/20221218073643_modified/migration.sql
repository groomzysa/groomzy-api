/*
  Warnings:

  - You are about to drop the column `url` on the `Social` table. All the data in the column will be lost.
  - Added the required column `username` to the `Social` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Social" DROP COLUMN "url",
ADD COLUMN     "username" VARCHAR(255) NOT NULL;
