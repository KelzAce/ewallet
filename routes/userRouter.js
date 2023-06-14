const router = require('express').Router();

const UserController = require('../controllers/userController');

//registration
router.post('/register', UserController.registerUser);

router.post('/login', UserController.loginUser);

// Get all users
router.get('/', UserController.getAllUsers);

// Get a single user by ID
router.get('/:id', UserController.getUserById);

// Create a new user
router.post('/', UserController.createUser);

// Update a user
router.put('/:id', UserController.updateUser);

// Delete a user
router.delete('/:id', UserController.deleteUser);

module.exports = router;
