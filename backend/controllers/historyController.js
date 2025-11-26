/**
 * History Controller
 * Handles story history management endpoints
 */

const storageService = require('../services/storageService');

/**
 * Save a story to history
 */
const saveStoryToHistory = async (req, res) => {
  try {
    const { name, age, language, moral, story } = req.body;

    // Validate input
    if (!name || !age || !language || !moral || !story) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    console.log(`💾 Saving story for ${name} to history`);

    // Save story
    const savedStory = await storageService.saveStory({
      name,
      age,
      language,
      moral,
      story
    });

    res.json({
      success: true,
      story: savedStory
    });

  } catch (error) {
    console.error('Error in saveStoryToHistory:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to save story'
    });
  }
};

/**
 * Get all stories from history
 */
const getStoryHistory = async (req, res) => {
  try {
    console.log('📚 Fetching story history');

    const stories = await storageService.getAllStories();

    res.json({
      success: true,
      stories: stories,
      count: stories.length
    });

  } catch (error) {
    console.error('Error in getStoryHistory:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve story history'
    });
  }
};

/**
 * Get a single story by ID
 */
const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`📖 Fetching story with ID: ${id}`);

    const story = await storageService.getStoryById(id);

    res.json({
      success: true,
      story: story
    });

  } catch (error) {
    console.error('Error in getStoryById:', error.message);
    res.status(404).json({
      success: false,
      error: error.message || 'Story not found'
    });
  }
};

/**
 * Delete a story by ID
 */
const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`🗑️ Deleting story with ID: ${id}`);

    await storageService.deleteStory(id);

    res.json({
      success: true,
      message: 'Story deleted successfully'
    });

  } catch (error) {
    console.error('Error in deleteStory:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete story'
    });
  }
};

module.exports = {
  saveStoryToHistory,
  getStoryHistory,
  getStoryById,
  deleteStory
};
