CREATE TABLE "Endereco"(
    "codEndereco" CHAR(36) PRIMARY KEY,
    "numero" INT NOT NULL,
    "cidade" VARCHAR(255) NOT NULL,
    "cep" CHAR(9) NOT NULL,
    "estado" VARCHAR(29) NOT NULL,
    "rua" VARCHAR(255) NOT NULL
);

CREATE TABLE "CategoriaLoja"(
    "codCategoria" CHAR(36) PRIMARY KEY,
    "categoria" VARCHAR(255) NOT NULL
);

CREATE TABLE "CategoriaProduto"(
    "codCategoria" CHAR(36) PRIMARY KEY,
    "categoria" VARCHAR(255) NOT NULL
);

CREATE TABLE "Loja"(
    "codLoja" CHAR(36) PRIMARY KEY,
    "codCategoria" INT NOT NULL,
    "codEndereco" INT NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(63) NOT NULL
);

ALTER TABLE "Loja" ADD CONSTRAINT "Loja_codCategoria_fkey" FOREIGN KEY ("codCategoria") REFERENCES "CategoriaLoja"("codCategoria");

ALTER TABLE "Loja" ADD CONSTRAINT "Loja_codEndereco_fkey" FOREIGN KEY ("codEndereco") REFERENCES "Endereco"("codEndereco");

CREATE TABLE "Gestor"(
    "codGestor" CHAR(36) PRIMARY KEY,
    "codLoja" INT NOT NULL,
    "funcao" VARCHAR(63) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" CHAR(14) NOT NULL,
    "numeroTelefone" CHAR(16) NOT NULL
);

ALTER TABLE "Gestor" ADD CONSTRAINT "Gestor_codLoja_fkey" FOREIGN KEY ("codLoja") REFERENCES "Loja"("codLoja");

CREATE TABLE "Produto"(
    "codProduto" CHAR(36) PRIMARY KEY,
    "codCategoria" INT NOT NULL,
    "nome" VARCHAR(63) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL
);

ALTER TABLE "Produto" ADD CONSTRAINT "Produto_codCategoria_fkey" FOREIGN KEY ("codCategoria") REFERENCES "CategoriaProduto"("codCategoria");

CREATE TABLE "ProdutoLoja"(
    "codProduto" CHAR(36),
    "codLoja" CHAR(36),
    "quantidade" INT DEFAULT 0,
    "preco" NUMERIC NOT NULL,
    PRIMARY KEY ("codProduto", "codLoja")
);

ALTER TABLE "ProdutoLoja" ADD CONSTRAINT "ProdutoLoja_codProduto_fkey" FOREIGN KEY ("codProduto") REFERENCES "Produto"("codProduto");

ALTER TABLE "ProdutoLoja" ADD CONSTRAINT "ProdutoLoja_codLoja_fkey" FOREIGN KEY ("codLoja") REFERENCES "Loja"("codLoja");

CREATE TABLE "Cliente"(
    "codCliente" CHAR(36) PRIMARY KEY,
    "codEndereco" INT NOT NULL,
    "nome" VARCHAR(63) NOT NULL,
    "email" VARCHAR(255) NOT NULL
);

ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_codEndereco_fkey" FOREIGN KEY ("codEndereco") REFERENCES "Endereco"("codEndereco");

CREATE TABLE "Compra"(
    "codCompra" CHAR(36) PRIMARY KEY,
    "codEndereco" INT NOT NULL,
    "codCliente" INT NOT NULL,
    "codProduto" INT NOT NULL,
    "data" TIMESTAMP DEFAULT NOW(),
    "valor" NUMERIC NOT NULL,
    "quantidade" INT NOT NULL
);

ALTER TABLE "Compra" ADD CONSTRAINT "Compra_codEndereco_fkey" FOREIGN KEY ("codEndereco") REFERENCES "Endereco"("codEndereco");

ALTER TABLE "Compra" ADD CONSTRAINT "Compra_codCliente_fkey" FOREIGN KEY ("codCliente") REFERENCES "Cliente"("codCliente");

ALTER TABLE "Compra" ADD CONSTRAINT "Compra_codProduto_fkey" FOREIGN KEY ("codProduto") REFERENCES "Produto"("codProduto");
