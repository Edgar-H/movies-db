import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './dev.env' });

const sequelize = new Sequelize({
  host: process.env.HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  logging: false,
});

export { sequelize };
