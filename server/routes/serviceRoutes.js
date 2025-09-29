const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const serviceController = require('../controllers/serviceController');
const categories = require('../data/categories');
const Service = require('../models/service');

// ----------------- Service Routes -----------------

// Create new service (Provider)
router.post('/', protect, upload.array('images', 6), serviceController.createService);

// Update existing service
router.put('/:id', protect, upload.array('images', 6), serviceController.updateService);

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('provider', 'name email location profileImage');
    res.json(services);
  } catch (err) {
    console.error('Get all services error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get service categories
router.get('/categories', (req, res) => {
  res.json(categories);
});

// Get services by category & subservice
router.get('/category/:category/subservice/:subservice', async (req, res) => {
  try {
    const { category, subservice } = req.params;
    const services = await Service.find({
      title: { $regex: new RegExp(category, 'i') },
      subservices: { $in: [new RegExp(subservice, 'i')] },
    }).populate('provider', 'name email location profileImage');
    res.json(services);
  } catch (err) {
    console.error('Get services by category/subservice error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all services for a provider
router.get('/provider/:providerId', serviceController.getServicesByProvider);

// Get single service by ID
router.get('/:id', serviceController.getServiceById);

// Delete a service
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;
