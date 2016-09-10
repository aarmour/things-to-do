'use strict';

const config = require('../../config');
const hapi = require('hapi');
const hapiSwagger = require('hapi-swagger');
const inert = require('inert');
const vision = require('vision');
const auth = require('./auth');
const database = require('./database');
const events = require('./events');
const ops = require('./ops');

const server = exports.server = new hapi.Server();

server.connection({ port: config.port });
server.register([
  inert,
  vision,
  {
    register: hapiSwagger,
    options: {
      info: {
        title: 'API Documentation',
        version: 'v1'
      }
    }
  },
  {
    register: ops,
    options: {
      ops: {
        interval: config.ops.monitoring.interval
      }
    }
  },
  {
    register: auth,
    options: config.auth
  },
  {
    register: database,
    options: config.database
  },
  events
], (error) => {
  if (error) {
    server.log(['error'], { message: 'Failed to load a plugin:', error });
  }
});
