-- RedefineTables
PRAGMA foreign_keys=OFF;

-- Crear nueva tabla 'new_Income' con la nueva columna 'userId'
CREATE TABLE "new_Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "incomeTypeId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Income_incomeTypeId_fkey" FOREIGN KEY ("incomeTypeId") REFERENCES "IncomeType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Income_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Copiar datos existentes a 'new_Income'
INSERT INTO "new_Income" ("accountId", "amount", "date", "id", "incomeTypeId", "userId")
SELECT "accountId", "amount", "date", "id", "incomeTypeId", 1 FROM "Income";

-- Eliminar la tabla original 'Income'
DROP TABLE "Income";

-- Renombrar 'new_Income' a 'Income'
ALTER TABLE "new_Income" RENAME TO "Income";

-- Crear nueva tabla 'new_Expense' con la nueva columna 'userId'
CREATE TABLE "new_Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expensesTypeId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Expense_expensesTypeId_fkey" FOREIGN KEY ("expensesTypeId") REFERENCES "ExpenseType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Copiar datos existentes a 'new_Expense'
INSERT INTO "new_Expense" ("accountId", "amount", "date", "expensesTypeId", "id", "userId")
SELECT "accountId", "amount", "date", "expensesTypeId", "id", 1 FROM "Expense";

-- Eliminar la tabla original 'Expense'
DROP TABLE "Expense";

-- Renombrar 'new_Expense' a 'Expense'
ALTER TABLE "new_Expense" RENAME TO "Expense";

-- Verificar claves foráneas
PRAGMA foreign_key_check("Income");
PRAGMA foreign_key_check("Expense");

PRAGMA foreign_keys=ON;
