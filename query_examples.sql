-- Média de venda de itens e preços por cidades.
SELECT
    AVG("quantidade") AS media_quantidade,
    AVG("valor") AS media_valor,
    "cidade"
FROM
    "Compra"
LEFT JOIN
    "Endereco"
ON 
    "Compra"."codEndereco"="Endereco"."codEndereco"
GROUP BY 
    "cidade";

-- Valor total de venda de produtos por mês.
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
    "Produto"."codProduto";

-- Valor médio dos produtos nas lojas.
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
    "Produto"."codProduto";
