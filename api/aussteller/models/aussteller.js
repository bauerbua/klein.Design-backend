'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {

  lifecycles: {
    async afterDelete(data) {
      // delete fotos
      if (data.fotos.length <= 1) {
        for (const foto of data.fotos) {
          if (foto.related.length <= 1) {
            const file = await strapi.plugins.upload.services.upload.fetch({id: foto.id});
            await strapi.plugins.upload.services.upload.remove(file);
          }
        }
      }
      // delete titelbild
      if (data.titelbild) {
        if (data.titelbild.related.length <= 1) {
          const file = await strapi.plugins.upload.services.upload.fetch({id: data.titelbild.id});
          await strapi.plugins.upload.services.upload.remove(file);
        }
      }
    },

    async afterCreate(data) {
      await strapi.plugins.email.services.email.send({
        to: 'bauerjakob17@gmail.com',
        template_id: "d-bdc39ab2085945458dbe93accf05facb",
        dynamic_template_data: {
          vorname: data.vorname,
          nachname: data.nachname,
          firmenname: data.firmenname,
          email: data.email,
          telefonnummer: data.telefonnummer,
          beschreibung: data.beschreibung,
          standplatz: data.standplatz
        }
      }).catch(err => {
        console.log(err);
      })
    }

  }
};
