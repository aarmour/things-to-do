'use strict';

module.exports = {
  env: {
    doc: 'The applicaton environment.',
    format: ['prod', 'dev'],
    default: 'dev',
    env: 'NODE_ENV'
  },
  ops: {
    monitoring: {
      interval: {
        doc: 'The number of seconds to wait between each data sampling.',
        format: 'nat',
        default: 30 * 60
      }
    }
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  }
};
