'use strict';

const joi = require('joi');

module.exports = {
  id: {
    id: joi.string()
      .required()
      .description('The unique identifier of the event.')
  }
};
