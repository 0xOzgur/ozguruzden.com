module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/projects',
        handler: 'projects.find',
        config: {
          policies: [],
        },
      },
      // ...
    ],
  };