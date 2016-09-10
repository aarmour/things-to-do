'use strict';

const handlers = require('./individual.handlers');
const validations = require('../shared/validations');

module.exports = [
  {
    method: 'POST',
    path: '/events',
    config: {
      handler: handlers.create,
      description: 'Create a new event.',
      tags: ['api'],
      auth: 'token',
      validate: {
        payload: Object.assign({},
          validations.payload.name,
          validations.payload.description,
          validations.payload.placeName,
          validations.payload.centerGeometry
        )
      }
    }
  },
  {
    method: 'GET',
    path: '/events/{id}',
    config: {
      handler: handlers.read,
      description: 'Get an individual event.',
      tags: ['api'],
      validate: {
        params: Object.assign({},
          validations.params.id
        )
      }
    }
  },
  {
    method: 'PUT',
    path: '/events/{id}',
    config: {
      handler: handlers.update,
      description: 'Update an event.',
      tags: ['api'],
      auth: 'token',
      validate: {
        params: Object.assign({},
          validations.params.id
        ),
        payload: Object.assign({},
          validations.payload.name,
          validations.payload.description,
          validations.payload.placeName,
          validations.payload.centerGeometry
        )
      }
    }
  },
  {
    method: 'DELETE',
    path: '/events/{id}',
    config: {
      handler: handlers.delete,
      description: 'Delete an event.',
      tags: ['api'],
      auth: 'token',
      validate: {
        params: Object.assign({},
          validations.params.id
        )
      }
    }
  }
];
