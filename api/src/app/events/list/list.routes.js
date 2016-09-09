'use strict';

const joi = require('joi');
const validations = require('../shared/validations');
const handlers = require('./list.handlers');

module.exports = [
  {
    method: 'GET',
    path: '/events',
    config: {
      handler: handlers.view,
      description: 'List events.',
      tags: ['api'],
      validate: {
        query: Object.assign({},
          validations.query.bbox,
          validations.query.startFrom,
          validations.query.startTo
        )
      }
    }
  }
];
