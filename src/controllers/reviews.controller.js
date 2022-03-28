const dotenv = require('dotenv');
const { Review } = require('../models/review.model');

const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

dotenv.config({ path: './config.env' });

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.findAll({ where: { status: 'active' } });
  res.status(200).json({
    status: 'success',
    data: reviews
  });
});

exports.getReviewById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({ where: { id } });
  if (!review) {
    return next(new AppError(404, `Review not found with id ${id}`));
  }
  res.status(200).json({
    status: 'success',
    data: review
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { title, description, rating, status } = req.body;
  if (
    !title &&
    !description &&
    !rating &&
    !status &&
    title !== 0 &&
    description !== 0 &&
    rating !== 0 &&
    status !== 0
  ) {
    return next(new AppError(400, 'All fields are required'));
  }

  try {
    const review = await Review.create({
      title,
      description,
      rating,
      status
    });
    res.status(201).json({
      status: 'success',
      data: review
    });
  } catch (err) {
    return next(new AppError(400, 'Something went wrong'));
  }
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({ where: { id } });
  if (!review) {
    return next(new AppError(404, `Review not found with id ${id}`));
  }
  const { name, country, rating, age, status } = req.body;
  if (
    !name &&
    !country &&
    !rating &&
    !age &&
    !status &&
    name !== 0 &&
    country !== 0 &&
    rating !== 0 &&
    age !== 0 &&
    status !== 0
  ) {
    return next(new AppError(400, 'All fields are required'));
  }
  const updatedReview = await Review.update(
    {
      name,
      country,
      rating,
      age,
      status
    },
    { where: { id } }
  );
  res.status(200).json({
    status: 'success',
    data: updatedReview
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({ where: { id } });
  if (!review) {
    return next(new AppError(404, `Review not found with id ${id}`));
  }
  const updatedReview = await Review.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
    data: updatedReview
  });
});
