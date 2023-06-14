const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');

// Get profile by user ID
router.get('/:userId', ProfileController.getProfileByUserId);

// Create or update profile
router.post('/', ProfileController.createOrUpdateProfile);

module.exports = router;
