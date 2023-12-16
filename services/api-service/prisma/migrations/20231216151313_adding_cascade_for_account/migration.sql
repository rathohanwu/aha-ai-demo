-- DropForeignKey
ALTER TABLE "AccountLogin" DROP CONSTRAINT "AccountLogin_accountId_fkey";

-- DropForeignKey
ALTER TABLE "AccountVerifyEmail" DROP CONSTRAINT "AccountVerifyEmail_accountId_fkey";

-- AddForeignKey
ALTER TABLE "AccountVerifyEmail" ADD CONSTRAINT "AccountVerifyEmail_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountLogin" ADD CONSTRAINT "AccountLogin_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
