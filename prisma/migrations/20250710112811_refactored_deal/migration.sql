/*
  Warnings:

  - You are about to drop the column `title` on the `Deal` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Deal` table. All the data in the column will be lost.
  - Added the required column `buyerPay` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payer` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerReceivable` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whoPays` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WhoPays" AS ENUM ('buyer', 'seller', 'equal');

-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "title",
DROP COLUMN "type",
ADD COLUMN     "buyerPay" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "payer" TEXT NOT NULL,
ADD COLUMN     "sellerReceivable" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "whoPays" "WhoPays" NOT NULL,
ALTER COLUMN "currency" SET DEFAULT 'lari';

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
