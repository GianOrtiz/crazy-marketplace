import { Pool } from 'pg';
import * as uuid from 'uuid';
import { Compra } from '../../domain/compra';

type CreateArgs = {
    codEndereco: string;
    codCliente: string;
    codProduto: string;
    data: Date;
    valor: number;
    quantidade: number;
};

type UpdateArgs = {
    codCompra: string;
    valor: number;
    quantidade: number;
};

type RetrieveArgs = {
  codCompra?: string;
};

type DeleteArgs = {
  codCompra: string;
};

export default class CompraController {
  constructor(private databaseConnPool: Pool) {}

  async create({
    codCliente,
    codEndereco,
    codProduto,
    data,
    quantidade,
    valor,
  }: CreateArgs): Promise<void> {
    const codCompra = uuid.v4();
    await this.databaseConnPool.query(
      'INSERT INTO "Compra"("codCompra","codEndereco","codProduto","codCliente","data","quantidade","valor") VALUES($1,$2,$3,$4,$5,$6,$7)',
      [codCompra, codEndereco, codProduto, codCliente, data, quantidade, valor]
    );
  }

  async update({
    codCompra,
    quantidade,
    valor,
  }: UpdateArgs): Promise<void> {
    await this.databaseConnPool.query(
      'UPDATE "Compra" SET "valor"=$1, "quantidade"=$2 WHERE "codCompra"=$3',
      [valor, quantidade, codCompra]
    );
  }

  async delete({ codCompra }: DeleteArgs): Promise<void> {
    await this.databaseConnPool.query(
      'DELETE FROM "Compra" WHERE "codCompra"=$1',
      [codCompra]
    );
  }

  async retrieve({ codCompra }: RetrieveArgs): Promise<Compra | Compra[]> {
    if (codCompra) return this.getOne(codCompra);
    return this.getAll();
  }

  private async getOne(codCompra: string): Promise<Compra> {
    const { rows: compras } = await this.databaseConnPool.query<Compra>(
      `
            SELECT
                "codCompra",
                "codEndereco",
                "codProduto",
                "codCliente",
                "data",
                "quantidade",
                "valor"
            FROM
                "Compra"
            WHERE
                "codCompra"=$1
      `,
      [codCompra]
    );
    if (compras.length === 0) throw new Error(`Compra ${compras} not found`);
    return compras[0];
  }

  private async getAll(): Promise<Compra[]> {
    const { rows: compras } = await this.databaseConnPool.query<Compra>(
      `
        SELECT
            "codCompra",
            "codEndereco",
            "codProduto",
            "codCliente",
            "data",
            "quantidade",
            "valor"
        FROM
            "Compra"
      `
    );
    return compras;
  }
}
