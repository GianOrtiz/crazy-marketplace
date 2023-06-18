import { Pool } from 'pg';
import CategoriaLojaController from './categoria-loja';
import EnderecoController from './endereco';

export type Controllers = {
  categoriaLoja: CategoriaLojaController;
  endereco: EnderecoController;
};

export const setupControllers = (databaseConnPool: Pool): Controllers => {
  return {
    categoriaLoja: new CategoriaLojaController(databaseConnPool),
    endereco: new EnderecoController(databaseConnPool),
  };
};
