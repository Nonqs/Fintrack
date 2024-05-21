/*
  Warnings:

  - You are about to drop the `Accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpensesType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Incomes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountsToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExpensesTypeToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IncomeTypeToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `IncomeType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AccountsToUser_B_index";

-- DropIndex
DROP INDEX "_AccountsToUser_AB_unique";

-- DropIndex
DROP INDEX "_ExpensesTypeToUser_B_index";

-- DropIndex
DROP INDEX "_ExpensesTypeToUser_AB_unique";

-- DropIndex
DROP INDEX "_IncomeTypeToUser_B_index";

-- DropIndex
DROP INDEX "_IncomeTypeToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Accounts";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Expenses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExpensesType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Incomes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AccountsToUser";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ExpensesTypeToUser";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_IncomeTypeToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cash" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExpenseType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ExpenseType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "incomeTypeId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "Income_incomeTypeId_fkey" FOREIGN KEY ("incomeTypeId") REFERENCES "IncomeType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Income_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expensesTypeId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "Expense_expensesTypeId_fkey" FOREIGN KEY ("expensesTypeId") REFERENCES "ExpenseType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IncomeType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "IncomeType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_IncomeType" ("icon", "id", "name") SELECT "icon", "id", "name" FROM "IncomeType";
DROP TABLE "IncomeType";
ALTER TABLE "new_IncomeType" RENAME TO "IncomeType";
PRAGMA foreign_key_check("IncomeType");
PRAGMA foreign_keys=ON;
