'use strict';

const joi = require('joi');

module.exports = {
  name: {
    name: joi.string()
      .min(1)
      .max(100)
      .required()
      .description('The event name.')
  },
  description: {
    description: joi.string()
      .max(5000)
      .description('A description of the event.')
  },
  placeName: {
    place_name: joi.string()
      .required()
      .description('The name of the event location.')
  },
  centerGeometry: {
    center_geometry: joi.object()
      .required()
      .description('The event location. Must be a GeoJSON Point.')
  }
};
