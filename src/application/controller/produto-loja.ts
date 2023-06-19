import { Pool } from 'pg';

type CreateArgs = {
  codLoja: string;
  codProduto: string;
  preco: number;
  quantidade: number;
};

type UpdateArgs = {
  codLoja: string;
  codProduto: string;
  preco: number;
  quantidade: number;
};

type RetrieveArgs = {
  codLoja: string;
  codProduto?: string;
};

type DeleteArgs = {
  codLoja: string;
  codProduto: string;
};

type ComposedProdutoResult = {
  codProduto: string;
  codLoja: string;
  preco: number;
  quantidade: number;
  nome: string;
  descricao: string;
};

export default class ProdutoLojaController {
  constructor(private databaseConnPool: Pool) {}

  async create({
    codLoja,
    codProduto,
    preco,
    quantidade,
  }: CreateArgs): Promise<void> {
    await this.databaseConnPool.query(
      'INSERT INTO "ProdutoLoja"("codProduto","codLoja","preco","quantidade") VALUES($1,$2,$3,$4)',
      [codProduto, codLoja, preco, quantidade]
    );
  }

  async update({
    codLoja,
    codProduto,
    preco,
    quantidade,
  }: UpdateArgs): Promise<void> {
    await this.databaseConnPool.query(
      'UPDATE "ProdutoLoja" SET "preco"=$1, "quantidade"=$2 WHERE "codLoja"=$3 AND "codProduto"=$4',
      [preco, quantidade, codLoja, codProduto]
    );
  }

  async delete({ codProduto, codLoja }: DeleteArgs): Promise<void> {
    await this.databaseConnPool.query(
      'DELETE FROM "ProdutoLoja" WHERE "codProduto"=$1 AND "codLoja"=$2',
      [codProduto, codLoja]
    );
  }

  async retrieve({
    codLoja,
    codProduto,
  }: RetrieveArgs): Promise<ComposedProdutoResult | ComposedProdutoResult[]> {
    if (codProduto) return this.getOne(codProduto, codLoja);
    return this.getAll(codLoja);
  }

  private async getOne(
    codProduto: string,
    codLoja: string
  ): Promise<ComposedProdutoResult> {
    const { rows: produtos } =
      await this.databaseConnPool.query<ComposedProdutoResult>(
        `
            SELECT
                "ProdutoLoja"."codProduto",
                "ProdutoLoja"."codLoja",
                "preco",
                "quantidade",
                "nome",
                "descricao"
            FROM
                "ProdutoLoja"
            LEFT JOIN
                "Produto"
            ON
                "Produto"."codProduto"="ProdutoLoja"."codProduto"
            WHERE
                "ProdutoLoja"."codProduto"=$1
            AND
                "ProdutoLoja"."codLoja"=$2
      `,
        [codProduto, codLoja]
      );
    if (produtos.length === 0) throw new Error(`Produto ${produtos} not found`);
    return produtos[0];
  }

  private async getAll(codLoja: string): Promise<ComposedProdutoResult[]> {
    const { rows: produtos } =
      await this.databaseConnPool.query<ComposedProdutoResult>(
        `
        SELECT
            "ProdutoLoja"."codProduto",
            "ProdutoLoja"."codLoja",
            "preco",
            "quantidade",
            "nome",
            "descricao"
        FROM
            "ProdutoLoja"
        LEFT JOIN
            "Produto"
        ON
            "Produto"."codProduto"="ProdutoLoja"."codProduto"
        WHERE
            "ProdutoLoja"."codLoja"=$1
        `,
        [codLoja]
      );
    return produtos;
  }
}
