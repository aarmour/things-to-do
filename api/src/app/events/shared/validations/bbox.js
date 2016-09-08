'use strict';

const joi = require('joi');

module.exports = {
  bbox: joi.string()
    .description('Bounding box.')
};
