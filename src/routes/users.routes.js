const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/users.controller');

const { validateSession } = require('../middlewares/auh.controller');

const router = express.Router();

router.get('/', validateSession, getAllUsers);
router.get('/:id', validateSession, getUserById);
router.post('/', createUser);
router.patch('/:id', validateSession, updateUser);
router.delete('/:id', validateSession, deleteUser);
router.post('/login', loginUser);

module.exports = { usersRouter: router };
