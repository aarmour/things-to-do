'use strict';

const authJwt = require('hapi-auth-jwt2');

exports.register = function(server, options, next) {
  server.register(authJwt, (error) => {
    if (error) return next(error);

    server.auth.strategy('token', 'jwt', {
      // key: new Buffer(options.clientSecret, 'base64'),
      key: options.clientSecret,
      validateFunc: validate,
      verifyOptions: {
        algorithms: ['HS256'],
        audience: options.clientId
      }
    });

    function validate(decoded, request, callback) {
      // TODO
      callback(null, true);
    }

    next();
  });
};

exports.register.attributes = {
  name: 'ttd-auth',
  version: '1.0.0'
};
