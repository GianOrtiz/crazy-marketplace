import { Pool } from 'pg';
import CategoriaLojaController from './categoria-loja';
import EnderecoController from './endereco';
import CategoriaProdutoController from './categoria-produto';
import LojaController from './loja';

export type Controllers = {
  categoriaLoja: CategoriaLojaController;
  endereco: EnderecoController;
  categoriaProduto: CategoriaProdutoController;
  loja: LojaController;
};

export const setupControllers = (databaseConnPool: Pool): Controllers => {
  return {
    categoriaLoja: new CategoriaLojaController(databaseConnPool),
    endereco: new EnderecoController(databaseConnPool),
    categoriaProduto: new CategoriaProdutoController(databaseConnPool),
    loja: new LojaController(databaseConnPool),
  };
};
