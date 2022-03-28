const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../util/firebase.config');

const uploadFile = async (file, filePath) => {
  try {
    const uploadRef = ref(storage, filePath);
    await uploadBytes(uploadRef, file);
    const downloadUrl = await getDownloadURL(uploadRef);
    return downloadUrl;
  } catch (err) {
    console.log(err);
    next(new AppError(500, 'Error uploading file'));
  }
};

module.exports = { uploadFile };
