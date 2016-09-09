'use strict';

const defaults = require('../shared/defaults');

exports.view = function(request, reply) {
  const { Event } = this.models;

  Event.findAll({ limit: defaults.pageSize })
    .then((events) => reply(events))
    .catch(() => reply(new Error()));
};
