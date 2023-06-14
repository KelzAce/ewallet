const Profile = require('../model/Profile');
const catchAsync = require('../utils/catchAsync');

// Get profile by user ID
const getProfileByUserId = catchAsync(async (req, res) => {
  const profile = await Profile.findOne({ userId: req.params.userId });
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(profile);
});

// Create or update profile
const createOrUpdateProfile = catchAsync(async (req, res) => {
  const { userId, address, phoneNumber, dateOfBirth, profilePicture } =
    req.body;
  let profile = await Profile.findOne({ userId });

  if (profile) {
    // Update existing profile
    profile.address = address;
    profile.phoneNumber = phoneNumber;
    profile.dateOfBirth = dateOfBirth;
    profile.profilePicture = profilePicture;
  } else {
    // Create new profile
    profile = new Profile({
      userId,
      address,
      phoneNumber,
      dateOfBirth,
      profilePicture,
    });
  }

  await profile.save();
  res.json(profile);
});

module.exports = {
  getProfileByUserId,
  createOrUpdateProfile,
};
