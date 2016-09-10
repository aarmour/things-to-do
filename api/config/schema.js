'use strict';

module.exports = {
  auth: {
    clientId: {
      doc: 'Auth0 client ID.',
      format: String,
      default: '',
      env: 'AUTH_CLIENT_ID'
    },
    clientSecret: {
      doc: 'Auth0 client secret.',
      format: String,
      default: '',
      env: 'AUTH_CLIENT_SECRET'
    }
  },
  database: {
    host: {
      doc: 'The PostgreSQL database host.',
      format: String,
      default: 'localhost',
      env: 'DATABASE_HOST'
    },
    port: {
      doc: 'The PostgreSQL database port.',
      format: 'port',
      default: 3001,
      env: 'DATABASE_PORT'
    },
    name: {
      doc: 'The PostgreSQL database name.',
      format: String,
      default: 'ttd',
      env: 'DATABASE_NAME'
    },
    username: {
      doc: 'The PostgreSQL user name.',
      format: String,
      default: 'ttd',
      env: 'DATABASE_USERNAME'
    },
    password: {
      doc: 'The PostgreSQL password.',
      format: String,
      default: '',
      env: 'DATABASE_PASSWORD'
    }
  },
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development'],
    default: 'development',
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
