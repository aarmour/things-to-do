'use strict';

const joi = require('joi');
const validations = require('../shared/validations');
const handlers = require('./search.handlers');

module.exports = [
  {
    method: 'GET',
    path: '/events/search/{query}',
    config: {
      handler: handlers.view,
      description: 'Search events.',
      tags: ['api'],
      validate: {
        params: {
          query: joi.string()
            .required()
            .description('Search query.')
        },
        query: Object.assign({},
          validations.query.bbox,
          validations.query.startFrom,
          validations.query.startTo
        )
      }
    }
  }
];
