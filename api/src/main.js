'use strict';

const server = require('./app').server;

server.start((error) => {
  if (error) throw error;
  server.log(['info'], { message: `Server running at: ${server.info.uri}` });
});
