const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

dotenv.config({ path: './config.env' });

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    where: { status: 'active' }
  });

  res.status(200).json({
    status: 'success',
    data: users
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] }
  });
  if (!user) {
    return next(new AppError(404, `User not found with id ${id}`));
  }
  res.status(200).json({
    status: 'success',
    data: user
  });
});

// Save new user
exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username &&
    !email &&
    !password &&
    username !== 0 &&
    email !== 0 &&
    password !== 0
  ) {
    return next(new AppError(400, 'All fields are required'));
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      data: newUser
    });
  } catch (err) {
    switch (err.errors[0].path) {
      case 'email':
        return next(new AppError(400, 'Email already exists'));
      case 'username':
        return next(new AppError(400, 'Username already exists'));
      default:
        return next(new AppError(400, 'Something went wrong'));
    }
  }
});

// Update user(PATCH) for user not admin
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.currentUser;

  const data = filterObj(req.body, ['username', 'email']);

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError(404, `User not found with id ${id}`));
  }

  await user.update({ ...data });
  res.status(201).json({ status: 'success', message: 'User updated' });
});

// Delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return next(new AppError(404, `User not found with id ${id}`));
  }
  await user.update({ status: 'deleted' });
  res.status(201).json({ status: 'success', message: 'User deleted' });
});

exports.loggingIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.trim() === 0) {
    return next(new AppError(400, 'Email is required'));
  }
  if (!password || password === 0) {
    return next(new AppError(400, 'Password is required'));
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(new AppError(404, 'Email invalid'));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new AppError(401, 'Invalid credentials'));
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    token,
    data: { token }
  });
});
