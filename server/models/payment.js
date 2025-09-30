const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  transactionId: String,
  paymentGatewayResponse: Object,
  refundDetails: {
    amount: Number,
    reason: String,
    transactionId: String,
    date: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);