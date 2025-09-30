const { ChatRoom, Message } = require('../models/chat');

// Create or get existing chat room
exports.createOrGetChatRoom = async (req, res) => {
  try {
    const { participantId, orderId } = req.body;
    
    // Check if chat room already exists
    let chatRoom = await ChatRoom.findOne({
      participants: { $all: [req.user._id, participantId] },
      order: orderId
    });

    if (!chatRoom) {
      chatRoom = new ChatRoom({
        participants: [req.user._id, participantId],
        order: orderId
      });
      await chatRoom.save();
    }

    await chatRoom.populate('participants', 'name profileImage');
    res.json(chatRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat room', error: error.message });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { text } = req.body;

    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    // Verify sender is a participant
    if (!chatRoom.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to send messages in this chat' });
    }

    const message = new Message({
      chatRoom: chatRoomId,
      sender: req.user._id,
      text
    });

    const savedMessage = await message.save();

    // Update chat room's last message
    chatRoom.lastMessage = {
      text,
      sender: req.user._id,
      timestamp: new Date()
    };
    await chatRoom.save();

    await savedMessage.populate('sender', 'name profileImage');
    
    // Here you would typically emit the message via Socket.IO
    // io.to(chatRoomId).emit('newMessage', savedMessage);

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

// Get chat messages
exports.getChatMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    // Verify user is a participant
    if (!chatRoom.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to view these messages' });
    }

    const messages = await Message.find({ chatRoom: chatRoomId })
      .populate('sender', 'name profileImage')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(limit);

    // Mark messages as read
    await Message.updateMany(
      { 
        chatRoom: chatRoomId,
        sender: { $ne: req.user._id },
        read: false
      },
      { read: true }
    );

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

// Get user's chat rooms
exports.getUserChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find({
      participants: req.user._id
    })
    .populate('participants', 'name profileImage')
    .populate('order')
    .sort('-updatedAt');

    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat rooms', error: error.message });
  }
};