const multer = require('multer');

const { AppError } = require('../util/appError');

const storage = multer.memoryStorage();

const multerFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new AppError('Only image files are allowed!', 400));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: multerFileFilter
});

module.exports = { upload };
