/*
  Warnings:

  - You are about to drop the column `acitveTime` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "acitveTime",
ADD COLUMN     "activeTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
