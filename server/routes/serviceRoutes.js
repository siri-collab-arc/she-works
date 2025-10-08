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
    const decodedCategory = decodeURIComponent(category);
    const decodedSubservice = decodeURIComponent(subservice);
    
    console.log('Request received:', { 
      method: 'GET',
      path: req.path,
      params: {
        category: decodedCategory,
        subservice: decodedSubservice
      },
      query: req.query
    });
    
    // First, let's check if there are any services at all
    const allServices = await Service.find({});
    console.log('Total services in database:', allServices.length);
    
    // Log services with matching category
    const servicesInCategory = await Service.find({
      title: { $regex: new RegExp(decodedCategory, 'i') }
    });
    console.log('Services in category:', {
      category: decodedCategory,
      count: servicesInCategory.length,
      services: servicesInCategory.map(s => ({
        title: s.title,
        subservices: s.subservices
      }))
    });
    
    // Log some example services to understand the data structure
    if (allServices.length > 0) {
      console.log('Example service:', {
        title: allServices[0].title,
        subservices: allServices[0].subservices
      });
    }

    // Now try to find the specific services
    const query = {
      title: { $regex: new RegExp(decodedCategory, 'i') },
      subservices: { $in: [new RegExp('^' + decodedSubservice + '$', 'i')] }
    };
    console.log('MongoDB query:', JSON.stringify(query));
    
    const services = await Service.find(query)
      .populate('provider', 'name email location profileImage');
    
    console.log('Found matching services:', services.length);
    
    if (services.length === 0) {
      console.log('No services found for query:', {
        category: decodedCategory,
        subservice: decodedSubservice,
        availableServices: servicesInCategory.map(s => ({
          title: s.title,
          subservices: s.subservices
        }))
      });
      
      // Check if the category exists but the subservice doesn't
      if (servicesInCategory.length > 0) {
        return res.status(404).json({ 
          message: 'Subservice not found in this category',
          availableSubservices: servicesInCategory.reduce((acc, s) => [...acc, ...s.subservices], [])
        });
      }
      
      return res.status(404).json({ 
        message: 'No services found for this category and subservice' 
      });
    }
    
    res.json(services);
  } catch (err) {
    console.error('Get services by category/subservice error:', {
      error: err.message,
      stack: err.stack,
      category,
      subservice
    });
    res.status(500).json({ 
      message: 'Server error', 
      error: err.message,
      details: {
        category,
        subservice,
        errorType: err.name
      }
    });
  }
});

// Get all services for a provider
router.get('/provider/:providerId', serviceController.getServicesByProvider);

// Get single service by ID
router.get('/:id', serviceController.getServiceById);

// Delete a service
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;
