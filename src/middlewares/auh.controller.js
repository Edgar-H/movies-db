const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');

const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');
const { User } = require('../models/user.model');

dotenv.config({ path: './config.env' });

exports.validateSession = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    return next(new AppError(401, 'No token provided'));
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(new AppError(401, 'No token provided'));
  }
  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user still exists
  const user = await User.findOne({ where: { id: decoded.id } });
  if (!user && user.status !== 'active') {
    return next(new AppError(401, 'Invalid token'));
  }
  req.currentUser = user;
  return next();
});
