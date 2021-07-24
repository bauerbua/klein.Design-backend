'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const {parseMultipartData, sanitizeEntity} = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const {data, files} = parseMultipartData(ctx);
      const {vorname, nachname, email, firmenname, beschreibung, tags, links, telefonnummer, standplatz} = data;
      strapi.services.aussteller.renameImages(files, data);
      if (data.newsletter) {
        await strapi.services.aussteller.addEmailToNewsletter(email);
      }
      entity = await strapi.services.aussteller.create(
        {
          vorname,
          nachname,
          email,
          tags,
          links,
          firmenname,
          beschreibung,
          telefonnummer,
          standplatz,
          published_at: null
        },
        { files });
    } else {
      const {vorname, nachname, email, firmenname, beschreibung, tags, links, telefonnummer, standplatz} = ctx.request.body;
      await strapi.services.aussteller.addEmailToNewsletter(email);
      entity = await strapi.services.aussteller.create({
        vorname,
        nachname,
        email,
        tags,
        links,
        firmenname,
        beschreibung,
        telefonnummer,
        standplatz,
        published_at: null
      });
    }
    return sanitizeEntity(entity, {model: strapi.models.aussteller});
  },
}
