const express = require('express');
const {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deletedActor
} = require('../controllers/actors.controller');

const router = express.Router();

router.get('/', getAllActors);
router.get('/:id', getActorById);
router.post('/', createActor);
router.patch('/:id', updateActor);
router.delete('/:id', deletedActor);

module.exports = { actorsRouter: router };
