'use strict';

const joi = require('joi');

module.exports = {
  bbox: {
    bbox: joi.string()
      .description('Bounding box.')
  },
  startFrom: {
    start_from: joi.date()
      .iso()
      .description('Lower bound of the event start date.')
  },
  startTo: {
    start_to: joi.date()
      .iso()
      .description('Upper bound of the event start date.')
  }
};
