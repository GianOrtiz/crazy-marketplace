import { Pool } from 'pg';
import * as uuid from 'uuid';
import { CategoriaLoja, Endereco, Loja } from '../../domain';
import GestorController from './gestor';

type CreateArgs = {
  loja: Omit<Loja, 'codLoja'>;
  codEndereco: string;
  codCategoria: string;
};

type UpdateArgs = {
  codLoja: string;
  loja: Omit<Loja, 'codLoja'>;
};

type RetrieveArgs = {
  codLoja?: string;
};

type DeleteArgs = {
  codLoja: string;
};

type ComposedLojaResult = {
  codLoja: string;
  descricao: string;
  nome: string;
  categoria: string;
  numero: number;
  cidade: string;
  cep: string;
  estado: string;
  rua: string;
};

type LojaResult = Loja & { endereco: Omit<Endereco, 'codEndereco'> } & Omit<
    CategoriaLoja,
    'codCategoria'
  >;

export default class LojaController {
  constructor(
    private databaseConnPool: Pool,
    public gestorController: GestorController
  ) {}

  async create({
    loja: { descricao, nome },
    codCategoria,
    codEndereco,
  }: CreateArgs): Promise<void> {
    const codLoja = uuid.v4();
    await this.databaseConnPool.query(
      'INSERT INTO "Loja"("codLoja","codCategoria","codLoja","nome","descricao") VALUES($1,$2,$3,$4,$5)',
      [codLoja, codCategoria, codEndereco, nome, descricao]
    );
  }

  async update({
    codLoja,
    loja: { descricao, nome },
  }: UpdateArgs): Promise<void> {
    await this.databaseConnPool.query(
      'UPDATE "Loja" SET "descricao"=$1, "nome"=$2 WHERE "codLoja"=$3',
      [descricao, nome, codLoja]
    );
  }

  async delete({ codLoja }: DeleteArgs): Promise<void> {
    await this.databaseConnPool.query('DELETE FROM "Loja" WHERE "codLoja"=$1', [
      codLoja,
    ]);
  }

  async retrieve({
    codLoja,
  }: RetrieveArgs): Promise<LojaResult | LojaResult[]> {
    if (codLoja) return this.getOne(codLoja);
    return this.getAll();
  }

  private async getOne(codLoja: string): Promise<LojaResult> {
    const { rows } = await this.databaseConnPool.query<ComposedLojaResult>(
      `
        SELECT
            "codLoja",
            "descricao",
            "nome",
            "categoria",
            "numero",
            "cidade",
            "cep",
            "estado",
            "rua"
        FROM
            "Loja"
        WHERE
            "codLoja"=$1'
        LEFT JOIN
            "Endereco"
        ON
            "Loja"."codEndereco"="Endereco"."codEndereco"
        LEFT JOIN
            "CategoriaLoja"
        ON
            "Loja"."codCategoria"="CategoriaLoja"."codCategoria"
      `,
      [codLoja]
    );
    if (rows.length === 0) throw new Error(`Loja ${codLoja} not found`);
    return this.convert(rows[0]);
  }

  private async getAll(): Promise<LojaResult[]> {
    const { rows } = await this.databaseConnPool.query<ComposedLojaResult>(
      'SELECT "codLoja","numero","cidade","cep","estado","rua" FROM "Loja"'
    );
    return rows.map((row) => this.convert(row));
  }

  private convert(data: ComposedLojaResult): LojaResult {
    return {
      categoria: data.categoria,
      codLoja: data.codLoja,
      descricao: data.descricao,
      nome: data.nome,
      endereco: {
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado,
        numero: data.numero,
        rua: data.rua,
      },
    };
  }
}
