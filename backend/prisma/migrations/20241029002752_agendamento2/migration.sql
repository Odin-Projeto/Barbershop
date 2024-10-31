/*
  Warnings:

  - You are about to drop the column `confirmado` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `hora` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `realizado` on the `Agendamento` table. All the data in the column will be lost.

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
    "servico_profissional_possui_id" INTEGER NOT NULL,
    CONSTRAINT "Agendamento_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "Profissional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_servico_profissional_possui_id_fkey" FOREIGN KEY ("servico_profissional_possui_id") REFERENCES "ServicoProfissionalPossui" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agendamento" ("comissao_profissional", "id", "profissional_id", "servico_profissional_possui_id", "valor") SELECT "comissao_profissional", "id", "profissional_id", "servico_profissional_possui_id", "valor" FROM "Agendamento";
DROP TABLE "Agendamento";
ALTER TABLE "new_Agendamento" RENAME TO "Agendamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
