import Hapi from '@hapi/hapi';
import CategoriaLojaController from '../../controller/categoria-loja';
import { CategoriaLoja } from '../../../domain';

export const registerCategoriaLojaRoutes = (
  hapi: Hapi.Server,
  controller: CategoriaLojaController
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
    path: '/categoria-lojas',
    handler: async (request) => {
      const { categoria } = request.payload as CategoriaLoja;
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
    path: '/categoria-lojas/{codCategoria}',
    handler: async (request, h) => {
      const codCategoria = request.params.codCategoria as string | undefined;
      if (!codCategoria) {
        h.response().code(400);
        return;
      }
      const { categoria } = request.payload as CategoriaLoja;
      await controller.update({
        categoria,
        codCategoria,
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'GET',
    path: '/categoria-lojas',
    handler: async () => {
      return controller.retrieve({});
    },
  });
  hapi.route({
    method: 'GET',
    path: '/categoria-lojas/{codCategoria}',
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
    path: '/categoria-lojas/{codCategoria}',
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
