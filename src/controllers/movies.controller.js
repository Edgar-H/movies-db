const { Movie } = require('../models/movie.model');
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

const getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll();
  if (!movies || movies.length === 0) {
    return next(new AppError(404, 'No movies found'));
  }
  const filterMovies = movies.filter((movie) => movie.status !== 'deleted');
  if (filterMovies.length === 0) {
    return next(new AppError(404, 'No movies found'));
  }
  res.status(200).json({
    status: 'success',
    data: filterMovies
  });
});

const getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({ where: { id } });
  if (!movie) {
    return next(new AppError(404, `Movie not found with id ${id}`));
  }
  res.status(200).json({
    status: 'success',
    data: movie
  });
});

const createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, img, genres } = req.body;
  if (
    !title ||
    !description ||
    !duration ||
    !rating ||
    !img ||
    !genres ||
    title === 0 ||
    description === 0 ||
    duration === 0 ||
    rating === 0 ||
    img === 0 ||
    genres === 0
  ) {
    return next(new AppError(400, 'All fields are required'));
  }

  const newMovie = await Movie.create({ ...req.body });
  res.status(201).json({
    status: 'success',
    message: 'Movie created successfully',
    data: newMovie
  });
});

const updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, [
    'title',
    'description',
    'duration',
    'img',
    'genres',
    'status'
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

const deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({ where: { id } });
  if (!movie) {
    return next(new AppError(404, `Movie not found with id ${id}`));
  }
  await movie.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
    message: 'Movie deleted successfully'
  });
});

module.exports = {
  getAllMovies,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie
};
