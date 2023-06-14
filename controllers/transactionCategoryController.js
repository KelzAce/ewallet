const TransactionCategory = require('../model/TransactionCategory');
const catchAsync = require('../utils/catchAsync');

// Get all transaction categories
const getAllTransactionCategories = catchAsync(async (req, res) => {
  const transactionCategories = await TransactionCategory.find();
  res.json(transactionCategories);
});

// Get a single transaction category by ID
const getTransactionCategoryById = catchAsync(async (req, res) => {
  const transactionCategory = await TransactionCategory.findById(req.params.id);
  if (!transactionCategory) {
    return res.status(404).json({ error: 'Transaction category not found' });
  }
  res.json(transactionCategory);
});

// Create a new transaction category
const createTransactionCategory = catchAsync(async (req, res) => {
  const { name, description } = req.body;
  const transactionCategory = new TransactionCategory({ name, description });
  await transactionCategory.save();
  res.status(201).json(transactionCategory);
});

// Update a transaction category
const updateTransactionCategory = catchAsync(async (req, res) => {
  const { name, description } = req.body;
  const updatedTransactionCategory =
    await TransactionCategory.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
  if (!updatedTransactionCategory) {
    return res.status(404).json({ error: 'Transaction category not found' });
  }
  res.json(updatedTransactionCategory);
});

// Delete a transaction category
const deleteTransactionCategory = catchAsync(async (req, res) => {
  const deletedTransactionCategory =
    await TransactionCategory.findByIdAndDelete(req.params.id);
  if (!deletedTransactionCategory) {
    return res.status(404).json({ error: 'Transaction category not found' });
  }
  res.json({ message: 'Transaction category deleted successfully' });
});

module.exports = {
  getAllTransactionCategories,
  getTransactionCategoryById,
  createTransactionCategory,
  updateTransactionCategory,
  deleteTransactionCategory,
};
