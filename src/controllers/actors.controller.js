const { Actor } = require('../models/actor.model');
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({ where: { status: 'active' } });
  res.status(200).json({
    status: 'success',
    data: actors
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
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

exports.createActor = catchAsync(async (req, res, next) => {
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

  try {
    const [name, extension] = req.file.originalname.split('.');
    const urlImage = await uploadFile(
      req.file.buffer,
      `actors/${name}_${Date.now()}.${extension}`
    );

    const actor = await Actor.create({
      name,
      country,
      rating,
      age,
      profilePic: urlImage,
      status
    });
    res.status(201).json({
      status: 'success',
      data: actor
    });
  } catch (err) {
    next(new AppError(400, 'omething went wrong'));
  }
});

exports.updateActor = catchAsync(async (req, res, next) => {
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

exports.deletedActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({ where: { id } });
  if (!actor) {
    return next(new AppError(404, `Actor not found with id ${id}`));
  }

  try {
    await user.update({ status: 'deleted' });

    res.status(200).json({
      status: 'success',
      data: 'Actor deleted successfully'
    });
  } catch (error) {
    next(new AppError(400, 'Something went wrong'));
  }
});
