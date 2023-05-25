/*
  Warnings:

  - A unique constraint covering the columns `[id,clientId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,providerId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Comment_id_clientId_idx" ON "Comment"("id", "clientId");

-- CreateIndex
CREATE INDEX "Comment_id_providerId_idx" ON "Comment"("id", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_clientId_key" ON "Comment"("id", "clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_providerId_key" ON "Comment"("id", "providerId");
