/**
 * favorite controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::favorite.favorite', ({ strapi }) => ({
  // Extender con lógica personalizada
  async create(ctx) {
    const { user, place } = ctx.request.body.data;

    // Verificar si ya existe un favorito con la misma combinación de usuario y lugar
    const existingFavorites = await strapi.entityService.findMany('api::favorite.favorite', {
      filters: { user: user, place: place },
    });

    // Si ya existe, lanzar un error
    if (existingFavorites && existingFavorites.length > 0) {
      return ctx.badRequest('Este favorito ya existe.');
    }

    // Si no existe, utilizar el controlador base para crear el favorito
    const response = await super.create(ctx);
    return response;
  },
}));
