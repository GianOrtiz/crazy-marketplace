import Hapi from '@hapi/hapi';
import { config } from '../config';
import { Pool } from 'pg';
import { getConnectionPool } from '../../infrastructure/sql';
import { Controllers, setupControllers } from '../controller';
import { registerRoutes } from './routes';

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
    registerRoutes(this.hapi, this.controllers);
  }
}
