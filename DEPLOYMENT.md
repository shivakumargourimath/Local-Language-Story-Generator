# 🚀 Deployment Guide

Complete guide for deploying the Local Language Story Generator to production.

---

## 📋 Table of Contents

1. [Frontend Deployment (Vercel/Netlify)](#frontend-deployment)
2. [Backend Deployment (Render/Railway)](#backend-deployment)
3. [Environment Variables](#environment-variables)
4. [Post-Deployment Steps](#post-deployment-steps)

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

#### Step 1: Prepare for Deployment

1. Make sure your code is pushed to GitHub/GitLab/Bitbucket

2. Build command is already configured in `package.json`:
   ```json
   "build": "vite build"
   ```

#### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### Step 3: Environment Variables

Add these environment variables in Vercel dashboard:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

#### Step 4: Deploy

Click "Deploy" - Vercel will automatically build and deploy your app!

**Your frontend will be available at**: `https://your-app.vercel.app`

---

### Option 2: Netlify

#### Step 1: Prepare Build Configuration

Create `netlify.toml` in the frontend directory:

```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Step 2: Deploy on Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

#### Step 3: Environment Variables

Go to Site Settings → Environment Variables and add:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

#### Step 4: Deploy

Click "Deploy site" - Done!

---

## ⚙️ Backend Deployment

### Option 1: Render (Recommended)

#### Step 1: Prepare for Deployment

1. Create `render.yaml` in the project root (optional):

```yaml
services:
  - type: web
    name: story-generator-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

#### Step 2: Deploy on Render

1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: story-generator-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

#### Step 3: Environment Variables

Add these in Render dashboard:

```env
GROQ_API_KEY=your_groq_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
PORT=5000
NODE_ENV=production
```

#### Step 4: Deploy

Click "Create Web Service" - Render will deploy your backend!

**Your backend will be available at**: `https://your-app.onrender.com`

---

### Option 2: Railway

#### Step 1: Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Click "Add variables" and add:

```env
GROQ_API_KEY=your_groq_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
PORT=5000
NODE_ENV=production
```

#### Step 2: Configure Start Command

Railway auto-detects Node.js, but you can specify:
- **Root Directory**: `backend`
- **Start Command**: `npm start`

#### Step 3: Deploy

Railway will automatically deploy!

**Your backend will be available at**: `https://your-app.up.railway.app`

---

## 🔐 Environment Variables

### Backend Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# API Keys (NEVER commit these!)
GROQ_API_KEY=your_groq_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

### Frontend Environment Variables

```env
# Backend API URL (update after backend deployment)
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## ✅ Post-Deployment Steps

### 1. Update Frontend API URL

After deploying the backend, update the frontend environment variable:

**Vercel**: 
- Dashboard → Settings → Environment Variables
- Update `VITE_API_URL` with your backend URL
- Redeploy

**Netlify**: 
- Site Settings → Environment Variables
- Update `VITE_API_URL`
- Trigger new deployment

### 2. Test Your Deployment

1. Visit your frontend URL
2. Click "Generate a Story"
3. Fill in the form and generate a story
4. Test audio generation
5. Save story and check history
6. Verify all features work

### 3. Enable CORS (if needed)

The backend already has CORS enabled in `server.js`. If you face issues, update:

```javascript
// In backend/server.js
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### 4. Monitor Your Application

**Render**: Check logs in the dashboard under "Logs" tab

**Vercel/Netlify**: Check deployment logs and analytics

### 5. Custom Domain (Optional)

Both Vercel and Netlify support custom domains:
- Go to Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

---

## 🐛 Troubleshooting

### Frontend Issues

**Build fails**:
- Check if all dependencies are in `package.json`
- Verify `vite.config.js` is correct
- Check build logs for specific errors

**API not connecting**:
- Verify `VITE_API_URL` is set correctly
- Check backend is running
- Check CORS settings

### Backend Issues

**Deployment fails**:
- Verify all dependencies are in `package.json`
- Check if `npm start` script exists
- Review build logs

**API Keys not working**:
- Verify environment variables are set in hosting platform
- Never commit `.env` file
- Regenerate keys if compromised

**File storage issues**:
- Render/Railway have persistent storage
- `data/stories.json` will be created automatically
- Consider upgrading to database for production

---

## 📊 Recommended Upgrades for Production

### 1. Database Migration

Replace JSON file storage with a database:
- **MongoDB Atlas** (Free tier available)
- **PostgreSQL on Render**
- **Supabase** (Free tier)

### 2. File Storage for Audio

Store generated audio files:
- **AWS S3**
- **Cloudinary**
- **Vercel Blob Storage**

### 3. Caching

Implement caching for:
- Generated stories (to avoid regeneration)
- Audio files

### 4. Rate Limiting

Add rate limiting to protect API:
```bash
npm install express-rate-limit
```

### 5. Analytics

Add analytics to track usage:
- **Google Analytics**
- **Plausible Analytics**
- **Vercel Analytics**

---

## 🎯 Quick Deploy Checklist

### Before Deployment:
- [ ] All API keys stored in `.env` files
- [ ] `.env` added to `.gitignore`
- [ ] Code pushed to Git repository
- [ ] Dependencies updated in `package.json`
- [ ] Build command tested locally

### Backend Deployment:
- [ ] Deploy backend to Render/Railway
- [ ] Add environment variables
- [ ] Test backend API endpoints
- [ ] Note down backend URL

### Frontend Deployment:
- [ ] Update `VITE_API_URL` with backend URL
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Test full application flow
- [ ] Verify all features work

### Post-Deployment:
- [ ] Test story generation
- [ ] Test audio generation
- [ ] Test history save/load
- [ ] Check mobile responsiveness
- [ ] Monitor error logs

---

## 🌟 Success!

Your application is now live! Share it with users and enjoy creating magical stories! 🎉

**Frontend**: `https://your-app.vercel.app`  
**Backend**: `https://your-backend.onrender.com`

---

## 📞 Support

For issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Review CORS settings

Happy Deploying! 🚀
