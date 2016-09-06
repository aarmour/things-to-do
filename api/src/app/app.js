'use strict';

const config = require('../../config');
const Hapi = require('hapi');
const events = require('./events');

const server = exports.server = new Hapi.Server();

server.connection({ port: config.port });
server.register([
  events
], (error) => {
  if (error) {
    console.error('Failed to load a plugin:', error);
  }
});
