import Hapi from '@hapi/hapi';
import { config } from './config';
import { Pool } from 'pg';
import { getConnectionPool } from '../infrastructure/sql';
import { Controllers, setupControllers } from './controller';
import { CategoriaLoja } from '../domain';

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
    this.hapi.route({
      method: 'POST',
      options: {
        payload: {
          allow: 'application/json',
          parse: true,
          output: 'data',
        },
      },
      path: '/categoria-lojas',
      handler: async (request) => {
        const { categoria } = request.payload as CategoriaLoja;
        await this.controllers.categoriaLoja.create({
          categoria,
        });
        return 'Ok';
      },
    });
    this.hapi.route({
      method: 'PUT',
      options: {
        payload: {
          allow: 'application/json',
          parse: true,
          output: 'data',
        },
      },
      path: '/categoria-lojas',
      handler: async (request) => {
        const { categoria, codCategoria } = request.payload as CategoriaLoja;
        await this.controllers.categoriaLoja.update({
          categoria,
          codCategoria,
        });
        return 'Ok';
      },
    });
    this.hapi.route({
      method: 'GET',
      path: '/categoria-lojas',
      handler: async () => {
        return this.controllers.categoriaLoja.retrieve({});
      },
    });
    this.hapi.route({
      method: 'GET',
      path: '/categoria-lojas/{codCategoria}',
      handler: async (request) => {
        const codCategoria = request.params.codCategoria as string | undefined;
        return this.controllers.categoriaLoja.retrieve({ codCategoria });
      },
    });
    this.hapi.route({
      method: 'DELETE',
      options: {
        payload: {
          allow: 'application/json',
          parse: true,
          output: 'data',
        },
      },
      path: '/categoria-lojas',
      handler: async (request) => {
        const { codCategoria } = request.payload as CategoriaLoja;
        await this.controllers.categoriaLoja.delete({
          codCategoria,
        });
        return 'Ok';
      },
    });
  }
}
