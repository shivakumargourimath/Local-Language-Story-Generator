/**
 * Main Express Server
 * Handles API requests for story generation and text-to-speech
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const storyRoutes = require('./routes/storyRoutes');
const historyRoutes = require('./routes/historyRoutes');

// Load environment variables
dotenv.config();

// Debug: Log environment variables
console.log('🔍 Environment check:');
console.log('  PORT:', process.env.PORT);
console.log('  GROQ_API_KEY:', process.env.GROQ_API_KEY ? 'Loaded' : 'NOT FOUND');
console.log('  ELEVENLABS_API_KEY:', process.env.ELEVENLABS_API_KEY ? `${process.env.ELEVENLABS_API_KEY.substring(0, 10)}...` : 'NOT FOUND');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', storyRoutes);
app.use('/api/history', historyRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    success: false
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📖 Story Generator API ready`);
});
