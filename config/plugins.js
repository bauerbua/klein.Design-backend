module.exports = ({ env }) => ({
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
    actionOptions: {
      upload: {},
      delete: {},
    },
  },
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY', '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'),
    },
    settings: {
      defaultFrom: 'kleindesign.services@gmail.com',
      defaultReplyTo: 'kleindesign.services@gmail.com',
    },
  },
});
