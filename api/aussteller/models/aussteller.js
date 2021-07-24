'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {

  lifecycles: {
    async afterDelete(data) {
      if (Array.isArray(data)) {
        for (const entry of data) {
          await strapi.services.aussteller.deleteLinkedImages(entry.fotos);
        }
      } else {
        await strapi.services.aussteller.deleteLinkedImages(data.fotos);
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
