const mongoose = require('mongoose');

const transactionCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const TransactionCategory = mongoose.model(
  'TransactionCategory',
  transactionCategorySchema
);

module.exports = TransactionCategory;
