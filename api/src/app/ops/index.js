'use strict';

const good = require('good');

exports.register = function(server, options, next) {

  server.route({
    method: 'GET',
    path: '/status',
    handler(request, reply) {
      const timestamp = new Date().toISOString();
      reply(`OK ${timestamp}`);
    }
  });

  const loggingOptions = {
    ops: {
      interval: options.ops.interval
    },
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  };

  server.register({
    register: good,
    options: loggingOptions
  }, next);
};

exports.register.attributes = {
  name: 'ttd-ops',
  version: '1.0.0'
};
