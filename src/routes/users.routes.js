const express = require('express');
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');
const { validateSession } = require('../middlewares/auh.controller');

const router = express.Router();

router.get('/', validateSession, getAllUsers);
router.get('/:id', validateSession, getUserById);
router.post('/', createUser);
router.patch('/:id', validateSession, updateUser);
router.delete('/:id', validateSession, deleteUser);

module.exports = { usersRouter: router };
