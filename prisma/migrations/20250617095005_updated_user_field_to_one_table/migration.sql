/*
  Warnings:

  - You are about to drop the `UserDetails` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[instituteMail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserDetails" DROP CONSTRAINT "UserDetails_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "college" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "instituteMail" TEXT,
ADD COLUMN     "interestFields" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "semester" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "UserDetails";

-- CreateIndex
CREATE UNIQUE INDEX "User_instituteMail_key" ON "User"("instituteMail");
