import Hapi from '@hapi/hapi';
import { config } from './config';
import { Pool } from 'pg';
import { getConnectionPool } from '../infrastructure/sql';

export default class Server {
  private hapi: Hapi.Server;
  private connectionPool: Pool;

  constructor() {
    this.hapi = Hapi.server({
      port: config.port,
    });
    this.connectionPool = getConnectionPool();
  }

  async start(): Promise<void> {
    return this.hapi.start();
  }
}
