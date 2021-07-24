'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  renameImages(files, data) {
    if (!Array.isArray(files.fotos)) {
      files.fotos = [files.fotos];
    }
    for(let i = 0; i < files.fotos.length; i++) {
      const imgName = data.firmenname.replace(/\s/g, "_").toLocaleLowerCase();
      files.fotos[i].name = imgName + '_' + i
    }
    return files
  },

  async addEmailToNewsletter(email) {
    await strapi.services.newsletter.create({email});
  },

  async deleteLinkedImages(linkedImages) {
    if (linkedImages.length >= 1) {
      for (const foto of linkedImages) {
        const linkedImage = await strapi.plugins.upload.services.upload.fetch({id: foto.id});
        await strapi.plugins.upload.services.upload.remove(linkedImage);
      }
    }
  }

};
