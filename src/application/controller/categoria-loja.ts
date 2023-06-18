import { Pool } from 'pg';
import * as uuid from 'uuid';
import { CategoriaLoja } from '../../domain';

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

export default class CategoriaLojaController {
  constructor(private databaseConnPool: Pool) {}

  async create({ categoria }: CreateArgs): Promise<void> {
    const codCategoria = uuid.v4();
    await this.databaseConnPool.query(
      'INSERT INTO "CategoriaLoja"("codCategoria","categoria") VALUES($1,$2)',
      [codCategoria, categoria]
    );
  }

  async update({ codCategoria, categoria }: UpdateArgs): Promise<void> {
    await this.databaseConnPool.query(
      'UPDATE "CategoriaLoja" SET "categoria"=$1 WHERE "codCategoria"=$2',
      [categoria, codCategoria]
    );
  }

  async delete({ codCategoria }: DeleteArgs): Promise<void> {
    await this.databaseConnPool.query(
      'DELETE FROM "CategoriaLoja" WHERE "codCategoria"=$1',
      [codCategoria]
    );
  }

  async retrieve({
    codCategoria,
  }: RetrieveArgs): Promise<CategoriaLoja | CategoriaLoja[]> {
    if (codCategoria) return this.getOne(codCategoria);
    return this.getAll();
  }

  private async getOne(codCategoria: string): Promise<CategoriaLoja> {
    const { rows: categorias } =
      await this.databaseConnPool.query<CategoriaLoja>(
        'SELECT "codCategoria", "categoria" FROM "CategoriaLoja" WHERE "codCategoria"=$1',
        [codCategoria]
      );
    if (categorias.length === 0)
      throw new Error(`CategoriaLoja ${codCategoria} not found`);
    return categorias[0];
  }

  private async getAll(): Promise<CategoriaLoja[]> {
    const { rows: categorias } =
      await this.databaseConnPool.query<CategoriaLoja>(
        'SELECT "codCategoria", "categoria" FROM "CategoriaLoja"'
      );
    return categorias;
  }
}
