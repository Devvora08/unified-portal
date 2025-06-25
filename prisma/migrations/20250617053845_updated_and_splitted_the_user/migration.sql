/*
  Warnings:

  - You are about to drop the column `college` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `instituteMail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `interestFields` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_instituteMail_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "college",
DROP COLUMN "instituteMail",
DROP COLUMN "interestFields",
DROP COLUMN "semester";

-- CreateTable
CREATE TABLE "UserDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "instituteMail" TEXT,
    "college" TEXT NOT NULL DEFAULT '',
    "semester" INTEGER NOT NULL DEFAULT 0,
    "interestFields" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_instituteMail_key" ON "UserDetails"("instituteMail");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
