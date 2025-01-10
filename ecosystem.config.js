module.exports = {
  apps : [{
    name: "ozguruzden-server",
    script: "/var/www/ozguruzden.com/server/server.js",
    env_production: {
      NODE_ENV: "production"
    },
    instances: 1,
    exec_mode: "fork",
    max_memory_restart: '1G',
    autorestart: true,
    watch: false,
    max_restarts: 3,
    kill_timeout: 3000,
    min_uptime: '60s'
  }]
};