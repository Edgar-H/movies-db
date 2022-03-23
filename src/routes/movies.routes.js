const express = require('express');
const {
  getAllMovies,
  getMovieById,
  deleteMovie,
  updateMovie,
  createNewMovie
} = require('../controllers/movies.controller');
const { validateSession } = require('../middlewares/auh.controller');

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', validateSession, createNewMovie);
router.patch('/:id', validateSession, updateMovie);
router.delete('/:id', validateSession, deleteMovie);

module.exports = { moviesRouter: router };
