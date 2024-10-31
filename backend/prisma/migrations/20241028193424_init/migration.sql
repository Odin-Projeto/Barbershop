-- CreateTable
CREATE TABLE "Profissional" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "email" TEXT,
    "senha" TEXT,
    "telefone" TEXT,
    "admin" BOOLEAN
);

-- CreateTable
CREATE TABLE "Sistema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "msg_agendamento" TEXT,
    "logo_reduzido" BLOB,
    "logo" BLOB,
    "nome_empresa" TEXT
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "ServicoProfissionalPossui" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" REAL,
    "duracao" INTEGER,
    "porcentagem_comissao" REAL,
    "profissional_id" INTEGER NOT NULL,
    "servico_id" INTEGER NOT NULL,
    CONSTRAINT "ServicoProfissionalPossui_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "Profissional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ServicoProfissionalPossui_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "Servico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "realizado" BOOLEAN,
    "confirmado" BOOLEAN,
    "dia_semana" TEXT,
    "data" DATETIME,
    "inicio" DATETIME,
    "fim" DATETIME,
    "aberto" BOOLEAN,
    "valor" REAL,
    "comissao_profissional" REAL,
    "profissional_id" INTEGER NOT NULL,
    "servico_profissional_possui_id" INTEGER NOT NULL,
    CONSTRAINT "Agendamento_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "Profissional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_servico_profissional_possui_id_fkey" FOREIGN KEY ("servico_profissional_possui_id") REFERENCES "ServicoProfissionalPossui" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
