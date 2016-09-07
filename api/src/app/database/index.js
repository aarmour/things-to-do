'use strict';

const Sequelize = require('sequelize');

exports.register = function(server, options, next) {
  options = Object.assign({}, options, { dialect: 'postgres' });

  const {name, username, password} = options;
  const database = new Sequelize(name, username, password, options);

  server.expose('database', database);

  // Test the connection
  database.authenticate()
    .then(() => {
      server.log('Database connection successful');
      next();
    })
    .catch((error) => {
      server.log('Database connection failed:', error);
      next(error);
    });
};

exports.register.attributes = {
  name: 'ttd-database',
  version: '1.0.0'
};
