'use strict';

const config = require('../../config');
const Hapi = require('hapi');
const database = require('./database');
const events = require('./events');
const ops = require('./ops');

const server = exports.server = new Hapi.Server();

server.connection({ port: config.port });
server.register([
  {
    register: ops,
    options: {
      ops: {
        interval: config.ops.monitoring.interval
      }
    }
  },
  {
    register: database,
    options: config.database
  },
  events
], (error) => {
  if (error) {
    server.log('Failed to load a plugin:', error);
  }
});
