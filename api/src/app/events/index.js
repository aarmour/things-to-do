'use strict';

const listRoutes = require('./list/list.routes');
const individualRoutes = require('./individual/individual.routes');
const searchRoutes = require('./search/search.routes');

exports.register = function(server, options, next) {
  const { database, models } = server.plugins['ttd-database'];

  server.bind({ database, models });

  server.route([
    ...listRoutes,
    ...individualRoutes,
    ...searchRoutes
  ]);

  next();
};

exports.register.attributes = {
  name: 'ttd-events',
  version: '1.0.0',
  dependencies: ['ttd-auth', 'ttd-database']
};
