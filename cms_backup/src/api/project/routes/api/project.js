module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/projects',
        handler: 'project.find',
        config: {
          policies: [],
          auth: false
        }
      },
      {
        method: 'GET',
        path: '/projects/:id',
        handler: 'project.findOne',
        config: {
          policies: [],
          auth: false
        }
      },
      {
        method: 'POST',
        path: '/projects',
        handler: 'project.create',
        config: {
          policies: [],
          auth: false
        }
      }
    ]
  };