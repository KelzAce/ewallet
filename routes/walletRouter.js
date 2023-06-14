const express = require('express');
const router = express.Router();
const WalletController = require('../controllers/walletController');

// Get wallet by user ID
router.get('/:userId', WalletController.getWalletByUserId);

// Create wallet
router.post('/', WalletController.createWallet);

// Update wallet balance
router.put('/', WalletController.updateWalletBalance);

module.exports = router;
