const { uploadFile } = require('../helpers/uploadFile');
const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorInMovie.model');
const { Movie } = require('../models/movie.model');

const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    includes: [{ model: Actor, through: ActorInMovie }]
  });
  res.status(200).json({
    status: 'success',
    data: movies
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: { id, status: 'active' },
    includes: [{ model: Actor, through: ActorInMovie }]
  });

  res.status(200).json({
    status: 'success',
    data: movie
  });
});

exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, genre, actors } = req.body;
  if (
    !title &&
    !description &&
    !duration &&
    !genre &&
    title === 0 &&
    description === 0 &&
    duration === 0 &&
    genre === 0
  ) {
    return next(new AppError(400, 'All fields are required'));
  }

  // upload image to firebase storage
  const [name, extension] = req.file.originalname.split('.');
  const urlImage = await uploadFile(
    req.file.buffer,
    `movies/${name}_${Date.now()}.${extension}`
  );

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    genre,
    img: urlImage
  });
  try {
    const actorsInMoviewPromise = actors.map(async (actorId) => {
      return await ActorInMovie.create({
        movieId: newMovie.id,
        actorId
      });
    });

    await Promise.all(actorsInMoviewPromise);

    res.status(201).json({
      status: 'success',
      message: 'Movie created successfully',
      data: newMovie
    });
  } catch (error) {
    console.log(error);
    next(new AppError(400, 'Something went wrong'));
  }
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, [
    'title',
    'description',
    'duration',
    'genres'
  ]);

  const movie = await Movie.findOne({ where: { id } });

  if (!movie) {
    return next(new AppError(404, `Movie not found with id ${id}`));
  }
  await movie.update({ ...data });
  res.status(200).json({
    status: 'success',
    message: 'Movie updated successfully',
    data: movie
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({ where: { id } });
  if (!movie) {
    return next(new AppError(404, `Movie not found with id ${id}`));
  }
  try {
    await movie.update({ status: 'deleted' });

    res.status(200).json({
      status: 'success',
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    return next(new AppError(500, 'Something went wrong'));
  }
});
