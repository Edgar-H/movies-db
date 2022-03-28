const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database.config');

const Movie = sequelize.define('movie', {
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
  description: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'active',
    allowNull: false
  }
});

module.exports = { Movie };
