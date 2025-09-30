// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");
const path = require("path");


// ----------------- Connect to Database -----------------
connectDB();

// ----------------- Initialize App -----------------
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ----------------- Socket.IO -----------------
io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a chat room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Leave a chat room
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
  });

  // Handle new message
  socket.on('sendMessage', async ({ roomId, message, sender }) => {
    io.to(roomId).emit('newMessage', {
      message,
      sender,
      timestamp: new Date()
    });
  });

  // Handle typing status
  socket.on('typing', ({ roomId, user }) => {
    socket.to(roomId).emit('userTyping', user);
  });

  // Handle stop typing status
  socket.on('stopTyping', ({ roomId }) => {
    socket.to(roomId).emit('userStoppedTyping');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// ----------------- Middlewares -----------------
app.use(cors({
  origin: 'http://localhost:3000', // your React frontend
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());


// Configure helmet with specific settings
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);

// Serve uploads folder statically with custom headers
app.use("/uploads", (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Cross-Origin-Resource-Policy': 'cross-origin',
    'Cross-Origin-Embedder-Policy': 'unsafe-none'
  });
  next();
}, express.static(path.join(__dirname, "uploads")));

// ----------------- Routes -----------------
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const chatRoutes = require("./routes/chatRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/payments", paymentRoutes);

// Default route
app.get("/", (req, res) => res.send("SheWorks API is running... 🚀"));

// ----------------- Error Handling -----------------
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
