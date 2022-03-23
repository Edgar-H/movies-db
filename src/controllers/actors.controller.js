const { Actor } = require('../models/actor.model');
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

const getAllActors = catchAsync(async (req, res) => {
  const actors = await Actor.findAll();
  if (!actors || actors.length === 0) {
    return next(new AppError(404, 'No actors found'));
  }
  const filterActors = actors.filter((actor) => actor.status !== 'deleted');
  if (filterActors.length === 0) {
    return next(new AppError(404, 'No actors found'));
  }
  res.status(200).json({
    status: 'success',
    data: filterActors
  });
});

const getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({ where: { id } });
  if (!actor) {
    return next(new AppError(404, `Actor not found with id ${id}`));
  }
  res.status(200).json({
    status: 'success',
    data: actor
  });
});

const createActor = catchAsync(async (req, res, next) => {
  const { name, country, rating, age, profilePic, status } = req.body;
  if (
    !name ||
    !country ||
    !rating ||
    !age ||
    !profilePic ||
    !status ||
    name === 0 ||
    country === 0 ||
    rating === 0 ||
    age === 0 ||
    profilePic === 0 ||
    status === 0
  ) {
    return next(new AppError(400, 'All fields are required'));
  }

  const newActor = await Actor.create({ ...req.body });
  res.status(201).json({
    status: 'success',
    data: 'Actor created successfully'
  });
});

const updateActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, ['name', 'country', 'age']);

  const actor = await Actor.findOne({ where: { id } });
  if (!actor) {
    return next(new AppError(404, `Actor not found with id ${id}`));
  }

  await user.update({ ...data });
  res.status(200).json({
    status: 'success',
    message: 'Actor updated',
    data: { data }
  });
});

const deletedActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({ where: { id } });
  if (!actor) {
    return next(new AppError(404, `Actor not found with id ${id}`));
  }

  await user.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
    data: 'Actor deleted successfully'
  });
});

module.exports = {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deletedActor
};
