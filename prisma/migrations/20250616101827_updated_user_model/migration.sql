/*
  Warnings:

  - A unique constraint covering the columns `[instituteMail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "instituteMail" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "User_instituteMail_key" ON "User"("instituteMail");
