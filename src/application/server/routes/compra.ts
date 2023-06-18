import Hapi from '@hapi/hapi';
import CompraController from '../../controller/compra';
import { Compra } from '../../../domain/compra';

export type PutPayload = {
    valor: number;
    quantidade: number;
};

export const registerCompraRoutes = (
  hapi: Hapi.Server,
  controller: CompraController
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
    path: '/compras',
    handler: async (request) => {
      const { codCliente, codEndereco, codProduto, quantidade, valor } =
        request.payload as Omit<Compra, 'codCompra' | 'data'>;
      const data = new Date();
      await controller.create({
        codCliente,
        codEndereco,
        codProduto,
        data,
        quantidade,
        valor,
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
    path: '/compras/{codCompra}',
    handler: async (request, h) => {
      const codCompra = request.params.codCompra as string | undefined;
      if (!codCompra) {
        h.response().code(400);
        return;
      }
      const { quantidade, valor } = request.payload as PutPayload;
      await controller.update({
        codCompra: codCompra,
        quantidade,
        valor,
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'GET',
    path: '/compras',
    handler: async () => {
      return controller.retrieve({});
    },
  });
  hapi.route({
    method: 'GET',
    path: '/compras/{codCompra}',
    handler: async (request, h) => {
      const codCompra = request.params.codCompra as string | undefined;
      if (!codCompra) {
        h.response().code(400);
        return;
      }
      return controller.retrieve({ codCompra });
    },
  });
  hapi.route({
    method: 'DELETE',
    path: '/compras/{codCompra}',
    handler: async (request, h) => {
      const codCompra = request.params.codCompra as string | undefined;
      if (!codCompra) {
        h.response().code(400);
        return;
      }
      await controller.delete({
        codCompra,
      });
      return 'Ok';
    },
  });
};
