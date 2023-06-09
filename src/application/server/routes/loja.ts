import Hapi from '@hapi/hapi';
import { Gestor, Loja } from '../../../domain';
import LojaController from '../../controller/loja';

type LojasPostPayload = {
  codEndereco: string;
  codCategoria: string;
} & Omit<Loja, 'codLoja'>;

type ProdutosPostPayload = {
  codProduto: string;
  preco: number;
  quantidade: number;
};

type ProdutosPutPayload = {
  preco: number;
  quantidade: number;
};

export const registerLojaRoutes = (
  hapi: Hapi.Server,
  controller: LojaController
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
    path: '/lojas',
    handler: async (request) => {
      const { codCategoria, codEndereco, descricao, nome } =
        request.payload as LojasPostPayload;
      await controller.create({
        codCategoria,
        codEndereco,
        loja: {
          descricao,
          nome,
        },
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
    path: '/lojas/{codLoja}',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }
      const { descricao, nome } = request.payload as Omit<Loja, 'codLoja'>;
      await controller.update({
        codLoja: codLoja,
        loja: {
          descricao,
          nome,
        },
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'GET',
    path: '/lojas',
    handler: async () => {
      return controller.retrieve({});
    },
  });
  hapi.route({
    method: 'GET',
    path: '/lojas/{codLoja}',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }
      return controller.retrieve({ codLoja });
    },
  });
  hapi.route({
    method: 'DELETE',
    path: '/lojas/{codLoja}',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }
      await controller.delete({
        codLoja,
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'POST',
    options: {
      payload: {
        allow: 'application/json',
        parse: true,
        output: 'data',
      },
    },
    path: '/lojas/{codLoja}/gestores',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }
      const { nome, cpf, funcao, numeroTelefone } = request.payload as Omit<
        Gestor,
        'codGestor'
      >;
      await controller.gestorController.create({
        codLoja: codLoja,
        cpf,
        funcao,
        nome,
        numeroTelefone,
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
    path: '/lojas/{codLoja}/gestores/{codGestor}',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }

      const codGestor = request.params.codGestor as string | undefined;
      if (!codGestor) {
        h.response().code(400);
        return;
      }

      const { cpf, funcao, nome, numeroTelefone } = request.payload as Omit<
        Gestor,
        'codGestor' | 'codLoja'
      >;
      await controller.gestorController.update({
        codGestor,
        gestor: {
          cpf,
          funcao,
          nome,
          numeroTelefone,
        },
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'GET',
    path: '/lojas/{codLoja}/gestores',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }
      return controller.gestorController.retrieve({ codLoja });
    },
  });
  hapi.route({
    method: 'GET',
    path: '/lojas/{codLoja}/gestores/{codGestor}',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }
      const codGestor = request.params.codGestor as string | undefined;
      if (!codGestor) {
        h.response().code(400);
        return;
      }
      return controller.gestorController.retrieve({ codLoja, codGestor });
    },
  });
  hapi.route({
    method: 'DELETE',
    path: '/lojas/{codLoja}/gestores/{codGestor}',
    handler: async (request, h) => {
      const codGestor = request.params.codGestor as string | undefined;
      if (!codGestor) {
        h.response().code(400);
        return;
      }

      await controller.gestorController.delete({
        codGestor,
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'POST',
    options: {
      payload: {
        allow: 'application/json',
        parse: true,
        output: 'data',
      },
    },
    path: '/lojas/{codLoja}/produtos',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }
      const { codProduto, preco, quantidade } =
        request.payload as ProdutosPostPayload;
      await controller.produtoLojaController.create({
        codLoja: codLoja,
        codProduto,
        preco,
        quantidade,
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
    path: '/lojas/{codLoja}/produtos/{codProduto}',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }

      const codProduto = request.params.codProduto as string | undefined;
      if (!codProduto) {
        h.response().code(400);
        return;
      }

      const { preco, quantidade } = request.payload as ProdutosPutPayload;
      await controller.produtoLojaController.update({
        codLoja,
        codProduto,
        preco,
        quantidade,
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'GET',
    path: '/lojas/{codLoja}/produtos',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }
      return controller.produtoLojaController.retrieve({ codLoja });
    },
  });
  hapi.route({
    method: 'GET',
    path: '/lojas/{codLoja}/produtos/{codProduto}',
    handler: async (request, h) => {
      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }
      const codProduto = request.params.codProduto as string | undefined;
      if (!codProduto) {
        h.response().code(400);
        return;
      }
      return controller.produtoLojaController.retrieve({ codLoja, codProduto });
    },
  });
  hapi.route({
    method: 'DELETE',
    path: '/lojas/{codLoja}/produtos/{codProduto}',
    handler: async (request, h) => {
      const codProduto = request.params.codProduto as string | undefined;
      if (!codProduto) {
        h.response().code(400);
        return;
      }

      const codLoja = request.params.codLoja as string | undefined;
      if (!codLoja) {
        h.response().code(400);
        return;
      }

      await controller.produtoLojaController.delete({
        codProduto,
        codLoja,
      });
      return 'Ok';
    },
  });
};
