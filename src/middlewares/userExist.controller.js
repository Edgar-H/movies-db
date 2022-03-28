const { User } = require('../models/user');
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['password'] }
  });
  if (!user) {
    return next(new AppError(404, `User not found with id ${id}`));
  }
  req.user = user;
  next();
});
