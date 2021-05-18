'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate() {
      await strapi.services.newsletter.updateNewsletterList()
    },

    async afterDelete() {
      await strapi.services.newsletter.updateNewsletterList()
    },

    async afterUpdate() {
      await strapi.services.newsletter.updateNewsletterList()
    }
  }
};
