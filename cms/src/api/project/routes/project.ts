import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::project.project', {
  config: {
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
  },
});