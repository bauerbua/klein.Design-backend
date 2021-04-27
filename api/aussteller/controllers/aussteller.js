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
      const {vorname, nachname, email, firmenname, beschreibung, tags, links, telefonnummer} = data;
      strapi.services.aussteller.renameImages(files, data);
      entity = await strapi.api.aussteller.services.aussteller.create(
        {
          vorname,
          nachname,
          email,
          tags,
          links,
          firmenname,
          beschreibung,
          telefonnummer,
          // standplatz,
          published_at: null
        },
        { files });
    } else {
      const {vorname, nachname, email, firmenname, beschreibung, tags, links, standplatz, telefonnummer} = ctx.request.body;
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

    // ToDo: How to handle if request passes but sending email fails? It shouldn't return an error to client...
    /*await strapi.plugins.email.services.email.send({
      to: 'bauerjakob17@gmail.com',
      from: 'bauer.j99@gmx.at',
      subject: 'BEWERBUNG AUSSTELLER',
      priority: 'high',
      text: 'email sent via strapi'
    })*/

    return sanitizeEntity(entity, {model: strapi.models.aussteller});
  },
}
