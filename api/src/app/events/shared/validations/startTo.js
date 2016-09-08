'use strict';

const joi = require('joi');

module.exports = {
  start_to: joi.date()
    .iso()
    .description('Upper bound of the event start date.')
};
