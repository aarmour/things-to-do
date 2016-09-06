'use strict';

const Hapi = require('hapi');
const events = require('./events');

const server = exports.server = new Hapi.Server();

server.connection({ port: 3000 });
server.register([
  events
], (error) => {
  if (error) {
    console.error('Failed to load a plugin:', error);
  }
});
