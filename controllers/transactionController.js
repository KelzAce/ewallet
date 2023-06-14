const Transaction = require('../model/Transaction');
const catchAsync = require('../utils/catchAsync');

// Get all transactions
const getAllTransactions = catchAsync(async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

// Get a single transaction by ID
const getTransactionById = catchAsync(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  res.json(transaction);
});

// Create a new transaction
const createTransaction = catchAsync(async (req, res) => {
  const { amount, description, sender, receiver } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    sender,
    receiver,
  });
  await transaction.save();
  res.status(201).json(transaction);
});

// Update a transaction
const updateTransaction = catchAsync(async (req, res) => {
  const { amount, description, sender, receiver } = req.body;
  const updatedTransaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    { amount, description, sender, receiver },
    { new: true }
  );
  if (!updatedTransaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  res.json(updatedTransaction);
});

// Delete a transaction
const deleteTransaction = catchAsync(async (req, res) => {
  const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
  if (!deletedTransaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  res.json({ message: 'Transaction deleted successfully' });
});

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
