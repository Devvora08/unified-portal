-- AlterTable
ALTER TABLE "User" ADD COLUMN     "college" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "interestFields" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "semester" INTEGER NOT NULL DEFAULT 0;
