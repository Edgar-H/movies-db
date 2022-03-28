const express = require('express');
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews.controller');
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auh.controller');
const { upload } = require('../util/multer');

const router = express.Router();

// router.use(validateSession);
router.get('/', getAllReviews);
router.get('/:id', getReviewById);
// router.use(protectAdmin);
router.post('/', createReview);
router.patch('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = { moviesRouter: router };
