-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('buyer', 'seller');

-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "creatorRole" "UserRole";
