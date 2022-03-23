const multer = require('multer');

const { AppError } = require('../util/appError');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads/');
//   },
//   filename: (req, file, cb) => {
//     console.log('Uploading file...');
//     console.table(file);
//     const [name, extension] = file.originalname.split('.');
//     const random = Math.floor(Math.random() * 10000);
//     cb(null, `${name}-${random}-${Date.now()}.${extension}`);
//   },
// });

const storage = multer.memoryStorage();

const multerFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new AppError('Only image files are allowed!', 400));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: multerFileFilter,
});

module.exports = { upload };
