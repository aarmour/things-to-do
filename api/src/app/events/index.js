'use strict';

exports.register = function(server, options, next) {
  next();
};

exports.register.attributes = {
  name: 'ttd-events',
  version: '1.0.0'
};
