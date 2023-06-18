import Hapi from '@hapi/hapi';
import { config } from '../config';
import { Pool } from 'pg';
import { getConnectionPool } from '../../infrastructure/sql';
import { Controllers, setupControllers } from '../controller';
import { registerCategoriaLojaRoutes } from './routes/categoria-loja';
import { registerEnderecoRoutes } from './routes/endereco';
import { registerCategoriaProdutoRoutes } from './routes/categoria-produto';

export default class Server {
  private hapi: Hapi.Server;
  private connectionPool: Pool;
  private controllers: Controllers;

  constructor() {
    this.hapi = Hapi.server({
      port: config.port,
    });
    this.connectionPool = getConnectionPool();
    this.controllers = setupControllers(this.connectionPool);
    this.setupRoutes();
  }

  async start(): Promise<void> {
    return this.hapi.start();
  }

  private setupRoutes() {
    registerCategoriaLojaRoutes(this.hapi, this.controllers.categoriaLoja);
    registerEnderecoRoutes(this.hapi, this.controllers.endereco);
    registerCategoriaProdutoRoutes(this.hapi, this.controllers.categoriaProduto);
  }
}
