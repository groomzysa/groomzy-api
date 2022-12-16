-- CreateEnum
CREATE TYPE "DayType" AS ENUM ('MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT', 'SUN');

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "businessProfileId" INTEGER NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperatingTime" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "day" "DayType" NOT NULL,
    "opens" VARCHAR(255) NOT NULL,
    "closes" VARCHAR(255) NOT NULL,
    "businessProfileId" INTEGER NOT NULL,

    CONSTRAINT "OperatingTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ServiceToStaff" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_businessProfileId_key" ON "Staff"("businessProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "OperatingTime_businessProfileId_key" ON "OperatingTime"("businessProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceToStaff_AB_unique" ON "_ServiceToStaff"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceToStaff_B_index" ON "_ServiceToStaff"("B");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_businessProfileId_fkey" FOREIGN KEY ("businessProfileId") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperatingTime" ADD CONSTRAINT "OperatingTime_businessProfileId_fkey" FOREIGN KEY ("businessProfileId") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToStaff" ADD CONSTRAINT "_ServiceToStaff_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToStaff" ADD CONSTRAINT "_ServiceToStaff_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
