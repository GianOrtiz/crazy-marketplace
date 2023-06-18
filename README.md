# Marketplace de ecommerce

Um marketplace diferente para ecommerce.

## Como executar

Requisitos:

* Node versão 18.15.0
* Docker

1. Execute o comando `docker-compose up -d` ou `docker compose up -d` para subir o banco de dados que será necessário para executar nosso sistema.
2. Execute o comando `psql postgres://postgres:secret@localhost:5432 -f ddl.sql` para iniciar o banco com as tabelas do sistema.
3. Execute o comando `psql postgres://postgres:secret@localhost:5432 -f dml.sql` para popular o banco com dados iniciais.
4. Execute o comando `yarn` ou `npm install` para instalar as dependências do projeto.
5. Execute o comando `yarn start` ou `npm start` para iniciar o sistema.
6. Abra o arquivo `openapi.yaml` na raiz do diretório em (swagger)[https://editor.swagger.io/], isto irá permitir executar as funcionalidades da API com maior facilidade, ou utilize curl.


