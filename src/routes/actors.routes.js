const express = require('express');
const {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deletedActor
} = require('../controllers/actors.controller');
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auh.controller');
const { upload } = require('../util/multer');

const router = express.Router();

router.get('/', getAllActors);
router.get('/:id', getActorById);
router.use(validateSession);
router.use(protectAdmin);
router.post('/', upload.single('profilePic'), createActor);
router.patch('/:id', updateActor);
router.delete('/:id', deletedActor);

module.exports = { actorsRouter: router };
