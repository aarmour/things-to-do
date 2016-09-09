'use strict';

const listRoutes = require('./list/list.routes');
const searchRoutes = require('./search/search.routes');

exports.register = function(server, options, next) {

  server.dependency('ttd-database');

  const { database, models } = server.plugins['ttd-database'];

  server.bind({ database, models });

  server.route([
    ...listRoutes,
    ...searchRoutes
  ]);

  next();
};

exports.register.attributes = {
  name: 'ttd-events',
  version: '1.0.0'
};
