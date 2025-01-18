export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://ozguruzden.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    url: '/admin',
    autoOpen: false,
    watchIgnoreFiles: [
      '**/config/sync/**',
    ],
    serveAdminPanel: true,
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
});