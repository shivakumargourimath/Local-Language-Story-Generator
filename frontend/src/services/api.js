/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

import axios from 'axios';

// API Base URL - read from environment variable or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generate a story using the backend API
 * @param {Object} data - Story generation parameters
 * @param {string} data.name - Child's name
 * @param {number} data.age - Child's age
 * @param {string} data.language - Story language
 * @param {string} data.moral - Moral value
 * @returns {Promise<Object>} Story response
 */
export const generateStory = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-story`, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60000 // 60 seconds timeout for story generation
    });

    return response.data;
  } catch (error) {
    console.error('API Error - Generate Story:', error);
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.error || 'Failed to generate story');
    } else if (error.request) {
      // Request made but no response
      throw new Error('Unable to reach the server. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Generate audio from story text
 * @param {string} text - Story text to convert
 * @param {string} language - Language of the story
 * @returns {Promise<Blob>} Audio blob
 */
export const generateAudio = async (text, language) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/generate-audio`,
      { text, language },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'blob', // Important: Get binary data
        timeout: 60000 // 60 seconds timeout for audio generation
      }
    );

    // Return the audio blob
    return response.data;

    // Return the audio blob
    return response.data;
  } catch (error) {
    console.error('API Error - Generate Audio:', error);
    
    // Handle different error scenarios
    if (error.response) {
      // Try to read error message from blob if possible
      if (error.response.data instanceof Blob) {
        const text = await error.response.data.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || 'Failed to generate audio');
        } catch (parseError) {
          throw new Error('Failed to generate audio');
        }
      }
      throw new Error('Failed to generate audio');
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please check your connection.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Save a story to history
 * @param {Object} storyData - Story data to save
 * @returns {Promise<Object>} Saved story response
 */
export const saveStoryToHistory = async (storyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/history/save`,
      storyData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('API Error - Save Story:', error);
    throw new Error(error.response?.data?.error || 'Failed to save story');
  }
};

/**
 * Get all stories from history
 * @returns {Promise<Array>} Array of stories
 */
export const getStoryHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  } catch (error) {
    console.error('API Error - Get History:', error);
    throw new Error(error.response?.data?.error || 'Failed to retrieve story history');
  }
};

/**
 * Get a single story by ID
 * @param {string} id - Story ID
 * @returns {Promise<Object>} Story object
 */
export const getStoryById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error - Get Story:', error);
    throw new Error(error.response?.data?.error || 'Failed to retrieve story');
  }
};

/**
 * Delete a story by ID
 * @param {string} id - Story ID
 * @returns {Promise<Object>} Success response
 */
export const deleteStory = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/history/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error - Delete Story:', error);
    throw new Error(error.response?.data?.error || 'Failed to delete story');
  }
};

