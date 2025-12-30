# 🌙 WhisperBack AI - Setup Guide for Non-Coders

Welcome! This guide will walk you through setting up WhisperBack, your conversational ASMR AI companion.

---

## 📦 What You Need to Download First

### 1. **Node.js** (This lets you run the app)
- Go to: https://nodejs.org/
- Download the **LTS version** (the green button)
- Install it (just click "Next" through everything)
- To check it worked: Open **Terminal** (Mac) or **Command Prompt** (Windows) and type:
  ```
  node --version
  ```
  You should see a version number like `v20.x.x`

### 2. **Visual Studio Code** (A simple code editor)
- Go to: https://code.visualstudio.com/
- Download and install it
- This is where you'll edit one small file

---

## 🚀 Step-by-Step Setup

### STEP 1: Get the WhisperBack Files

1. Download the `whisperback-ai.zip` file I created for you
2. **Unzip it** to somewhere easy to find (like your Desktop or Documents folder)
3. Remember where you put it!

### STEP 2: Open Terminal/Command Prompt

**On Mac:**
- Press `Command + Space`
- Type "Terminal"
- Press Enter

**On Windows:**
- Press `Windows Key`
- Type "cmd" or "Command Prompt"
- Press Enter

### STEP 3: Navigate to Your WhisperBack Folder

In the terminal, type these commands (replace `YOUR_PATH` with where you unzipped):

**Mac example:**
```bash
cd Desktop/whisperback-ai
```

**Windows example:**
```bash
cd C:\Users\YourName\Desktop\whisperback-ai
```

### STEP 4: Install Everything

In the terminal (still in the whisperback-ai folder), type:

```bash
npm install
```

This will take 1-2 minutes. You'll see lots of text - that's normal! ☕

### STEP 5: Get Your ElevenLabs API Key

1. Go to: https://elevenlabs.io/
2. **Sign up** for a free account
3. Click on your **profile icon** (top right)
4. Go to **"Profile + API Key"**
5. Click **"Create Agent"** or use an existing one
6. Copy your **Agent ID** (it looks like: `abc123xyz...`)

### STEP 6: Add Your API Key

1. In your `whisperback-ai` folder, find the file `.env.example`
2. **Make a copy** of it and name it `.env` (remove ".example")
3. Open the `.env` file in **Visual Studio Code** or any text editor
4. Replace `your-agent-id-here` with the Agent ID you copied
5. **Save the file**

It should look like:
```
VITE_ELEVENLABS_AGENT_ID=abc123xyz456...
```

### STEP 7: Start WhisperBack! 🎉

Back in your terminal, type:

```bash
npm run dev
```

You should see something like:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

### STEP 8: Open in Your Browser

1. Open your web browser (Chrome, Safari, Firefox, etc.)
2. Go to: `http://localhost:5173/`
3. **You should see WhisperBack!** 🌟

---

## 🎧 Using WhisperBack

1. **Enter your name**
2. **Choose your mood** (Sleep 🌙, Relax 🧘, or Focus 🎯)
3. Click **"Begin Experience"**
4. Click **"Start Session"** and allow microphone access
5. **Start talking!** The AI will respond with soothing ASMR voice

**Tips:**
- Use headphones for the best experience
- Find a quiet space
- Speak naturally

---

## 🛑 Stopping the App

When you're done:
1. Go back to the Terminal/Command Prompt
2. Press `Ctrl + C` (on both Mac and Windows)
3. This stops the app

---

## 🐛 Common Problems & Fixes

### "Command not found: npm"
- Node.js isn't installed. Go back to Step 1

### "Agent ID not found" error
- Check your `.env` file has the correct Agent ID
- Make sure the file is named `.env` NOT `.env.example`

### Microphone doesn't work
- Your browser needs permission to use your microphone
- Click the 🔒 lock icon in your browser's address bar
- Allow microphone access

### "Cannot find module" error
- Make sure you ran `npm install` (Step 4)
- If it still doesn't work, delete the `node_modules` folder and run `npm install` again

---

## 📁 Project Structure (What's What)

```
whisperback-ai/
├── src/
│   ├── App.tsx          # Main welcome screen
│   ├── App.css          # All the pretty colors
│   ├── components/
│   │   └── VoiceAgent.tsx   # Voice chat interface
├── .env                 # Your API key (YOU create this)
├── .env.example         # Template for .env
├── package.json         # List of what needs to be installed
└── README.md           # This file!
```

---

## 🎯 Next Steps

Once it's working, you can:
- **Customize colors** in `src/App.css`
- **Change the wording** in `src/App.tsx` and `src/components/VoiceAgent.tsx`
- **Deploy online** using:
  - Vercel (https://vercel.com) - easiest
  - Netlify (https://netlify.com)
  - GitHub Pages

---

## ❓ Need Help?

If something doesn't work:
1. Make sure Node.js is installed
2. Make sure you're in the right folder in Terminal
3. Make sure your `.env` file exists and has the Agent ID
4. Try closing everything and starting from Step 3 again

---

## 🏆 Built For

**Google Cloud x ElevenLabs AI Hackathon** (Nov-Dec 2025)

**Tech Stack:**
- React + TypeScript + Vite
- ElevenLabs Conversational AI
- Google Gemini 2.0 Flash (powers the AI)

---

*Made with 💜 by someone who cares about your relaxation*

**Good luck! You've got this! 🚀**
