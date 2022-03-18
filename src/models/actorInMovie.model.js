const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database.config');

const ActorInMovie = sequelize.define('actorInMovie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { ActorInMovie };
