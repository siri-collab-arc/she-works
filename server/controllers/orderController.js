const Order = require('../models/order');
const Service = require('../models/service');
const Payment = require('../models/payment');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { serviceId, requestedDate, notes } = req.body;
    const service = await Service.findById(serviceId);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const order = new Order({
      service: serviceId,
      client: req.user._id,
      provider: service.provider,
      amount: service.price,
      requestedDate,
      notes
    });

    const savedOrder = await order.save();
    await savedOrder.populate('service provider client');
    
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, message } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify that only the provider can update the order
    if (order.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    order.status = status;
    order.trackingUpdates.push({
      status,
      message,
      timestamp: new Date()
    });

    if (status === 'completed') {
      order.completionDate = new Date();
    }

    const updatedOrder = await order.save();
    await updatedOrder.populate('service provider client');

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

// Get orders for a user (either as client or provider)
exports.getUserOrders = async (req, res) => {
  try {
    const { role } = req.query; // 'client' or 'provider'
    const query = role === 'provider' ? { provider: req.user._id } : { client: req.user._id };
    
    const orders = await Order.find(query)
      .populate('service provider client')
      .sort('-createdAt');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Get single order details
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('service provider client');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify that only the provider or client can view the order
    if (order.provider._id.toString() !== req.user._id.toString() && 
        order.client._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

// Get order tracking updates
exports.getOrderTracking = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .select('trackingUpdates status createdAt completionDate');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order tracking', error: error.message });
  }
};

// Get provider dashboard stats
exports.getProviderStats = async (req, res) => {
  try {
    const providerId = req.user._id;

    // Get total bookings count
    const totalBookings = await Order.countDocuments({ provider: providerId });

    // Get pending bookings count
    const pendingBookings = await Order.countDocuments({ 
      provider: providerId,
      status: { $in: ['pending', 'accepted'] }
    });

    // Get completed bookings count
    const completedBookings = await Order.countDocuments({
      provider: providerId,
      status: 'completed'
    });

    // Calculate total earnings from completed orders
    const earnings = await Order.aggregate([
      {
        $match: {
          provider: providerId,
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    res.json({
      totalBookings,
      pendingBookings,
      completedBookings,
      earnings: earnings.length > 0 ? earnings[0].total : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching provider stats', error: error.message });
  }
};