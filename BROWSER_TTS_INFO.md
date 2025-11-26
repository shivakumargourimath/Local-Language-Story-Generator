# Browser Text-to-Speech (TTS) Feature

## Overview

The Local-Language Story Generator now includes a **FREE browser-based Text-to-Speech (TTS)** solution using the **Web Speech API**. This provides audio narration without requiring external API keys or subscriptions.

## Why Browser TTS?

When ElevenLabs API is unavailable (missing/invalid API key or API errors), the application automatically falls back to browser-based TTS, which offers:

✅ **Completely FREE** - No API keys or subscriptions needed
✅ **Works Offline** - No internet connection required after page load
✅ **Multi-language Support** - Supports 8+ Indian languages plus English
✅ **Zero Configuration** - Works out of the box in all modern browsers
✅ **Privacy-Friendly** - All processing happens locally in the browser

## Supported Languages

The browser TTS supports voice synthesis in:
- Hindi (hi-IN)
- Kannada (kn-IN)
- Tamil (ta-IN)
- Telugu (te-IN)
- Marathi (mr-IN)
- Bengali (bn-IN)
- Gujarati (gu-IN)
- English (en-US)

## How It Works

### Backend Flow

1. When audio generation is requested, the backend first tries ElevenLabs API
2. If ElevenLabs fails (401, 429, or missing API key), it returns a special JSON response:
   ```json
   {
     "success": true,
     "useBrowserTTS": true,
     "text": "The story content...",
     "language": "hindi"
   }
   ```

### Frontend Flow

1. The frontend detects the `useBrowserTTS` flag in the API response
2. Instead of creating an audio blob URL, it uses the `BrowserAudioPlayer` component
3. The `BrowserAudioPlayer` uses the Web Speech API to speak the text

### Key Components

- **`frontend/src/services/browserTTS.js`** - Web Speech API wrapper with language mapping
- **`frontend/src/components/BrowserAudioPlayer.jsx`** - UI component for browser TTS controls
- **`backend/services/elevenLabsService.js`** - Throws 'USE_BROWSER_TTS' error when unavailable
- **`backend/controllers/storyController.js`** - Catches error and returns browser TTS response

## Features

### Audio Controls

- **Play** - Start speaking the story
- **Pause** - Pause the narration (can be resumed)
- **Resume** - Continue from where it was paused
- **Stop** - Stop completely and reset

### UI Indicators

- Beautiful gradient design (green to teal)
- Real-time playback status with animated dots
- "Free • No API Required" badge
- Browser compatibility tip

## Browser Compatibility

**Best Experience:**
- Google Chrome (Recommended)
- Microsoft Edge
- Safari (macOS/iOS)

**Good Support:**
- Firefox
- Opera
- Brave

**Note:** Voice quality and available languages may vary by browser and operating system.

## Testing the Feature

1. **Start both servers:**
   ```bash
   # Backend (Terminal 1)
   cd backend
   node server.js

   # Frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

2. **Generate a story:**
   - Navigate to http://localhost:3000
   - Click "Create New Story"
   - Fill in the form and click "Generate Story"

3. **Test audio:**
   - Click "🔊 Generate Audio"
   - Since ElevenLabs API is unavailable, it will use browser TTS
   - You'll see the green `BrowserAudioPlayer` component
   - Click "Play Story" to hear the narration

## Technical Details

### Web Speech API

The browser TTS uses the `SpeechSynthesisUtterance` API:

```javascript
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = 'hi-IN'; // Language code
utterance.rate = 0.9;     // Speed (0.1 to 10)
utterance.pitch = 1.0;    // Pitch (0 to 2)
utterance.volume = 1.0;   // Volume (0 to 1)

window.speechSynthesis.speak(utterance);
```

### Language Mapping

The system maps internal language names to browser language codes:

| Internal Name | Browser Code |
|---------------|--------------|
| hindi         | hi-IN        |
| kannada       | kn-IN        |
| tamil         | ta-IN        |
| telugu        | te-IN        |
| marathi       | mr-IN        |
| bengali       | bn-IN        |
| gujarati      | gu-IN        |
| english       | en-US        |

### Voice Selection

The browser TTS automatically selects:
1. A voice matching the language code (e.g., 'hi-IN')
2. If not available, falls back to 'en-US'
3. If neither available, uses the browser's default voice

## Advantages Over ElevenLabs

| Feature | Browser TTS | ElevenLabs |
|---------|-------------|------------|
| Cost | Free | Paid API |
| Setup | Zero config | API key required |
| Internet | Not required | Required |
| Reliability | Always available | Depends on API |
| Privacy | Local processing | Cloud service |
| Voice Quality | Good (browser-dependent) | Excellent |

## Future Enhancements

Potential improvements:
- Voice selection dropdown (male/female voices)
- Speed and pitch controls
- Download synthesized audio
- Highlight text while speaking
- Progress bar showing current position

## Troubleshooting

**No sound when playing:**
- Check browser volume and system volume
- Ensure the browser tab has permission to play audio
- Try refreshing the page

**Voice quality issues:**
- Try using Chrome or Edge for best quality
- Check if your OS has language packs installed
- Some languages may have limited voice options

**Browser not supported:**
- Use a modern browser (Chrome, Edge, Safari, Firefox)
- Update your browser to the latest version

## Conclusion

The browser TTS feature provides a reliable, free alternative to external TTS APIs, ensuring that users can always enjoy audio narration of their stories regardless of API availability!

---

**Created:** January 2025
**Version:** 2.0
**Feature:** Browser Text-to-Speech Integration
