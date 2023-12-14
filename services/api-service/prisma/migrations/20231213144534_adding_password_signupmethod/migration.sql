/*
  Warnings:

  - You are about to drop the column `isVerified` on the `Account` table. All the data in the column will be lost.
  - Added the required column `signUpMethod` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SignUpMethod" AS ENUM ('GOOGLE', 'USERPASSWORD');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "isVerified",
ADD COLUMN     "signUpMethod" "SignUpMethod" NOT NULL,
ALTER COLUMN "signUpTime" SET DEFAULT CURRENT_TIMESTAMP;
