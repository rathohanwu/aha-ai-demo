/*
  Warnings:

  - Added the required column `code` to the `AccountVerifyEmail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountVerifyEmail" ADD COLUMN     "code" TEXT NOT NULL;
