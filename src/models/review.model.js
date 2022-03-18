const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database.config');

const Review = sequelize.define('review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { Review };
