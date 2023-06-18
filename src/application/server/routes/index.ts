import Hapi from '@hapi/hapi';
import { Controllers } from '../../controller';
import { registerCategoriaLojaRoutes } from './categoria-loja';
import { registerCategoriaProdutoRoutes } from './categoria-produto';
import { registerEnderecoRoutes } from './endereco';
import { registerLojaRoutes } from './loja';

export const registerRoutes = (hapi: Hapi.Server, controllers: Controllers) => {
  registerCategoriaLojaRoutes(hapi, controllers.categoriaLoja);
  registerCategoriaProdutoRoutes(hapi, controllers.categoriaProduto);
  registerEnderecoRoutes(hapi, controllers.endereco);
  registerLojaRoutes(hapi, controllers.loja);
};
