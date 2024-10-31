/*
  Warnings:

  - Added the required column `servico_id` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'MARCADO',
    "dataHora" DATETIME,
    "valor" REAL,
    "comissao_profissional" REAL,
    "profissional_id" INTEGER NOT NULL,
    "servico_id" INTEGER NOT NULL,
    CONSTRAINT "Agendamento_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "Profissional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "Servico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agendamento" ("comissao_profissional", "dataHora", "id", "profissional_id", "status", "valor") SELECT "comissao_profissional", "dataHora", "id", "profissional_id", "status", "valor" FROM "Agendamento";
DROP TABLE "Agendamento";
ALTER TABLE "new_Agendamento" RENAME TO "Agendamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
