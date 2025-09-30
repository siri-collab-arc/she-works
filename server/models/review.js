const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  images: [String],
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  }
}, { timestamps: true });

// Add index for efficient provider rating calculations
reviewSchema.index({ provider: 1, rating: 1 });

module.exports = mongoose.model('Review', reviewSchema);