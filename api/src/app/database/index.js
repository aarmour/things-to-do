'use strict';

const Sequelize = require('sequelize');
const modelFactoryFns = require('./models');

exports.register = function(server, options, next) {
  options = Object.assign({}, options, { dialect: 'postgres' });

  const {name, username, password} = options;
  const database = new Sequelize(name, username, password, options);
  const models = {};

  server.expose('database', database);
  server.expose('models', models);

  Object.keys(modelFactoryFns).forEach((key) => {
    const createModel = modelFactoryFns[key];
    models[key] = createModel(database);
  });

  database.sync()
    .then(() => {
      server.log(['info'], { message: 'Database sync successful' });
      next();
    })
    .catch((error) => {
      server.log(['error'], { message: 'Database sync failed.', error });
      next(error);
    });
};

exports.register.attributes = {
  name: 'ttd-database',
  version: '1.0.0'
};
