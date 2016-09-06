'use strict';

const config = require('../../config');
const Hapi = require('hapi');
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
  events
], (error) => {
  if (error) {
    server.log('Failed to load a plugin:', error);
  }
});
