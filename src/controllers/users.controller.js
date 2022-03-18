const { User } = require('../models/user.model');
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll();
  if (!users || users.length === 0) {
    return next(new AppError(404, 'No users found'));
  }
  const filterUsers = users.filter((user) => user.status !== 'deleted');
  if (filterUsers.length === 0) {
    return next(new AppError(404, 'No users found'));
  }
  res.status(200).json({
    status: 'success',
    data: filterUsers
  });
});

// Get user by ID
const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return next(new AppError(404, `User not found with id ${id}`));
  }
  res.status(200).json({
    status: 'success',
    data: user
  });
});

// Save new user
const createUser = catchAsync(async (req, res) => {
  const { name, username, email, password } = req.body;
  if (
    !name ||
    !username ||
    !email ||
    !password ||
    name === 0 ||
    username === 0 ||
    email === 0 ||
    password === 0
  ) {
    return next(new AppError(400, 'All fields are required'));
  }

  const newUser = await User.create({ ...req.body });
  res.status(201).json({
    status: 'success',
    data: 'User created successfully'
  });
});

// Update user(PATCH) for user not admin
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = filterObj(req.body, ['name', 'username', 'email', 'password']);

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError(404, `User not found with id ${id}`));
  }
  await user.update({ ...data });
  res.status(201).json({ status: 'success', message: 'User updated' });
});

// Delete user
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return next(new AppError(404, `User not found with id ${id}`));
  }
  await user.update({ status: 'deleted' });
  res.status(201).json({ status: 'success', message: 'User deleted' });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
