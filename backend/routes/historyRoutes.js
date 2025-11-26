/**
 * History Routes
 * Defines API endpoints for story history management
 */

const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// POST /api/history/save
// Save a story to history
router.post('/save', historyController.saveStoryToHistory);

// GET /api/history
// Get all stories from history
router.get('/', historyController.getStoryHistory);

// GET /api/history/:id
// Get a single story by ID
router.get('/:id', historyController.getStoryById);

// DELETE /api/history/:id
// Delete a story by ID
router.delete('/:id', historyController.deleteStory);

module.exports = router;
