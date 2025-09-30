const Payment = require('../models/payment');
const Order = require('../models/order');
// You'll need to install and import a payment gateway SDK here
// Example: const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize payment
exports.initializePayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify the user is the client of the order
    if (order.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to make payment for this order' });
    }

    // Here you would integrate with your payment gateway
    // Example with Stripe:
    /*
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.amount * 100, // Convert to smallest currency unit
      currency: 'inr',
      metadata: { orderId: order._id.toString() }
    });
    */

    const payment = new Payment({
      order: orderId,
      amount: order.amount,
      paymentMethod: 'card', // This would come from the payment gateway
      status: 'pending'
    });

    await payment.save();

    // Update order payment status
    order.paymentStatus = 'pending';
    // order.paymentId = paymentIntent.id;
    await order.save();

    res.json({
      payment,
      // clientSecret: paymentIntent.client_secret // This would come from payment gateway
    });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing payment', error: error.message });
  }
};

// Confirm payment
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { transactionId, paymentGatewayResponse } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Here you would verify the payment with your payment gateway
    // Example with Stripe:
    /*
    const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);
    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment not successful');
    }
    */

    payment.status = 'completed';
    payment.transactionId = transactionId;
    payment.paymentGatewayResponse = paymentGatewayResponse;
    await payment.save();

    // Update order payment status
    const order = await Order.findById(payment.order);
    order.paymentStatus = 'paid';
    await order.save();

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error confirming payment', error: error.message });
  }
};

// Process refund
exports.processRefund = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { reason, amount } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Here you would process the refund with your payment gateway
    // Example with Stripe:
    /*
    const refund = await stripe.refunds.create({
      payment_intent: payment.transactionId,
      amount: amount * 100
    });
    */

    payment.status = 'refunded';
    payment.refundDetails = {
      amount,
      reason,
      // transactionId: refund.id,
      date: new Date()
    };
    await payment.save();

    // Update order payment status
    const order = await Order.findById(payment.order);
    order.paymentStatus = 'refunded';
    await order.save();

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error processing refund', error: error.message });
  }
};

// Get payment details
exports.getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const payment = await Payment.findById(paymentId)
      .populate('order');
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment details', error: error.message });
  }
};