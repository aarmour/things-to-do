'use strict';

/**
 * Seeds the database for development. Note that we are not using
 * `sequelize-cli` for seeding due to limitations with the interface.
 */

const Sequelize = require('sequelize');
const config = require('../config');
const modelFactories = require('../src/app/database/models');
const data = {
  events: require('../data/seed/events.json')
};

const options = Object.assign({}, config.database, { dialect: 'postgres' });
const { name, username, password } = options;
const database = new Sequelize(name, username, password, options);

const models = {};
Object.keys(modelFactories).forEach((key) => {
  const createModel = modelFactories[key];
  models[key] = createModel(database);
});

const MetaSeed = database.define('metaSeed',
  {
    seeded: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: 'meta_seed'
  }
);

MetaSeed.sync()
  .then(() => MetaSeed.findOne())
  .then(row => { if (row) process.exit(0) })
  .then(seed)
  .then(updateMetadata)
  .then(() => process.exit(0))
  .catch(error => console.error('Failed to seed:', error));

function seed() {
  return models.Event.bulkCreate(data.events);
}

function updateMetadata() {
  return MetaSeed.create({ seeded: true });
}
