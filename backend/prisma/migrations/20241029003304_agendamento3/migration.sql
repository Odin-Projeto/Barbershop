/*
  Warnings:

  - You are about to drop the `ServicoProfissionalPossui` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `servico_profissional_possui_id` on the `Agendamento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Servico" ADD COLUMN "duracao" INTEGER;
ALTER TABLE "Servico" ADD COLUMN "porcentagem_comissao" REAL;
ALTER TABLE "Servico" ADD COLUMN "valor" REAL;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ServicoProfissionalPossui";
PRAGMA foreign_keys=on;

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
    CONSTRAINT "Agendamento_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "Profissional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agendamento" ("comissao_profissional", "dataHora", "id", "profissional_id", "status", "valor") SELECT "comissao_profissional", "dataHora", "id", "profissional_id", "status", "valor" FROM "Agendamento";
DROP TABLE "Agendamento";
ALTER TABLE "new_Agendamento" RENAME TO "Agendamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
