const User = require('./../model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const registerUser = catchAsync(async (req, res) => {
  try {
    //check if user already exists
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      throw new Error('User already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //save new user
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.send({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

const loginUser = async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error('User does not exist');
    }

    //compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      throw new Error('Invalid password');
    }

    //create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: '1d',
    });

    //send response
    res.send({
      success: true,
      message: 'User logged in successfully',
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       throw new Error('Invalid email or password');
//     }

//     // Compare the provided password with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       throw new Error('Invalid email or password');
//     }

//     res.send({
//       success: true,
//       message: 'Login successful',
//       user: {
//         email: user.email,
//         firstname: user.firstname,
//         // Include any additional user data you want to send in the response
//       },
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

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
  loginUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
