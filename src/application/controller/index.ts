import { Pool } from 'pg';
import CategoriaLojaController from './categoria-loja';
import EnderecoController from './endereco';
import CategoriaProdutoController from './categoria-produto';

export type Controllers = {
  categoriaLoja: CategoriaLojaController;
  endereco: EnderecoController;
  categoriaProduto: CategoriaProdutoController;
};

export const setupControllers = (databaseConnPool: Pool): Controllers => {
  return {
    categoriaLoja: new CategoriaLojaController(databaseConnPool),
    endereco: new EnderecoController(databaseConnPool),
    categoriaProduto: new CategoriaProdutoController(databaseConnPool),
  };
};
