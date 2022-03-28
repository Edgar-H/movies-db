const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './dev.env' });

const sequelize = new Sequelize({
  host: process.env.HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false
});

module.exports = { sequelize };
