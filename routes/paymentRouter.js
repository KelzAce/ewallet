const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

// Get all payments
router.get('/', PaymentController.getAllPayments);

// Get a payment by ID
router.get('/:id', PaymentController.getPaymentById);

// Create a payment
router.post('/', PaymentController.createPayment);

// Update a payment
router.put('/:id', PaymentController.updatePayment);

// Delete a payment
router.delete('/:id', PaymentController.deletePayment);

module.exports = router;
