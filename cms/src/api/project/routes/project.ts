/**
 * project router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::project.project', {
  routes: [
    {
      method: 'GET',
      path: '/projects',
      handler: 'projects.find',
      config: {
        policies: [],
      },
    },
  ],
});