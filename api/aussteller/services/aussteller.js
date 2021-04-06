'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  renameImages(files, data) {
    for (let i = 0; i < files.fotos.length; i++) {
      const imgName = data.firmenname.replaceAll(/ /g, '_').toLocaleLowerCase();
      files.fotos[i].name = imgName + '_' + i
    }
    return files
  }

};
