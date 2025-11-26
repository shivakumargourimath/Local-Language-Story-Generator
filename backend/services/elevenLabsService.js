/**
 * ElevenLabs TTS Service
 * Handles text-to-speech conversion using ElevenLabs API
 */

const axios = require('axios');

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

/**
 * Get API key (lazy loaded to ensure env vars are loaded)
 */
const getApiKey = () => {
  return process.env.ELEVENLABS_API_KEY;
};

/**
 * Voice ID mapping for different languages
 * Using multilingual voices from ElevenLabs
 */
const VOICE_IDS = {
  default: 'pNInz6obpgDQGcFmaJgB', // Adam - multilingual
  kannada: 'pNInz6obpgDQGcFmaJgB',
  hindi: 'pNInz6obpgDQGcFmaJgB',
  tamil: 'pNInz6obpgDQGcFmaJgB',
  telugu: 'pNInz6obpgDQGcFmaJgB',
  marathi: 'pNInz6obpgDQGcFmaJgB',
  english: 'pNInz6obpgDQGcFmaJgB'
};

/**
 * Generate audio from text using ElevenLabs TTS
 * @param {string} text - Story text to convert
 * @param {string} language - Language of the text
 * @returns {Promise<Buffer>} Audio buffer (MP3)
 */
const generateAudio = async (text, language = 'english') => {
  try {
    // Get API key dynamically
    const ELEVENLABS_API_KEY = getApiKey();
    
    // Check if API key is configured
    if (!ELEVENLABS_API_KEY || ELEVENLABS_API_KEY === 'your_elevenlabs_api_key_here') {
      throw new Error('ElevenLabs API key not configured');
    }

    console.log(`🔑 Using ElevenLabs API key: ${ELEVENLABS_API_KEY.substring(0, 10)}...`);

    // Select appropriate voice based on language
    const voiceId = VOICE_IDS[language.toLowerCase()] || VOICE_IDS.default;

    console.log(`🎤 Calling ElevenLabs API with voice: ${voiceId}`);

    // Call ElevenLabs TTS API
    const response = await axios.post(
      `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
      {
        text: text,
        model_id: 'eleven_multilingual_v2', // Supports multiple languages
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        responseType: 'arraybuffer' // Get binary audio data
      }
    );

    console.log('✅ Audio generated successfully');
    return Buffer.from(response.data);

  } catch (error) {
    // Better error handling with detailed messages
    if (error.response) {
      const status = error.response.status;
      
      if (status === 401) {
        console.error('❌ ElevenLabs API Authentication Error: Invalid or expired API key');
        throw new Error('Invalid or expired API key. Please check your ElevenLabs API key.');
      } else if (status === 429) {
        console.error('❌ ElevenLabs API Rate Limit: Too many requests');
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (status === 400) {
        console.error('❌ ElevenLabs API Bad Request:', error.response.data);
        throw new Error('Invalid request to ElevenLabs API. Please check the text length and format.');
      } else {
        console.error('ElevenLabs API Error:', error.response.data || error.message);
        throw new Error(`Failed to generate audio: ${error.message}`);
      }
    } else {
      console.error('ElevenLabs API Error:', error.message);
      throw new Error(`Failed to generate audio: ${error.message}`);
    }
  }
};

module.exports = {
  generateAudio
};
