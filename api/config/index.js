'use strict';

const path = require('path');
const convict = require('convict');
const schema = require('./schema');

const conf = convict(schema);
const env = conf.get('env');

conf.loadFile(path.resolve(__dirname, `./environment.${env}.json`));
try { conf.loadFile(path.resolve(__dirname, `../.local/environment.${env}.json`)); } catch(e) {}
conf.validate({ strict: true });

module.exports = conf.get();
