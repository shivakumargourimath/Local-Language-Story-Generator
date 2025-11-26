/**
 * Groq AI Service
 * Handles story generation using Groq's LLM API
 */

const Groq = require('groq-sdk');

// Initialize Groq client lazily to ensure env vars are loaded
let groq = null;

const getGroqClient = () => {
  if (!groq) {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
  }
  return groq;
};

/**
 * Generate a personalized children's story
 * @param {Object} params - Story parameters
 * @param {string} params.name - Child's name
 * @param {number} params.age - Child's age
 * @param {string} params.language - Story language
 * @param {string} params.moral - Moral value to teach
 * @returns {Promise<string>} Generated story text
 */
const generateStory = async ({ name, age, language, moral }) => {
  try {
    // Construct a detailed prompt for story generation
    const prompt = `You are a creative children's story writer. Write ONLY the story, with NO explanations, introductions, or commentary.

Generate a bedtime story with these details:
- Child's Name: ${name}
- Age: ${age} years old
- Language: ${language}
- Moral/Value: ${moral}

Requirements:
1. Write the ENTIRE story in ${language} language (use appropriate script and characters)
2. Make it age-appropriate for a ${age}-year-old child
3. Keep it engaging, imaginative, and detailed (500-800 words)
4. Include cultural elements relevant to Indian context
5. The story should feature ${name} as the main character
6. Incorporate the moral value of "${moral}" naturally into the story
7. End with a clear moral lesson
8. Use a warm, friendly, and gentle tone suitable for bedtime
9. Add vivid descriptions, dialogue, and character emotions

IMPORTANT: Write ONLY the story itself. Do NOT include:
- Any meta-commentary or explanations
- Phrases like "Here's the story" or "This story teaches"
- Your thinking process or reasoning
- Any text before or after the story

Start directly with the story:`;

    console.log('🤖 Calling Groq API...');

    // Get Groq client instance
    const groqClient = getGroqClient();

    // Call Groq API
    const chatCompletion = await groqClient.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'qwen/qwen3-32b', // Using qwen/qwen3-32b model
      temperature: 0.8, // Creative but controlled
      max_tokens: 2048, // Increased for longer stories
      top_p: 0.9
    });

    // Extract story from response
    let story = chatCompletion.choices[0]?.message?.content;

    if (!story) {
      throw new Error('No story generated from Groq API');
    }

    // Clean up any meta-commentary or thinking process
    story = story.trim();
    
    // Remove thinking tags and content between them (aggressive cleaning)
    story = story.replace(/<think>[\s\S]*?<\/think>/gi, '');
    story = story.replace(/<thinking>[\s\S]*?<\/thinking>/gi, '');
    story = story.replace(/\[thinking\][\s\S]*?\[\/thinking\]/gi, '');
    story = story.replace(/\*\*Thinking:\*\*[\s\S]*?(?=\n\n|\*\*Story|\*\*Title|$)/gi, '');
    story = story.replace(/Think:[\s\S]*?(?=\n\n|Story:|Title:|$)/gi, '');
    
    // Remove common meta-commentary patterns
    story = story.replace(/^[\s\S]*?(?=एक बार की बात|एक दिन|किसी गांव|बहुत समय पहले|Once upon)/i, '');
    
    // Remove common prefixes
    const prefixesToRemove = [
      /^Here'?s? (?:the|a) story[:\s]*/i,
      /^Story[:\s]*/i,
      /^Title[:\s]*/i,
      /^Let me (?:write|tell) (?:you )?(?:the|a) story[:\s]*/i,
      /^I'll (?:write|tell) (?:you )?(?:the|a) story[:\s]*/i,
      /^This (?:is|story) (?:is )?(?:about|teaches)[:\s]*/i,
      /^\*\*Story\*\*[:\s]*/i,
      /^\*\*Title\*\*[:\s]*/i
    ];
    
    prefixesToRemove.forEach(prefix => {
      story = story.replace(prefix, '');
    });
    
    // Remove any text after common ending phrases
    const endMarkers = [
      /\n\n(?:This story teaches|The moral of|I hope|Note:|Commentary:|Moral:|Explanation:).*/s,
      /\n\n(?:In this story|This tale|The lesson).*/s,
      /\n\n\*\*Moral\*\*.*/s,
      /\n\n\*\*Lesson\*\*.*/s
    ];
    
    endMarkers.forEach(marker => {
      story = story.replace(marker, '');
    });
    
    // Clean up any remaining markdown formatting
    story = story.replace(/^\*\*/gm, '').replace(/\*\*$/gm, '');
    story = story.trim();

    console.log('✅ Story generated successfully');
    return story;

  } catch (error) {
    console.error('Groq API Error:', error.message);
    throw new Error(`Failed to generate story: ${error.message}`);
  }
};

module.exports = {
  generateStory
};
