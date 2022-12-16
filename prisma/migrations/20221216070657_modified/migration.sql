-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetOTP" VARCHAR(255),
ADD COLUMN     "passwordResetOTPExpire" VARCHAR(255);
