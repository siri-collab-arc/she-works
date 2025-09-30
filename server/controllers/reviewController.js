const Review = require('../models/review');
const Order = require('../models/order');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;
    
    // Verify order exists and is completed
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed orders' });
    }

    // Verify the reviewer is the client of the order
    if (order.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to review this order' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ order: orderId });
    if (existingReview) {
      return res.status(400).json({ message: 'Review already exists for this order' });
    }

    const review = new Review({
      service: order.service,
      provider: order.provider,
      client: req.user._id,
      rating,
      comment,
      order: orderId
    });

    const savedReview = await review.save();
    await savedReview.populate('client provider service');

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

// Get reviews for a service provider
exports.getProviderReviews = async (req, res) => {
  try {
    const { providerId } = req.params;
    
    const reviews = await Review.find({ provider: providerId })
      .populate('client service')
      .sort('-createdAt');

    // Calculate average rating
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    res.json({
      reviews,
      averageRating: reviews.length > 0 ? averageRating : 0,
      totalReviews: reviews.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Get reviews for a specific service
exports.getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;
    
    const reviews = await Review.find({ service: serviceId })
      .populate('client')
      .sort('-createdAt');

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Verify the reviewer is the owner of the review
    if (review.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = rating;
    review.comment = comment;
    
    const updatedReview = await review.save();
    await updatedReview.populate('client provider service');

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};