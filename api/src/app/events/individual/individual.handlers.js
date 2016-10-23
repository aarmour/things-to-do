'use strict';

const { notFound } = require('boom');
const isUUID = require('is-uuid').anyNonNil;

const DEFAULT_CRS = {
  type: 'name',
  properties: {
    name: 'EPSG:4326'
  }
};

exports.create = function(request, reply) {
  const { Event } = this.models;
  const event = request.payload;

  event.center_geometry.crs = DEFAULT_CRS;

  Event.create(request.payload)
    .then((event) => reply(null, event))
    .catch((error) => reply(error));
};

exports.read = function(request, reply) {
  const { Event } = this.models;
  const idProp = isUUID(request.params.id) ? 'id' : 'display_id';

  Event.findOne({ where: { [idProp]: request.params.id } })
    .then((event) => {
      if (event) reply(null, event);
      else reply(notFound());
    })
    .catch((error) => reply(error));
};

exports.update = function(request, reply) {
  reply('OK');
};

exports.delete = function(request, reply) {
  reply('OK');
};
