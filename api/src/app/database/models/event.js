const DataTypes = require('sequelize');
const defaultColumnOptions = require('../shared').defaultColumnOptions;
const defaultTableOptions = require('../shared').defaultTableOptions;

module.exports = createEventModel;

/**
 * Creates the `Event` model.
 * @param  {Sequelize} database The Sequelize database instance.
 */
function createEventModel(database) {
  const columnOptions = Object.assign({}, defaultColumnOptions, {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 5000]
      }
    },
    centerGeometry: {
      field: 'center_geometry',
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: false
    }
  });

  const tableOptions = Object.assign({}, defaultTableOptions, {
    tableName: 'events'
  });

  const Event = database.define('event', columnOptions, tableOptions);

  return Event;
}
