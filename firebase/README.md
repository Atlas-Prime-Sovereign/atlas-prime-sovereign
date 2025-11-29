# 🔥 Atlas-Prime Firebase Backend

This directory contains the Firebase backend for secure API integration.

## 🚀 Quick Setup

### 1. Create Firebase Project
- Go to https://console.firebase.google.com/
- Click "Add project"
- Name it: **atlas-prime-sovereign**

### 2. Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

### 3. Initialize Project
```bash
firebase init

# Select:
✅ Functions (JavaScript)
✅ Hosting  
✅ Firestore

# Choose: Use existing project → atlas-prime-sovereign
```

### 4. Set Your Gemini API Key (Secure!)
```bash
firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"
```

Get your key from: https://aistudio.google.com/app/apikey

### 5. Deploy!
```bash
firebase deploy
```

## ✨ What You Get:
✅ Secure API key storage (server-side)
✅ User authentication
✅ Chat history saved to Firestore
✅ Production-ready
✅ FREE tier (generous limits)

## 📖 Documentation:
See the integration guide in `/docs` folder.

Built with ❤️ by Rube 🤖
