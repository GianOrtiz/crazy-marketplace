import { Pool } from 'pg';
import CategoriaLojaController from './categoria-loja';
import EnderecoController from './endereco';
import CategoriaProdutoController from './categoria-produto';
import LojaController from './loja';
import GestorController from './gestor';
import ProdutoController from './produto';
import ProdutoLojaController from './produto-loja';
import ClienteController from './cliente';

export type Controllers = {
  categoriaLoja: CategoriaLojaController;
  endereco: EnderecoController;
  categoriaProduto: CategoriaProdutoController;
  loja: LojaController;
  produto: ProdutoController;
  cliente: ClienteController;
};

export const setupControllers = (databaseConnPool: Pool): Controllers => {
  const gestor = new GestorController(databaseConnPool);
  const produtoLoja = new ProdutoLojaController(databaseConnPool);
  return {
    categoriaLoja: new CategoriaLojaController(databaseConnPool),
    endereco: new EnderecoController(databaseConnPool),
    categoriaProduto: new CategoriaProdutoController(databaseConnPool),
    loja: new LojaController(databaseConnPool, gestor, produtoLoja),
    produto: new ProdutoController(databaseConnPool),
    cliente: new ClienteController(databaseConnPool),
  };
};
