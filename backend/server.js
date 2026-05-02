const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// 1. Get the URI from your .env file
const uri = process.env.MONGO_URI;

// 2. Add the Connection Logic
console.log("Attempting to connect to MongoDB..."); 

mongoose.connect(uri)
  .then(() => {
    console.log("✅ MongoDB connection established successfully!");
  })
  .catch(err => {
    console.log("❌ Initial MongoDB connection error. Check your password in .env");
    console.error(err);
  });

// 3. Monitor for errors after the initial connection
mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err}`);
});

// Base Route
app.get('/', (req, res) => {
  res.send('Team Task Manager API is running...');
});

// 4. Port Configuration for Deployment (Railway)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});