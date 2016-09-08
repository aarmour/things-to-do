'use strict';

const path = require('path');
const config = require('./');

module.exports = {
  [config.env]: {
    url: formatConnectionString(config.database),
    migrationStorageTableName: 'meta_migrations'
  }
};

console.log(module.exports[config.env]);

function formatConnectionString(options) {
  const { username, password, host, port, name } = options;
  return `postgres://${username}${password ? `:${password}` : ''}@${host}${port ? `:${port}` : ''}/${name}`;
}
