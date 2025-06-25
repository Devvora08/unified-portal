/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'GUIDE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';
