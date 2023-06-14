const Transaction = require('../model/Transaction');
const catchAsync = require('../utils/catchAsync');

// Get all transactions
const getAllTransactions = catchAsync(async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({
      success: true,
      message: 'All transactions gotten successfully',
      transactions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Get a single transaction by ID
const getTransactionById = catchAsync(async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json({
      success: true,
      message: `transaction with id:${id} gotten successfully`,
      transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Create a new transaction
const createTransaction = catchAsync(async (req, res) => {
  try {
    const { amount, description, sender, receiver } = req.body;
    const transaction = new Transaction({
      amount,
      description,
      sender,
      receiver,
    });
    await transaction.save();
    res.status(201).json({
      success: true,
      message: `transaction created successfully`,
      transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Update a transaction
const updateTransaction = catchAsync(async (req, res) => {
  try {
    const { amount, description, sender, receiver } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, description, sender, receiver },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json({
      success: true,
      message: `transaction updated successfully`,
      updateTransaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete a transaction
const deleteTransaction = catchAsync(async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json({
      success: true,
      message: `transaction deleted successfully`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
