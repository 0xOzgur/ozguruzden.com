module.exports = {
    apps: [{
      name: "ozguruzden-server",
      script: "server/server.js",
      env_production: {
        NODE_ENV: "production"
      }
    }]
  }