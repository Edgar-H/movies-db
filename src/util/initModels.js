import { User } from '../models/user.model.js';
import { Review } from '../models/review.model.js';
import { ActorMovie } from '../models/actorMovie.model.js';
import { Actor } from '../models/actor.model.js';
import { Movie } from '../models/movie.model.js';

export const initModels = () => {
  // 1 movie <- many actorsMovie
  Movie.hasMany(ActorMovie);
  ActorMovie.belongsTo(Movie);

  // 1 actor <- many movies
  Actor.hasMany(Movie);
  Movie.belongsTo(Actor);

  // 1 Movie <-> many comments
  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  // 1 User <-> many Review
  User.hasMany(Review);
  Review.belongsTo(User);
};
