'use strict';

const path = require('path');
const convict = require('convict');
const schema = require('./schema');

const conf = convict(schema);
const env = conf.get('env');

conf.loadFile(path.resolve(__dirname, `./environment.${env}.json`));
conf.validate({ strict: true });

module.exports = conf.get();
