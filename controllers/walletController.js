const Wallet = require('../model/Wallet');
const catchAsync = require('../utils/catchAsync');

// Get wallet by user ID
const getWalletByUserId = catchAsync(async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.params.userId });
  if (!wallet) {
    return res.status(404).json({ error: 'Wallet not found' });
  }
  res.json(wallet);
});

// Create wallet
const createWallet = catchAsync(async (req, res) => {
  const { userId, balance } = req.body;
  const wallet = new Wallet({ userId, balance });
  await wallet.save();
  res.status(201).json(wallet);
});

// Update wallet balance
const updateWalletBalance = catchAsync(async (req, res) => {
  const { userId, amount } = req.body;
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    return res.status(404).json({ error: 'Wallet not found' });
  }
  wallet.balance += amount;
  await wallet.save();
  res.json(wallet);
});

module.exports = {
  getWalletByUserId,
  createWallet,
  updateWalletBalance,
};
