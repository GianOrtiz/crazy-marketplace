import Hapi from '@hapi/hapi';
import ProdutoController from '../../controller/produto';

type PostPayload = {
    nome: string;
    descricao: string;
    codCategoria: string;
};

type PutPayload = {
    nome: string;
    descricao: string;
};

export const registerProdutoRoutes = (
  hapi: Hapi.Server,
  controller: ProdutoController
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
    path: '/produtos',
    handler: async (request) => {
      const { descricao, nome, codCategoria } = request.payload as PostPayload;
      await controller.create({
        codCategoria,
        descricao,
        nome,
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
    path: '/produtos/{codProduto}',
    handler: async (request, h) => {
      const codProduto = request.params.codProduto as string | undefined;
      if (!codProduto) {
        h.response().code(400);
        return;
      }
      const { nome, descricao } = request.payload as PutPayload;
      await controller.update({
        nome,
        codProduto,
        descricao,
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'GET',
    path: '/produtos',
    handler: async () => {
      return controller.retrieve({});
    },
  });
  hapi.route({
    method: 'GET',
    path: '/produtos/{codProduto}',
    handler: async (request, h) => {
      const codProduto = request.params.codProduto as string | undefined;
      if (!codProduto) {
        h.response().code(400);
        return;
      }
      return controller.retrieve({ codProduto });
    },
  });
  hapi.route({
    method: 'DELETE',
    path: '/produtos/{codProduto}',
    handler: async (request, h) => {
      const codProduto = request.params.codProduto as string | undefined;
      if (!codProduto) {
        h.response().code(400);
        return;
      }
      await controller.delete({
        codProduto,
      });
      return 'Ok';
    },
  });
};
