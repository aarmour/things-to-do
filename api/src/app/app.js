'use strict';

const Hapi = require('hapi');

const server = exports.server = new Hapi.Server();

server.connection({ port: 3000 });
