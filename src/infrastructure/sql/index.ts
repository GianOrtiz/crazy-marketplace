import { Pool } from 'pg';
import { config } from '../../application/config';

export const getConnectionPool = (): Pool => {
  return new Pool({
    connectionString: config.databaseUrl,
  });
};
