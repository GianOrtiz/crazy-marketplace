import { Pool } from 'pg';
import * as uuid from 'uuid';
import { Endereco } from '../../domain';

type CreateArgs = Omit<Endereco, 'codEndereco'>;

type UpdateArgs = {
  codEndereco: string;
  endereco: Omit<Endereco, 'codEndereco'>;
};

type RetrieveArgs = {
  codEndereco?: string;
};

type DeleteArgs = {
  codEndereco: string;
};

export default class EnderecoController {
  constructor(private databaseConnPool: Pool) {}

  async create({
    cep,
    cidade,
    estado,
    numero,
    rua,
  }: CreateArgs): Promise<void> {
    const codEndereco = uuid.v4();
    await this.databaseConnPool.query(
      'INSERT INTO "Endereco"("codEndereco","numero","cidade","cep","estado","rua") VALUES($1,$2,$3,$4,$5,$6)',
      [codEndereco, numero, cidade, cep, estado, rua]
    );
  }

  async update({
    codEndereco,
    endereco: { cep, cidade, estado, numero, rua },
  }: UpdateArgs): Promise<void> {
    await this.databaseConnPool.query(
      'UPDATE "Endereco" SET "cep"=$1, "cidade"=$2, "estado"=$3, "numero"=$4, "rua"=$5 WHERE "codCategoria"=$6',
      [cep, cidade, estado, numero, rua, codEndereco]
    );
  }

  async delete({ codEndereco }: DeleteArgs): Promise<void> {
    await this.databaseConnPool.query(
      'DELETE FROM "Endereco" WHERE "codEndereco"=$1',
      [codEndereco]
    );
  }

  async retrieve({
    codEndereco,
  }: RetrieveArgs): Promise<Endereco | Endereco[]> {
    if (codEndereco) return this.getOne(codEndereco);
    return this.getAll();
  }

  private async getOne(codEndereco: string): Promise<Endereco> {
    const { rows: enderecos } =
      await this.databaseConnPool.query<Endereco>(
        'SELECT "codEndereco","numero","cidade","cep","estado","rua" FROM "Endereco" WHERE "codEndereco"=$1',
        [codEndereco]
      );
    if (enderecos.length === 0)
      throw new Error(`CategoriaLoja ${enderecos} not found`);
    return enderecos[0];
  }

  private async getAll(): Promise<Endereco[]> {
    const { rows: enderecos } =
      await this.databaseConnPool.query<Endereco>(
        'SELECT "codEndereco","numero","cidade","cep","estado","rua" FROM "Endereco"',
      );
    return enderecos;
  }
}
