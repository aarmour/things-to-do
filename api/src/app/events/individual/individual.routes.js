'use strict';

const handlers = require('./individual.handlers');

module.exports = [
  {
    method: 'POST',
    path: '/events',
    config: {
      handler: handlers.create,
      description: 'Create a new event.',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/events/{id}',
    config: {
      handler: handlers.read,
      description: 'Get an individual event.',
      tags: ['api']
    }
  },
  {
    method: 'PUT',
    path: '/events/{id}',
    config: {
      handler: handlers.update,
      description: 'Update an event.',
      tags: ['api']
    }
  },
  {
    method: 'DELETE',
    path: '/events/{id}',
    config: {
      handler: handlers.delete,
      description: 'Delete an event.',
      tags: ['api']
    }
  }
];
