const BankAccount = require('../model/bankAccount');
const catchAsync = require('../utils/catchAsync');

// Get all bank accounts
const getAllBankAccounts = catchAsync(async (req, res) => {
  const bankAccounts = await BankAccount.find();
  res.json(bankAccounts);
});

// Get a bank account by ID
const getBankAccountById = catchAsync(async (req, res) => {
  const bankAccount = await BankAccount.findById(req.params.id);
  if (!bankAccount) {
    return res.status(404).json({ error: 'Bank account not found' });
  }
  res.json(bankAccount);
});

// Create a bank account
const createBankAccount = catchAsync(async (req, res) => {
  const { accountNumber, accountHolderName, bankName } = req.body;
  const bankAccount = new BankAccount({
    accountNumber,
    accountHolderName,
    bankName,
  });
  await bankAccount.save();
  res.status(201).json(bankAccount);
});

// Update a bank account
const updateBankAccount = catchAsync(async (req, res) => {
  const { accountNumber, accountHolderName, bankName } = req.body;
  const updatedBankAccount = await BankAccount.findByIdAndUpdate(
    req.params.id,
    { accountNumber, accountHolderName, bankName },
    { new: true }
  );
  if (!updatedBankAccount) {
    return res.status(404).json({ error: 'Bank account not found' });
  }
  res.json(updatedBankAccount);
});

// Delete a bank account
const deleteBankAccount = catchAsync(async (req, res) => {
  const deletedBankAccount = await BankAccount.findByIdAndDelete(req.params.id);
  if (!deletedBankAccount) {
    return res.status(404).json({ error: 'Bank account not found' });
  }
  res.json({ message: 'Bank account deleted successfully' });
});

//Right here i was trying to build an endpoint for a limit for accounts with Type savings

// const accountLimit = catchAsync(async (req, res) => {
//   try {
//     const accountLimit = await BankAccount.find({});

//   } catch (error) {}
// });

module.exports = {
  getAllBankAccounts,
  getBankAccountById,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
  // accountLimit,
};
