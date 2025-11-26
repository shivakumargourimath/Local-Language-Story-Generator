/**
 * Story Routes
 * Defines API endpoints for story generation and audio conversion
 */

const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');

// POST /api/generate-story
// Generate a personalized story using Groq AI
router.post('/generate-story', storyController.generateStory);

// POST /api/generate-audio
// Convert story text to speech using ElevenLabs
router.post('/generate-audio', storyController.generateAudio);

module.exports = router;
