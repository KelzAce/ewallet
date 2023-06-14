const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');

// Get all transactions
router.get('/', TransactionController.getAllTransactions);

// Get a single transaction by ID
router.get('/:id', TransactionController.getTransactionById);

// Create a new transaction
router.post('/', TransactionController.createTransaction);

// Update a transaction
router.put('/:id', TransactionController.updateTransaction);

// Delete a transaction
router.delete('/:id', TransactionController.deleteTransaction);

module.exports = router;
