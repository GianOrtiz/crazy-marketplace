import { Pool } from 'pg';
import * as uuid from 'uuid';
import { Cliente, Endereco } from '../../domain';

type CreateArgs = {
  codEndereco: string;
  nome: string;
  email: string;
};

type UpdateArgs = {
  codCliente: string;
  email: string;
  nome: string;
};

type RetrieveArgs = {
  codCliente?: string;
};

type DeleteArgs = {
  codCliente: string;
};

type ComposedClienteResult = {
  codCliente: string;
  codEndereco: string;
  nome: string;
  email: string;
  numero: number;
  cidade: string;
  cep: string;
  estado: string;
  rua: string;
};

type ClienteResult = Cliente & { endereco: Endereco };

export default class ClienteController {
  constructor(private databaseConnPool: Pool) {}

  async create({ codEndereco, email, nome }: CreateArgs): Promise<void> {
    const codCliente = uuid.v4();
    await this.databaseConnPool.query(
      'INSERT INTO "Cliente"("codCliente","codEndereco","nome","email") VALUES($1,$2,$3,$4)',
      [codCliente, codEndereco, nome, email]
    );
  }

  async update({ codCliente, email, nome }: UpdateArgs): Promise<void> {
    await this.databaseConnPool.query(
      'UPDATE "Cliente" SET "nome"=$1, "email"=$2 WHERE "codCliente"=$3',
      [nome, email, codCliente]
    );
  }

  async delete({ codCliente }: DeleteArgs): Promise<void> {
    await this.databaseConnPool.query(
      'DELETE FROM "Cliente" WHERE "codCliente"=$1',
      [codCliente]
    );
  }

  async retrieve({
    codCliente,
  }: RetrieveArgs): Promise<ClienteResult | ClienteResult[]> {
    if (codCliente) return this.getOne(codCliente);
    return this.getAll();
  }

  private async getOne(codCliente: string): Promise<ClienteResult> {
    const { rows } = await this.databaseConnPool.query<ComposedClienteResult>(
      `
        SELECT
            "codCliente",
            "codEndereco",
            "nome",
            "email",
            "numero",
            "cidade",
            "cep",
            "estado",
            "rua"
        FROM
            "Cliente"
        WHERE
            "codCliente"=$1'
        LEFT JOIN
            "Endereco"
        ON
            "Cliente"."codEndereco"="Endereco"."codEndereco"
      `,
      [codCliente]
    );
    if (rows.length === 0) throw new Error(`Cliente ${codCliente} not found`);
    return this.convert(rows[0]);
  }

  private async getAll(): Promise<ClienteResult[]> {
    const { rows } = await this.databaseConnPool.query<ComposedClienteResult>(
      `
      SELECT
          "codCliente",
          "codEndereco",
          "nome",
          "email",
          "numero",
          "cidade",
          "cep",
          "estado",
          "rua"
      FROM
          "Cliente"
      LEFT JOIN
          "Endereco"
      ON
          "Cliente"."codEndereco"="Endereco"."codEndereco"
      `
    );
    return rows.map((row) => this.convert(row));
  }

  private convert(data: ComposedClienteResult): ClienteResult {
    return {
      codCliente: data.codCliente,
      email: data.email,
      nome: data.nome,
      endereco: {
        codEndereco: data.codEndereco,
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado,
        numero: data.numero,
        rua: data.rua,
      },
    };
  }
}
