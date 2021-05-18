'use strict';
const axios = require('axios');
const options = {
  headers: {
    "authorization": "Bearer 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",
    "content-type": "application/json"
  }
}

module.exports = {
  async extractNewsletterEmails() {
    const newsletters = await strapi.services.newsletter.find();
    const activeContacts = newsletters.map(item => {
      return {email: item.email}
    });
    return JSON.stringify( {contacts: activeContacts});
  },

  async updateNewsletterList() {
    const newContacts = await this.extractNewsletterEmails();
    await axios.delete('https://api.sendgrid.com/v3/marketing/contacts?delete_all_contacts=true', options).then(
      () => {},
      (err) => {
        console.log(err.response.data.errors);
      }
    )
    await axios.put('https://api.sendgrid.com/v3/marketing/contacts', newContacts, options).then(
      () => {},
      (err) => {
        console.log(err.response.data.errors);
      }
    )
  }
};
