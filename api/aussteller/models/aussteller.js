'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {

  lifecycles: {
    async afterDelete(data) {
      // delete titelbild
      if (data.titelbild.related.length <= 1) {
        const file = await strapi.plugins.upload.services.upload.fetch({id: data.titelbild.id});
        await strapi.plugins.upload.services.upload.remove(file);
      }

      // delete fotos
      for (const foto of data.fotos) {
        if (foto.related.length <= 1) {
          const file = await strapi.plugins.upload.services.upload.fetch({id: foto.id});
          await strapi.plugins.upload.services.upload.remove(file);
        }
      }
    },

    async afterCreate(data) {
      /*await strapi.plugins.email.services.email.send({
        to: 'bauerjakob17@gmail.com',
        from: 'bauer.j99@gmx.at',
        subject: 'BEWERBUNG AUSSTELLER',
        priority: 'high',
        text: 'email sent via strapi'
      });*/
    }

  }
};
