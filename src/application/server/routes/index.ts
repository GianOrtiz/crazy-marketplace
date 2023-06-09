import Hapi from '@hapi/hapi';
import { Controllers } from '../../controller';
import { registerCategoriaLojaRoutes } from './categoria-loja';
import { registerCategoriaProdutoRoutes } from './categoria-produto';
import { registerEnderecoRoutes } from './endereco';
import { registerLojaRoutes } from './loja';
import { registerClienteRoutes } from './cliente';
import { registerProdutoRoutes } from './produtos';
import { registerCompraRoutes } from './compra';
import { registerStatsRoutes } from './stats';

export const registerRoutes = (hapi: Hapi.Server, controllers: Controllers) => {
  registerCategoriaLojaRoutes(hapi, controllers.categoriaLoja);
  registerCategoriaProdutoRoutes(hapi, controllers.categoriaProduto);
  registerEnderecoRoutes(hapi, controllers.endereco);
  registerLojaRoutes(hapi, controllers.loja);
  registerProdutoRoutes(hapi, controllers.produto);
  registerClienteRoutes(hapi, controllers.cliente);
  registerCompraRoutes(hapi, controllers.compra);
  registerStatsRoutes(hapi, controllers.stats);
};
