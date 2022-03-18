const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database.config');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'active',
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'guest' // guest | admin
  }
});
