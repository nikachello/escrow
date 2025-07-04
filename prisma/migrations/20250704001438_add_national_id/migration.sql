/*
  Warnings:

  - A unique constraint covering the columns `[nationalId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nationalId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "nationalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_nationalId_key" ON "user"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");
