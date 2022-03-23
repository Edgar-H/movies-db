const { ref, uploadBytes } = require('firebase/storage');

const { Movie } = require('../models/movie.model');
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');
import { storage } from '../util/firebase';

exports.getAllMovies = catchAsync(async (req, res, next) => {
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

exports.getMovieById = catchAsync(async (req, res, next) => {
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

exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, genres } = req.body;
  if (
    !title &&
    !description &&
    !duration &&
    !genres &&
    title === 0 &&
    description === 0 &&
    duration === 0 &&
    genres === 0
  ) {
    return next(new AppError(400, 'All fields are required'));
  }

  // upload image to firebase storage
  const [name, extension] = req.file.originalname.split('.');
  const imageName = `${name}_${Date.now()}.${extension}`;
  const uploadRef = ref(storage, `images/${imageName}`);
  const uploadImage = await uploadBytes(uploadRef, req.file.buffer);

  const newMovie = await Movie.create({
    ...req.body,
    img: uploadImage.metadata.fullPath
  });
  res.status(201).json({
    status: 'success',
    message: 'Movie created successfully',
    data: newMovie
  });
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
  await movie.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
    message: 'Movie deleted successfully'
  });
});
