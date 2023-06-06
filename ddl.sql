CREATE TABLE "Endereco"(
    "codEndereco" SERIAL PRIMARY KEY,
    "numero" INT NOT NULL,
    "cidade" VARCHAR(63) NOT NULL,
    "cep" CHAR(9) NOT NULL,
    "estado" VARCHAR(29) NOT NULL,
    "rua" VARCHAR(255) NOT NULL
);

CREATE TABLE "CategoriaLoja"(
    "codCategoria" SERIAL PRIMARY KEY,
    "categoria" VARCHAR(31) NOT NULL
);

CREATE TABLE "CategoriaProduto"(
    "codCategoria" SERIAL PRIMARY KEY,
    "categoria" VARCHAR(31) NOT NULL
);

CREATE TABLE "Loja"(
    "codLoja" SERIAL PRIMARY KEY,
    "codEndereco" INT NOT NULL,
    "codCategoria" INT NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(63) NOT NULL,
    FOREIGN KEY "codEndereco" REFERENCES "Endereco"("codEndereco"),
    FOREIGN KEY "codCategoria" REFERENCES "CategoriaLoja"("codCategoria")
);

CREATE TABLE "Gestor"(
    "codGestor" SERIAL PRIMARY KEY,
    "codLoja" INT NOT NULL,
    "funcao" VARCHAR(31) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" CHAR(14) NOT NULL,
    "numeroTelefone" CHAR(12) NOT NULL,
    FOREIGN KEY "codLoja" REFERENCES "Loja"("codLoja")
);

CREATE TABLE "Produto"(
    "codProduto" SERIAL PRIMARY KEY,
    "codCategoria" INT NOT NULL,
    "nome" VARCHAR(63) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    FOREIGN KEY "codCategoria" REFERENCES "CategoriaProduto"("codCategoria")
);