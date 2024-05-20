-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cash" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "IncomeType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExpensesType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Incomes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "incomeTypeId" INTEGER NOT NULL,
    "accountsId" INTEGER NOT NULL,
    CONSTRAINT "Incomes_incomeTypeId_fkey" FOREIGN KEY ("incomeTypeId") REFERENCES "IncomeType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Incomes_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Expenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expensesTypeId" INTEGER NOT NULL,
    "accountsId" INTEGER NOT NULL,
    CONSTRAINT "Expenses_expensesTypeId_fkey" FOREIGN KEY ("expensesTypeId") REFERENCES "ExpensesType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expenses_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AccountsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AccountsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AccountsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_IncomeTypeToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_IncomeTypeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "IncomeType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_IncomeTypeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ExpensesTypeToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ExpensesTypeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ExpensesType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ExpensesTypeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountsToUser_AB_unique" ON "_AccountsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountsToUser_B_index" ON "_AccountsToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IncomeTypeToUser_AB_unique" ON "_IncomeTypeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_IncomeTypeToUser_B_index" ON "_IncomeTypeToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExpensesTypeToUser_AB_unique" ON "_ExpensesTypeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpensesTypeToUser_B_index" ON "_ExpensesTypeToUser"("B");
