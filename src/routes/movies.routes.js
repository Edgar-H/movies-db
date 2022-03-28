const express = require('express');
const {
  getAllMovies,
  getMovieById,
  deleteMovie,
  updateMovie,
  createNewMovie
} = require('../controllers/movies.controller');
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auh.controller');
const { upload } = require('../util/multer');

const router = express.Router();

// router.use(validateSession);
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
// router.use(protectAdmin);
router.post('/', upload.single('img'), createNewMovie);
router.patch('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = { moviesRouter: router };
