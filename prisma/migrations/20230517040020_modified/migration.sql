-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "streetNumber" SET DATA TYPE TEXT,
ALTER COLUMN "streetName" SET DATA TYPE TEXT,
ALTER COLUMN "town" SET DATA TYPE TEXT,
ALTER COLUMN "city" SET DATA TYPE TEXT,
ALTER COLUMN "province" SET DATA TYPE TEXT,
ALTER COLUMN "areaCode" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Gallery" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "galleryImageUrl" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OperatingTime" ALTER COLUMN "opens" SET DATA TYPE TEXT,
ALTER COLUMN "closes" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "logoUrl" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "tradingName" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Social" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "username" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "firstName" SET DATA TYPE TEXT,
ALTER COLUMN "lastName" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET DATA TYPE TEXT,
ALTER COLUMN "lastName" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "userImageUrl" SET DATA TYPE TEXT,
ALTER COLUMN "passwordResetOTP" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "providerId" INTEGER NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderLike" (
    "providerId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "ProviderLike_pkey" PRIMARY KEY ("providerId","commentId")
);

-- CreateTable
CREATE TABLE "ClientLike" (
    "clientId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "ClientLike_pkey" PRIMARY KEY ("clientId","commentId")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderLike" ADD CONSTRAINT "ProviderLike_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderLike" ADD CONSTRAINT "ProviderLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientLike" ADD CONSTRAINT "ClientLike_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientLike" ADD CONSTRAINT "ClientLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
