const Wallet = require('../model/Wallet');
const catchAsync = require('../utils/catchAsync');

// Get wallet by user ID
const getWalletByUserId = catchAsync(async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    res.status(200).json({
      success: true,
      message: 'wallet gotten successfully',
      wallet,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Create wallet
const createWallet = catchAsync(async (req, res) => {
  try {
    const { userId, balance } = req.body;
    const wallet = new Wallet({ userId, balance });
    await wallet.save();
    res.status(201).json({
      success: true,
      message: 'wallet created successfully',
      wallet,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Update wallet balance
const updateWalletBalance = catchAsync(async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    wallet.balance += amount;
    await wallet.save();

    res.status(200).json({
      success: true,
      message: 'wallet updated successfully',
      wallet,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = {
  getWalletByUserId,
  createWallet,
  updateWalletBalance,
};
