import Hapi from '@hapi/hapi';
import { Endereco } from '../../../domain';
import EnderecoController from '../../controller/endereco';

export const registerEnderecoRoutes = (
  hapi: Hapi.Server,
  controller: EnderecoController
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
    path: '/enderecos',
    handler: async (request) => {
      const { cep, cidade, estado, numero, rua } = request.payload as Endereco;
      await controller.create({
        cep,
        cidade,
        estado,
        numero,
        rua,
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
    path: '/enderecos/{codEndereco}',
    handler: async (request, h) => {
      const codEndereco = request.params.codEndereco as string | undefined;
      if (!codEndereco) {
        h.response().code(400);
        return;
      }
      const { cep, cidade, estado, numero, rua } = request.payload as Endereco;
      await controller.update({
        codEndereco: codEndereco,
        endereco: {
          cep,
          cidade,
          estado,
          numero,
          rua,
        },
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'GET',
    path: '/enderecos',
    handler: async () => {
      return controller.retrieve({});
    },
  });
  hapi.route({
    method: 'GET',
    path: '/enderecos/{codEndereco}',
    handler: async (request, h) => {
      const codEndereco = request.params.codEndereco as string | undefined;
      if (!codEndereco) {
        h.response().code(400);
        return;
      }
      return controller.retrieve({ codEndereco });
    },
  });
  hapi.route({
    method: 'DELETE',
    path: '/enderecos/{codEndereco}',
    handler: async (request, h) => {
      const codEndereco = request.params.codEndereco as string | undefined;
      if (!codEndereco) {
        h.response().code(400);
        return;
      }
      await controller.delete({
        codEndereco,
      });
      return 'Ok';
    },
  });
};
