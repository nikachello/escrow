/*
  Warnings:

  - The `status` column on the `Deal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DEAL_STATUS" AS ENUM ('pending', 'agreed', 'paid', 'shipped', 'delivered', 'ispectionStarted', 'completed', 'disputed');

-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "status",
ADD COLUMN     "status" "DEAL_STATUS" NOT NULL DEFAULT 'pending';

-- DropEnum
DROP TYPE "DealStatus";
