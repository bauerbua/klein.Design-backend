'use strict';
const axios = require('axios');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(data) {
      let newContact = JSON.stringify( {
        contacts: [
          {
            email: data.email
          }
        ]
      });
      const options = {
        headers: {
          "authorization": "Bearer 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",
          "content-type": "application/json"
        }
      }
      await axios.put('https://api.sendgrid.com/v3/marketing/contacts', newContact, options).then(
        () => {},
        (err) => {
          console.log(err.response.data.errors);
        }
      )
    }
  }
};
