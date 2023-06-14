const express = require('express');
const router = express.Router();
const BankAccountController = require('../controllers/bankAccountController');

// Get all bank accounts
router.get('/', BankAccountController.getAllBankAccounts);

// Get a bank account by ID
router.get('/:id', BankAccountController.getBankAccountById);

// Create a bank account
router.post('/', BankAccountController.createBankAccount);

// Update a bank account
router.put('/:id', BankAccountController.updateBankAccount);

// Delete a bank account
router.delete('/:id', BankAccountController.deleteBankAccount);

module.exports = router;
