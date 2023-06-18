import { Pool } from "pg";

type AverageCitySells = {
    mediaQuantidade: number;
    mediaValor: number;
    cidade: string;
};

type TotalProdutoSells = {
    total: number;
    nome: string;
    ano: number;
    mes: number;
};

type AverageProductPrices = {
    precoMedio: number;
    nome: string;
};

export default class StatsController {
    constructor(private databaseConnPool: Pool) {}

    async averageCitySells(): Promise<AverageCitySells[]> {
        const { rows } = await this.databaseConnPool.query<AverageCitySells>(`
            SELECT
                AVG("quantidade") AS "mediaQuantidade",
                AVG("valor") AS "mediaValor",
                "cidade"
            FROM
                "Compra"
            LEFT JOIN
                "Endereco"
            ON 
                "Compra"."codEndereco"="Endereco"."codEndereco"
            GROUP BY 
                "cidade"
        `);
        return rows;
    }

    async totalProductSells(): Promise<TotalProdutoSells[]> {
        const { rows } = await this.databaseConnPool.query<TotalProdutoSells>(`
            SELECT
                SUM("valor") AS total,
                "nome",
                EXTRACT(YEAR FROM "data") AS ano,
                EXTRACT(MONTH FROM "data") AS mes
            FROM
                "Compra"
            RIGHT JOIN
                "Produto"
            ON
                "Compra"."codProduto"="Produto"."codProduto"
            GROUP BY
                ano,
                mes,
                "Produto"."codProduto"
        `);
        return rows;
    }

    async averageProductPrices(): Promise<AverageProductPrices[]> {
        const { rows } = await this.databaseConnPool.query(`
            SELECT
                AVG("preco") AS "precoMedio",
                "nome"
            FROM
                "ProdutoLoja"
            LEFT JOIN
                "Produto"
            ON
                "ProdutoLoja"."codProduto"="Produto"."codProduto"
            GROUP BY
                "Produto"."codProduto"
        `);
        return rows;
    }
}