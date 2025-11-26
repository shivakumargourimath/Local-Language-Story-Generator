/**
 * Story Controller
 * Handles business logic for story generation and audio conversion
 */

const groqService = require('../services/groqService');
const elevenLabsService = require('../services/elevenLabsService');

/**
 * Generate Story Controller
 * Receives child details and generates a personalized story
 */
const generateStory = async (req, res) => {
  try {
    const { name, age, language, moral } = req.body;

    // Validate input
    if (!name || !age || !language || !moral) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, age, language, moral'
      });
    }

    console.log(`📖 Generating story for ${name}, age ${age}, language: ${language}`);

    // Call Groq service to generate story
    const story = await groqService.generateStory({ name, age, language, moral });

    res.json({
      success: true,
      story: story,
      metadata: {
        name,
        age,
        language,
        moral
      }
    });

  } catch (error) {
    console.error('Error in generateStory:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate story'
    });
  }
};

/**
 * Generate Audio Controller
 * Converts story text to speech audio
 */
const generateAudio = async (req, res) => {
  try {
    const { text, language } = req.body;

    // Validate input
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: text'
      });
    }

    console.log(`🔊 Generating audio for story (${text.length} characters)`);

    // Call ElevenLabs service to generate audio
    const audioBuffer = await elevenLabsService.generateAudio(text, language);

    // Send audio as response
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length,
    });
    
    res.send(audioBuffer);

  } catch (error) {
    console.error('Error in generateAudio:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate audio'
    });
  }
};

module.exports = {
  generateStory,
  generateAudio
};
