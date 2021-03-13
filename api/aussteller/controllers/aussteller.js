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
      entity = await strapi.services.aussteller.create(data, { files });
    } else {
      const {vorname, nachname, email, titel, beschreibung} = ctx.request.body;
      entity = await strapi.services.aussteller.create({
        vorname,
        nachname,
        email,
        titel,
        beschreibung,
        published_at: null
      });
    }

    entity = sanitizeEntity(entity, {model: strapi.models.aussteller});

    await strapi.plugin['email'].services.email.send({
      to: 'bauerjakob17@gmail.com',
      from: 'bauer.j99@gmx.at',
      subject: 'BEWERBUNG AUSSTELLER',
      priority: 'high',
      text: ctx.request.body
    })

    return entity
  }
}
