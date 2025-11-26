# 📚 Local-Language Story Generator for Kids

A full-stack web application that generates personalized bedtime stories in multiple Indian languages with AI-powered text-to-speech narration.

## ✨ Features

- 🎭 **Personalized Stories**: Generate unique stories featuring the child's name
- 🌍 **Multi-Language Support**: Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, Gujarati, and English
- 🎤 **AI Text-to-Speech**: High-quality audio narration using ElevenLabs API
- 📖 **Story History**: Save and revisit your favorite stories
- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind CSS
- 💡 **Moral Values**: Stories incorporate important life lessons

## 🏗️ Tech Stack

### Backend
- **Node.js** + **Express**: REST API server
- **Groq AI**: Story generation using Qwen3-32B model
- **ElevenLabs**: Multilingual text-to-speech
- **JSON Storage**: Simple file-based story persistence

### Frontend
- **React 18**: Modern UI library
- **Vite**: Fast build tool
- **React Router**: Multi-page navigation
- **Tailwind CSS**: Utility-first styling
- **Axios**: HTTP client

## 📋 Prerequisites

- **Node.js** 16+ and npm
- **Groq API Key**: [Get from console.groq.com](https://console.groq.com)
- **ElevenLabs API Key**: [Get from elevenlabs.io](https://elevenlabs.io/app/settings/api-keys)

## 📁 Project Structure

```
Local_Language/
├── backend/
│   ├── controllers/
│   │   ├── storyController.js      # Story generation handlers
│   │   └── historyController.js    # History management handlers
│   ├── routes/
│   │   ├── storyRoutes.js          # Story API routes
│   │   └── historyRoutes.js        # History API routes
│   ├── services/
│   │   ├── groqService.js          # Groq AI integration
│   │   ├── elevenLabsService.js    # ElevenLabs TTS integration
│   │   └── storageService.js       # JSON file storage service
│   ├── data/
│   │   └── stories.json            # Stored stories (auto-generated)
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore file
│   ├── package.json                 # Dependencies
│   └── server.js                    # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # Navigation bar
    │   │   ├── Layout.jsx           # Layout wrapper
    │   │   ├── StoryForm.jsx        # Story input form
    │   │   ├── StoryDisplay.jsx     # Story display card
    │   │   ├── AudioPlayer.jsx      # Audio playback
    │   │   └── LoadingSpinner.jsx   # Loading indicator
    │   ├── pages/
    │   │   ├── HomePage.jsx         # Landing page
    │   │   ├── GenerateStoryPage.jsx # Story generation page
    │   │   ├── HistoryPage.jsx      # Story history list
    │   │   └── StoryViewPage.jsx    # Individual story view
    │   ├── services/
    │   │   └── api.js               # API client functions
    │   ├── App.jsx                  # Router configuration
    │   ├── main.jsx                 # React entry point
    │   └── index.css                # Global styles
    ├── .env                          # Environment variables
    ├── .env.example                  # Environment template
    ├── .gitignore                    # Git ignore file
    ├── index.html                    # HTML template
    ├── package.json                  # Dependencies
    ├── postcss.config.js             # PostCSS configuration
    ├── tailwind.config.js            # Tailwind configuration
    └── vite.config.js                # Vite configuration
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Local_Language
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
# Server Configuration
PORT=5000

# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# ElevenLabs API Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## 🎮 Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

Backend will run on: `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 📖 Usage Guide

### 1. **Generate a Story**
   - Navigate to "Create New Story"
   - Enter child's name and age
   - Select language and moral value
   - Click "Generate Story"

### 2. **Listen to Audio**
   - After story generation, click "🔊 Generate Audio"
   - Use the audio player to listen to the narration

### 3. **Save Stories**
   - Click "💾 Save to History" to save your favorite stories
   - Access saved stories from "Story History"

### 4. **View History**
   - Browse all saved stories
   - Click any story to view full content
   - Generate audio for saved stories
   - Delete stories you no longer need

## 🌐 Supported Languages

- 🇮🇳 **Hindi** (हिंदी)
- 🇮🇳 **Kannada** (ಕನ್ನಡ)
- 🇮🇳 **Tamil** (தமிழ்)
- 🇮🇳 **Telugu** (తెలుగు)
- 🇮🇳 **Marathi** (मराठी)
- 🇮🇳 **Bengali** (বাংলা)
- 🇮🇳 **Gujarati** (ગુજરાતી)
- 🇬🇧 **English**

## 📝 Moral Values

Stories can incorporate various moral lessons:
- Kindness & Compassion
- Honesty & Truth
- Bravery & Courage
- Friendship & Sharing
- Respect for Elders
- Hard Work & Perseverance
- Gratitude & Thankfulness
- Patience & Tolerance
- Love for Nature
- Helping Others

## 🗂️ Project Structure

```
Local_Language/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic (AI, TTS)
│   ├── routes/          # API endpoints
│   ├── data/            # JSON storage
│   ├── .env             # Environment variables
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route pages
│   │   ├── services/    # API client
│   │   └── App.jsx      # Main app component
│   └── index.html
└── README.md
```

## 🔧 API Endpoints

### Story Generation
- `POST /api/generate-story` - Generate a new story
- `POST /api/generate-audio` - Convert story to audio

### Story History
- `GET /api/history` - Get all saved stories
- `GET /api/history/:id` - Get story by ID
- `POST /api/history/save` - Save a new story
- `DELETE /api/history/:id` - Delete a story

## 🐛 Troubleshooting

### Backend Issues

**API Key not loaded:**
```bash
# Check .env file exists in backend folder
# Ensure no extra spaces in API keys
# Restart the backend server
```

**Port already in use:**
```bash
# On Windows PowerShell:
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force
```

### Frontend Issues

**API Connection Error:**
- Verify backend is running on port 5000
- Check CORS is enabled in backend

**Stories not displaying:**
- Clear browser cache
- Check browser console for errors

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ for kids learning in their native languages

## 🙏 Acknowledgments

- **Groq**: For fast AI inference
- **ElevenLabs**: For multilingual text-to-speech
- **React Team**: For the amazing framework
- **Tailwind CSS**: For beautiful styling

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Happy Storytelling! 📖✨**
  "language": "Hindi",
  "moral": "Kindness",
  "story": "Story text..."
}
```

**GET** `/api/history`

Get all saved stories.

**Response:**
```json
{
  "success": true,
  "stories": [...],
  "count": 10
}
```

**GET** `/api/history/:id`

Get a single story by ID.

**DELETE** `/api/history/:id`

Delete a story by ID.

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Features Breakdown

### Story Generation
- Uses Groq's Qwen 3 model for fast, creative story generation
- Culturally appropriate content for Indian context
- Age-appropriate language and themes
- Natural integration of moral values
- Personalized with child's name

### Text-to-Speech
- ElevenLabs multilingual voice models
- High-quality, natural-sounding audio
- Support for multiple Indian languages
- Downloadable MP3 files

### Story Management
- Save unlimited stories to history
- JSON file-based storage (upgradeable to database)
- Unique ID for each story
- Timestamps for tracking
- Easy deletion of unwanted stories

### User Interface
- Clean, modern design with Tailwind CSS
- Beautiful landing page with hero section
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive navigation with React Router
- Loading states and error handling

### Navigation Structure
- **/** - Home/Landing page
- **/generate** - Story generation page
- **/history** - Story history list
- **/story/:id** - Individual story view page

## 🌟 New Features (Version 2.0)

### ✅ What's New
- 🏠 Beautiful landing page with hero section
- 🧭 React Router navigation between pages
- 💾 Save stories to persistent storage
- 📚 View all saved stories in history
- 📖 Dedicated story reading page
- 🗑️ Delete unwanted stories
- 🎨 Improved UI/UX across all pages
- 📱 Better mobile responsiveness
- ✨ Enhanced animations and transitions
- 🔄 Better error handling and loading states

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Frontend: Vercel or Netlify
- Backend: Render or Railway

### Quick Deploy Links

**Frontend (Vercel)**:
1. Push code to GitHub
2. Import to Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy!

**Backend (Render)**:
1. Create new Web Service
2. Connect GitHub repository
3. Set environment variables
4. Deploy!

## 📊 Recommended Production Upgrades

1. **Database Migration**: Replace JSON storage with MongoDB/PostgreSQL
2. **File Storage**: Store audio files in AWS S3/Cloudinary
3. **Caching**: Implement Redis for faster responses
4. **Rate Limiting**: Protect API from abuse
5. **Analytics**: Track usage and user behavior
6. **Authentication**: Add user accounts (optional)
7. **Payment Integration**: Monetize with subscriptions (optional)

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```powershell
# Change PORT in backend/.env to a different port
PORT=5001
```

**API key errors:**
- Verify your API keys in `backend/.env`
- Check API key validity on respective platforms

### Frontend Issues

**Cannot connect to backend:**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`
- Verify no firewall blocking localhost connections

**Build errors:**
```powershell
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 📝 Development

### Backend Development

```powershell
# Install nodemon for auto-restart
npm install -g nodemon

# Run with auto-restart
cd backend
npm run dev
```

### Frontend Development

```powershell
# Frontend already has hot-reload enabled with Vite
cd frontend
npm run dev
```

## 🏗️ Production Build

### Frontend Build

```powershell
cd frontend
npm run build
```

Build output will be in `frontend/dist/`

### Backend Production

```powershell
cd backend
# Set NODE_ENV=production in .env
npm start
```

## 🔒 Security Notes

- **Never commit `.env` files** to version control
- The `.env` file is already in `.gitignore`
- API keys are loaded from environment variables
- Use `.env.example` as a template for new deployments

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Made with ❤️ for kids**

**Powered by:**
- 🤖 Groq AI (Llama3)
- 🎤 ElevenLabs TTS
- ⚛️ React
- 🎨 Tailwind CSS
