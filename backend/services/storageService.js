/**
 * Story Storage Service
 * Handles saving and retrieving stories using JSON file storage
 */

const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const STORIES_FILE = path.join(__dirname, '../data/stories.json');

/**
 * Ensure data directory and stories file exist
 */
const ensureStorageExists = async () => {
  const dataDir = path.dirname(STORIES_FILE);
  
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.access(STORIES_FILE);
  } catch {
    await fs.writeFile(STORIES_FILE, JSON.stringify([], null, 2));
  }
};

/**
 * Save a story to storage
 * @param {Object} storyData - Story data to save
 * @returns {Promise<Object>} Saved story with ID
 */
const saveStory = async (storyData) => {
  try {
    await ensureStorageExists();

    // Read existing stories
    const data = await fs.readFile(STORIES_FILE, 'utf8');
    const stories = JSON.parse(data);

    // Create new story object
    const newStory = {
      id: uuidv4(),
      ...storyData,
      createdAt: new Date().toISOString(),
      audioGenerated: false
    };

    // Add to stories array
    stories.unshift(newStory); // Add to beginning

    // Keep only last 100 stories to prevent file from growing too large
    if (stories.length > 100) {
      stories.splice(100);
    }

    // Save back to file
    await fs.writeFile(STORIES_FILE, JSON.stringify(stories, null, 2));

    return newStory;
  } catch (error) {
    console.error('Error saving story:', error);
    throw new Error('Failed to save story');
  }
};

/**
 * Get all stories from storage
 * @returns {Promise<Array>} Array of stories
 */
const getAllStories = async () => {
  try {
    await ensureStorageExists();

    const data = await fs.readFile(STORIES_FILE, 'utf8');
    const stories = JSON.parse(data);

    return stories;
  } catch (error) {
    console.error('Error reading stories:', error);
    throw new Error('Failed to retrieve stories');
  }
};

/**
 * Get a single story by ID
 * @param {string} id - Story ID
 * @returns {Promise<Object>} Story object
 */
const getStoryById = async (id) => {
  try {
    await ensureStorageExists();

    const data = await fs.readFile(STORIES_FILE, 'utf8');
    const stories = JSON.parse(data);

    const story = stories.find(s => s.id === id);

    if (!story) {
      throw new Error('Story not found');
    }

    return story;
  } catch (error) {
    console.error('Error reading story:', error);
    throw new Error(error.message || 'Failed to retrieve story');
  }
};

/**
 * Update story with audio flag
 * @param {string} id - Story ID
 * @returns {Promise<Object>} Updated story
 */
const markStoryWithAudio = async (id) => {
  try {
    await ensureStorageExists();

    const data = await fs.readFile(STORIES_FILE, 'utf8');
    const stories = JSON.parse(data);

    const storyIndex = stories.findIndex(s => s.id === id);

    if (storyIndex === -1) {
      throw new Error('Story not found');
    }

    stories[storyIndex].audioGenerated = true;

    await fs.writeFile(STORIES_FILE, JSON.stringify(stories, null, 2));

    return stories[storyIndex];
  } catch (error) {
    console.error('Error updating story:', error);
    throw new Error('Failed to update story');
  }
};

/**
 * Delete a story by ID
 * @param {string} id - Story ID
 * @returns {Promise<boolean>} Success status
 */
const deleteStory = async (id) => {
  try {
    await ensureStorageExists();

    const data = await fs.readFile(STORIES_FILE, 'utf8');
    let stories = JSON.parse(data);

    const initialLength = stories.length;
    stories = stories.filter(s => s.id !== id);

    if (stories.length === initialLength) {
      throw new Error('Story not found');
    }

    await fs.writeFile(STORIES_FILE, JSON.stringify(stories, null, 2));

    return true;
  } catch (error) {
    console.error('Error deleting story:', error);
    throw new Error('Failed to delete story');
  }
};

module.exports = {
  saveStory,
  getAllStories,
  getStoryById,
  markStoryWithAudio,
  deleteStory
};
