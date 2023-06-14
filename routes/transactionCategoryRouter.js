const express = require('express');
const router = express.Router();
const TransactionCategoryController = require('../controllers/transactionCategoryController');

// Get all transaction categories
router.get('/', TransactionCategoryController.getAllTransactionCategories);

// Get a single transaction category by ID
router.get('/:id', TransactionCategoryController.getTransactionCategoryById);

// Create a new transaction category
router.post('/', TransactionCategoryController.createTransactionCategory);

// Update a transaction category
router.put('/:id', TransactionCategoryController.updateTransactionCategory);

// Delete a transaction category
router.delete('/:id', TransactionCategoryController.deleteTransactionCategory);

module.exports = router;
