const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loggingIn
} = require('../controllers/users.controller');

const {
  validateSession,
  protectAdmin
} = require('../middlewares/auh.controller');

const router = express.Router();

router.post('/', createUser);
router.post('/login', loggingIn);

// router.use(validateSession);
router.patch('/:id', protectAccountOwner, updateUser);
// router.use(protectAdmin);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };
