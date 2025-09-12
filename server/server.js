const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');  // 👈 use your db.js file

// Connect Database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('SheWorks API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
