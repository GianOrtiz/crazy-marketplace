import { Pool } from 'pg';
import * as uuid from 'uuid';
import { Gestor } from '../../domain';

type CreateArgs = Omit<Gestor, 'codGestor'> & { codLoja: string };

type UpdateArgs = {
  codGestor: string;
  gestor: Omit<Gestor, 'codGestor'>;
};

type RetrieveArgs = {
  codLoja: string;
  codGestor?: string;
};

type DeleteArgs = {
  codGestor: string;
};

export default class GestorController {
  constructor(private databaseConnPool: Pool) {}

  async create({
    cpf,
    funcao,
    codLoja,
    nome,
    numeroTelefone,
  }: CreateArgs): Promise<void> {
    const codGestor = uuid.v4();
    await this.databaseConnPool.query(
      'INSERT INTO "Gestor"("codLoja","codGestor","funcao","nome","cpf","numeroTelefone") VALUES($1,$2,$3,$4,$5,$6)',
      [codLoja, codGestor, funcao, nome, cpf, numeroTelefone]
    );
  }

  async update({
    codGestor,
    gestor: { cpf, funcao, nome, numeroTelefone },
  }: UpdateArgs): Promise<void> {
    await this.databaseConnPool.query(
      'UPDATE "Gestor" SET "cpf"=$1, "funcao"=$2, "nome"=$3, "numeroTelefone"=$4 WHERE "codGestor"=$6',
      [cpf, funcao, nome, numeroTelefone, codGestor]
    );
  }

  async delete({ codGestor }: DeleteArgs): Promise<void> {
    await this.databaseConnPool.query(
      'DELETE FROM "Gestor" WHERE "codGestor"=$1',
      [codGestor]
    );
  }

  async retrieve({ codGestor, codLoja }: RetrieveArgs): Promise<Gestor | Gestor[]> {
    if (codGestor) return this.getOne(codGestor, codLoja);
    return this.getAll(codLoja);
  }

  private async getOne(codGestor: string, codLoja: string): Promise<Gestor> {
    const { rows: gestores } = await this.databaseConnPool.query<Gestor>(
      `
            SELECT
                "codGestor",
                "cpf",
                "funcao",
                "Gestor"."nome",
                "numeroTelefone"
            FROM
                "Gestor"
            RIGHT JOIN
                "Loja"
            ON
                "Gestor"."codLoja"="Loja"."codLoja"
            WHERE
                "codGestor"=$1 AND "Gestor"."codLoja"=$2
      `,
      [codGestor, codLoja]
    );
    if (gestores.length === 0) throw new Error(`Gestor ${gestores} not found`);
    return gestores[0];
  }

  private async getAll(codLoja: string): Promise<Gestor[]> {
    const { rows: gestores } = await this.databaseConnPool.query<Gestor>(
      `
            SELECT
                "codGestor",
                "cpf",
                "funcao",
                "Gestor"."nome",
                "numeroTelefone"
            FROM
                "Gestor"
            RIGHT JOIN
                "Loja"
            ON
                "Gestor"."codLoja"="Loja"."codLoja"
            WHERE
                "Gestor"."codLoja"=$1
      `,
      [codLoja]
    );
    return gestores;
  }
}
