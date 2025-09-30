const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// Create new order
router.post('/', protect, orderController.createOrder);

// Update order status
router.put('/:orderId/status', protect, orderController.updateOrderStatus);

// Get user's orders (as client or provider)
router.get('/user', protect, orderController.getUserOrders);

// Get single order details
router.get('/:orderId', protect, orderController.getOrderById);

// Get order tracking
router.get('/:orderId/tracking', protect, orderController.getOrderTracking);

// Get provider dashboard stats
router.get('/provider/stats', protect, orderController.getProviderStats);

module.exports = router;