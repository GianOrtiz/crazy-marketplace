import { Pool } from 'pg';
import CategoriaLojaController from './categoria-loja';

export type Controllers = {
  categoriaLoja: CategoriaLojaController;
};

export const setupControllers = (databaseConnPool: Pool): Controllers => {
  return {
    categoriaLoja: new CategoriaLojaController(databaseConnPool),
  };
};
