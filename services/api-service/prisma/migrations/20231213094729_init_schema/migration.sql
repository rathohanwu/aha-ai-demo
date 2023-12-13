-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "signUpTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountVerifyEmail" (
    "id" SERIAL NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "AccountVerifyEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountLogin" (
    "id" SERIAL NOT NULL,
    "logonTime" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "AccountLogin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "AccountVerifyEmail" ADD CONSTRAINT "AccountVerifyEmail_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountLogin" ADD CONSTRAINT "AccountLogin_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
