'use strict';

const DataTypes = require('sequelize');
const shortid = require('shortid');

module.exports = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  display_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: shortid.generate
  }
};
