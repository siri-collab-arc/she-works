const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const paymentController = require('../controllers/paymentController');

// Initialize payment
router.post('/initialize', protect, paymentController.initializePayment);

// Confirm payment
router.post('/:paymentId/confirm', protect, paymentController.confirmPayment);

// Process refund
router.post('/:paymentId/refund', protect, paymentController.processRefund);

// Get payment details
router.get('/:paymentId', protect, paymentController.getPaymentDetails);

module.exports = router;