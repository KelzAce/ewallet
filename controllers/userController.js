const User = require('./../model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//registerUser

const registerUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // create a new user
  const newUser = new User({ email, password });

  const savedUser = await newUser.save();

  console.log(savedUser);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: savedUser,
  });

  console.log(savedUser);
});

// Get all users
const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get a single user by ID
const getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Create a new user
const createUser = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = new User({ firstName, lastName, email, password });
  await user.save();
  res.status(201).json(user);
});

// Update a user
const updateUser = catchAsync(async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, email },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(updatedUser);
});

// Delete a user
const deleteUser = catchAsync(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ message: 'User deleted successfully' });
});

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
