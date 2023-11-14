/**
 * favorite controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::favorite.favorite', ({ strapi }) => ({
  async create(ctx) {
    const { user, place } = ctx.request.body.data;

    // Verificar si ya existe un favorito con la misma combinación de usuario y lugar
    const existingFavorites = await strapi.entityService.findMany('api::favorite.favorite', {
      filters: { user: user, place: place },
    });
    
    if (existingFavorites && existingFavorites.length > 0) {
      return ctx.badRequest('Este favorito ya existe.');
    }

    const response = await super.create(ctx);
    return response;
  },
}));
