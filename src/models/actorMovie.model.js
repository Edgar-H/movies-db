import { DataTypes } from 'sequelize';
import { sequelize } from '../util/database.config.js';

const ActorMovie = sequelize.define('actorMovie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export { ActorMovie };
