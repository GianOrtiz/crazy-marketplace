import Hapi from '@hapi/hapi';
import StatsController from '../../controller/stats';

export const registerStatsRoutes = (
  hapi: Hapi.Server,
  controller: StatsController
) => {
  hapi.route({
    method: 'GET',
    path: '/stats/average_city_sells',
    handler: async () => {
      const averageCitySells = await controller.averageCitySells();
      return averageCitySells;
    },
  });
  hapi.route({
    method: 'GET',
    path: '/stats/average_product_prices',
    handler: async () => {
      const averageProdutoPrices = await controller.averageProductPrices();
      return averageProdutoPrices;
    },
  });
  hapi.route({
    method: 'GET',
    path: '/stats/total_product_sells',
    handler: async () => {
      const totalProductSells = await controller.totalProductSells();
      return totalProductSells;
    },
  });
};
