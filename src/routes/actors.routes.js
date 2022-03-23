const express = require('express');
const {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deletedActor
} = require('../controllers/actors.controller');
const { validateSession } = require('../middlewares/auh.controller');

const router = express.Router();

router.get('/', getAllActors);
router.get('/:id', getActorById);
router.post('/', validateSession, createActor);
router.patch('/:id', validateSession, updateActor);
router.delete('/:id', validateSession, deletedActor);

module.exports = { actorsRouter: router };
