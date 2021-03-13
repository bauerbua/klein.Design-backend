module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: { enabled: true },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '37bb4986b196b87bf792155fce870c7f'),
    },
  },
});
