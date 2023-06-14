const Payment = require('../model/Payment');
const catchAsync = require('../utils/catchAsync');

// Get all payments
const getAllPayments = catchAsync(async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

// Get a payment by ID
const getPaymentById = catchAsync(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }
  res.json(payment);
});

// Create a payment
const createPayment = catchAsync(async (req, res) => {
  const { amount, walletId, bankAccountId } = req.body;
  const payment = new Payment({
    amount,
    walletId,
    bankAccountId,
  });
  await payment.save();
  res.status(201).json(payment);
});

// Update a payment
const updatePayment = catchAsync(async (req, res) => {
  const { amount, walletId, bankAccountId } = req.body;
  const updatedPayment = await Payment.findByIdAndUpdate(
    req.params.id,
    { amount, walletId, bankAccountId },
    { new: true }
  );
  if (!updatedPayment) {
    return res.status(404).json({ error: 'Payment not found' });
  }
  res.json(updatedPayment);
});

// Delete a payment
const deletePayment = catchAsync(async (req, res) => {
  const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
  if (!deletedPayment) {
    return res.status(404).json({ error: 'Payment not found' });
  }
  res.json({ message: 'Payment deleted successfully' });
});

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
