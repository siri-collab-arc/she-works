const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

// Create new review
router.post('/', protect, reviewController.createReview);

// Get reviews for a provider
router.get('/provider/:providerId', reviewController.getProviderReviews);

// Get reviews for a service
router.get('/service/:serviceId', reviewController.getServiceReviews);

// Update a review
router.put('/:reviewId', protect, reviewController.updateReview);

module.exports = router;