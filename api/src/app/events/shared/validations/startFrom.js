'use strict';

const joi = require('joi');

module.exports = {
  start_from: joi.date()
    .iso()
    .description('Lower bound of the event start date.')
};
