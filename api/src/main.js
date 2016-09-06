'use strict';

const server = require('./app').server;

server.start((error) => {
  if (error) throw error;
  console.log(`Server running at: ${server.info.uri}`);
});
