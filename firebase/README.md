# 🔥 Firebase Backend for Atlas-Prime

This folder contains the Firebase backend for secure Gemini API integration.

## 🚀 Quick Setup

### 1. Create Firebase Project
Go to https://console.firebase.google.com/ and create a new project called "atlas-prime-sovereign"

### 2. Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

### 3. Initialize Firebase
```bash
firebase init

# Select:
✅ Functions (JavaScript)
✅ Hosting  
✅ Firestore

# Use existing project → atlas-prime-sovereign
```

### 4. Set Gemini API Key
```bash
firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"
```

Get your key from: https://aistudio.google.com/app/apikey

### 5. Deploy
```bash
cd functions && npm install
cd ..
firebase deploy
```

## ✨ Features

✅ **Secure** - API key hidden on server  
✅ **Chat History** - Saved to Firestore  
✅ **Multi-user** - Each user has own data  
✅ **Production Ready** - Auto-scaling  

## 💰 Cost

FREE tier includes:
- 50K Firestore reads/day
- 2M Function calls/month
- Unlimited hosting

You'll likely stay in free tier!

## 📝 Files

- `functions/index.js` - Backend Cloud Functions
- `functions/package.json` - Dependencies
- `firebase.json` - Firebase config
- `firestore.rules` - Security rules
- `public/index.html` - Your app (uses Firebase if configured)
