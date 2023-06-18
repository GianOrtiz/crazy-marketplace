import { Pool } from 'pg';
import * as uuid from 'uuid';
import { Produto } from '../../domain';

type CreateArgs = {
  nome: string;
  descricao: string;
  codCategoria: string;
};

type UpdateArgs = {
  codProduto: string;
  descricao: string;
  nome: string;
};

type RetrieveArgs = {
  codProduto?: string;
};

type DeleteArgs = {
  codProduto: string;
};

export default class ProdutoController {
  constructor(private databaseConnPool: Pool) {}

  async create({ codCategoria, descricao, nome }: CreateArgs): Promise<void> {
    const codProduto = uuid.v4();
    await this.databaseConnPool.query(
      'INSERT INTO "Produto"("codProduto","codCategoria","nome","descricao") VALUES($1,$2,$3,$4)',
      [codProduto, codCategoria, nome, descricao]
    );
  }

  async update({ codProduto, descricao, nome }: UpdateArgs): Promise<void> {
    await this.databaseConnPool.query(
      'UPDATE "Produto" SET "nome"=$1, "descricao"=$2 WHERE "codProduto"=$3',
      [nome, descricao, codProduto]
    );
  }

  async delete({ codProduto }: DeleteArgs): Promise<void> {
    await this.databaseConnPool.query(
      'DELETE FROM "Produto" WHERE "codProduto"=$1',
      [codProduto]
    );
  }

  async retrieve({ codProduto }: RetrieveArgs): Promise<Produto | Produto[]> {
    if (codProduto) return this.getOne(codProduto);
    return this.getAll();
  }

  private async getOne(codProduto: string): Promise<Produto> {
    const { rows: produtos } = await this.databaseConnPool.query<Produto>(
      `
            SELECT
                "codProduto",
                "codCategoria",
                "nome",
                "descricao"
            FROM
                "Produto"
            WHERE
                "codProduto"=$1
      `,
      [codProduto]
    );
    if (produtos.length === 0) throw new Error(`Produto ${produtos} not found`);
    return produtos[0];
  }

  private async getAll(): Promise<Produto[]> {
    const { rows: produtos } = await this.databaseConnPool.query<Produto>(
      `
        SELECT
            "codProduto",
            "codCategoria",
            "nome",
            "descricao"
        FROM
            "Produto"
      `
    );
    return produtos;
  }
}
