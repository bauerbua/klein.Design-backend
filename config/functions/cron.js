'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */
const http = require("http");

module.exports = {
  '*/25 7-22 * * *': () => {
    console.log('PINGING STRAPI');
    const options = {
      host: 'klein-design-backend.herokuapp.com',
      path: '' };
    http.get(options, function(res) {
      console.log(res.statusCode, res.statusMessage)
    })
  }
};
