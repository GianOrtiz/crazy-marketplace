import { Pool } from 'pg';
import * as uuid from 'uuid';
import { CategoriaProduto } from '../../domain';

type CreateArgs = {
  categoria: string;
};

type UpdateArgs = {
  codCategoria: string;
  categoria: string;
};

type RetrieveArgs = {
  codCategoria?: string;
};

type DeleteArgs = {
  codCategoria: string;
};

export default class CategoriaProdutoController {
  constructor(private databaseConnPool: Pool) {}

  async create({ categoria }: CreateArgs): Promise<void> {
    const codCategoria = uuid.v4();
    await this.databaseConnPool.query(
      'INSERT INTO "CategoriaProduto"("codCategoria","categoria") VALUES($1,$2)',
      [codCategoria, categoria]
    );
  }

  async update({ codCategoria, categoria }: UpdateArgs): Promise<void> {
    await this.databaseConnPool.query(
      'UPDATE "CategoriaProduto" SET "categoria"=$1 WHERE "codCategoria"=$2',
      [categoria, codCategoria]
    );
  }

  async delete({ codCategoria }: DeleteArgs): Promise<void> {
    await this.databaseConnPool.query(
      'DELETE FROM "CategoriaProduto" WHERE "codCategoria"=$1',
      [codCategoria]
    );
  }

  async retrieve({
    codCategoria,
  }: RetrieveArgs): Promise<CategoriaProduto | CategoriaProduto[]> {
    if (codCategoria) return this.getOne(codCategoria);
    return this.getAll();
  }

  private async getOne(codCategoria: string): Promise<CategoriaProduto> {
    const { rows: categorias } =
      await this.databaseConnPool.query<CategoriaProduto>(
        'SELECT "codCategoria", "categoria" FROM "CategoriaProduto" WHERE "codCategoria"=$1',
        [codCategoria]
      );
    if (categorias.length === 0)
      throw new Error(`CategoriaProduto ${codCategoria} not found`);
    return categorias[0];
  }

  private async getAll(): Promise<CategoriaProduto[]> {
    const { rows: categorias } =
      await this.databaseConnPool.query<CategoriaProduto>(
        'SELECT "codCategoria", "categoria" FROM "CategoriaProduto"'
      );
    return categorias;
  }
}
