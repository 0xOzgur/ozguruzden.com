// config/server.ts

import fs from 'fs';

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://ozguruzden.com/admin'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
  // HTTPS ayarları
  https: {
    key: fs.readFileSync('/etc/ssl/ozguruzden.com/private.key'),
    cert: fs.readFileSync('/etc/ssl/ozguruzden.com/fullchain.crt'),
  },
});