const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

// Create or get chat room
router.post('/rooms', protect, chatController.createOrGetChatRoom);

// Send message
router.post('/rooms/:chatRoomId/messages', protect, chatController.sendMessage);

// Get chat messages
router.get('/rooms/:chatRoomId/messages', protect, chatController.getChatMessages);

// Get user's chat rooms
router.get('/rooms', protect, chatController.getUserChatRooms);

module.exports = router;