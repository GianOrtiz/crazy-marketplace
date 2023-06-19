import Hapi from '@hapi/hapi';
import CategoriaProdutoController from '../../controller/categoria-produto';
import { CategoriaProduto } from '../../../domain';

export const registerCategoriaProdutoRoutes = (
  hapi: Hapi.Server,
  controller: CategoriaProdutoController
) => {
  hapi.route({
    method: 'POST',
    options: {
      payload: {
        allow: 'application/json',
        parse: true,
        output: 'data',
      },
    },
    path: '/categoria-produtos',
    handler: async (request) => {
      const { categoria } = request.payload as CategoriaProduto;
      await controller.create({
        categoria,
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'PUT',
    options: {
      payload: {
        allow: 'application/json',
        parse: true,
        output: 'data',
      },
    },
    path: '/categoria-produtos/{codCategoria}',
    handler: async (request, h) => {
      const codCategoria = request.params.codCategoria as string | undefined;
      if (!codCategoria) {
        h.response().code(400);
        return;
      }
      const { categoria } = request.payload as CategoriaProduto;
      await controller.update({
        categoria,
        codCategoria,
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'GET',
    path: '/categoria-produtos',
    handler: async () => {
      return controller.retrieve({});
    },
  });
  hapi.route({
    method: 'GET',
    path: '/categoria-produtos/{codCategoria}',
    handler: async (request, h) => {
      const codCategoria = request.params.codCategoria as string | undefined;
      if (!codCategoria) {
        h.response().code(400);
        return;
      }
      return controller.retrieve({ codCategoria });
    },
  });
  hapi.route({
    method: 'DELETE',
    path: '/categoria-produtos/{codCategoria}',
    handler: async (request, h) => {
      const codCategoria = request.params.codCategoria as string | undefined;
      if (!codCategoria) {
        h.response().code(400);
        return;
      }
      await controller.delete({
        codCategoria,
      });
      return 'Ok';
    },
  });
};
