import Hapi from '@hapi/hapi';
import ClienteController from '../../controller/cliente';

type PostPayload = {
  codEndereco: string;
  nome: string;
  email: string;
};

type PutPayload = {
  nome: string;
  email: string;
};

export const registerClienteRoutes = (
  hapi: Hapi.Server,
  controller: ClienteController
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
    path: '/clientes',
    handler: async (request) => {
      const { codEndereco, email, nome } = request.payload as PostPayload;
      await controller.create({
        codEndereco,
        email,
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
    path: '/clientes/{codCliente}',
    handler: async (request, h) => {
      const codCliente = request.params.codCliente as string | undefined;
      if (!codCliente) {
        h.response().code(400);
        return;
      }
      const { email, nome } = request.payload as PutPayload;
      await controller.update({
        codCliente: codCliente,
        email,
        nome,
      });
      return 'Ok';
    },
  });
  hapi.route({
    method: 'GET',
    path: '/clientes',
    handler: async () => {
      return controller.retrieve({});
    },
  });
  hapi.route({
    method: 'GET',
    path: '/clientes/{codCliente}',
    handler: async (request, h) => {
      const codCliente = request.params.codCliente as string | undefined;
      if (!codCliente) {
        h.response().code(400);
        return;
      }
      return controller.retrieve({ codCliente });
    },
  });
  hapi.route({
    method: 'DELETE',
    path: '/clientes/{codCliente}',
    handler: async (request, h) => {
      const codCliente = request.params.codCliente as string | undefined;
      if (!codCliente) {
        h.response().code(400);
        return;
      }
      await controller.delete({
        codCliente,
      });
      return 'Ok';
    },
  });
};
