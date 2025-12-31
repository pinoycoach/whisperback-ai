# 🧠 WhisperBack - Real-Time Conversational ASMR

**🏆 Built for Google Cloud x ElevenLabs AI Hackathon 2025**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://whisperback.app)
[![Powered by Vertex AI](https://img.shields.io/badge/Vertex%20AI-Gemini%202.5-blue)](https://cloud.google.com/vertex-ai)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Conversational%20AI-purple)](https://elevenlabs.io)

> The world's first ASMR experience that adapts to your emotional state in real-time.

**[Live Demo](https://whisperback.app)** • **[Video Demo](https://vimeo.com/1150634017?fl=ip&fe=ec)** • **[Devpost](https://devpost.com/software/whisperback)**

---

## 🎯 The Innovation

Traditional ASMR is passive, one-way content. **WhisperBack is different.**

It combines Google's Vertex AI with ElevenLabs Conversational AI to create an ASMR experience that:
- 📊 **Analyzes your emotional state** in real-time
- 🎯 **Adapts the conversation** to your needs
- 📉 **Measurably reduces stress** (watch it drop from 5/10 → 4/10 → 3/10)
- 💬 **Creates genuine connection** through intelligent conversation

### What Makes It Special

**Static ASMR Apps:**
- Pre-recorded content
- Same experience for everyone
- No adaptation
- No feedback

**WhisperBack:**
- ✅ Real-time AI conversation
- ✅ Personalized to YOUR emotional state
- ✅ Adapts every 30 seconds based on progress
- ✅ Visual intelligence dashboard showing measurable results

---

## ✨ Key Features

### 🧠 Real-Time Emotional Intelligence
- Vertex AI (Gemini 2.5 Flash) analyzes emotional state every 30 seconds
- Stress and energy levels update dynamically
- Personalized ASMR trigger recommendations

### 📊 Live Intelligence Dashboard
- Visual proof of AI working in real-time
- Watch stress levels decrease: 5/10 → 4/10 → 3/10 → 2/10 → 1/10
- Progress tracking with color-coded indicators
- Session duration and effectiveness metrics

### 🎤 Natural Voice Conversation
- ElevenLabs Conversational AI for human-like interaction
- WebRTC real-time voice streaming
- Personalized responses based on emotional analysis

### 🌙 Three Experience Modes
- **Sleep** - Gentle guidance to deep rest
- **Relax** - Stress reduction and calm
- **Focus** - Centered productivity support

---

## 🛠️ Tech Stack

### AI & Cloud
- **Google Vertex AI** - Gemini 2.5 Flash for emotional analysis
- **Google Cloud Functions** (Gen2) - Real-time processing backend
- **ElevenLabs Conversational AI** - Natural voice interaction
- **WebRTC** - Real-time audio streaming

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **CSS3** - Animations & gradients

### Deployment
- **Vercel** - Production hosting
- **GitHub** - Version control
- **Environment Variables** - Secure API key management

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- ElevenLabs API account
- Google Cloud Platform account (for running the Cloud Function)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pinoycoach/whisperback-ai.git
   cd whisperback-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your ElevenLabs Agent ID:
   ```
   VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
   ```
   
   Get your Agent ID from: https://elevenlabs.io/app/conversational-ai

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🏗️ Architecture

```
User Voice Input
    ↓
ElevenLabs Conversational AI (WebRTC)
    ↓
Google Cloud Function (Middleware)
    ↓
Vertex AI Gemini 2.5 Flash
    • Emotional tone analysis
    • Stress level detection (1-10)
    • Energy level tracking (1-10)
    • ASMR trigger optimization
    • Real-time adaptation (every 30s)
    ↓
Enhanced Intelligence → Dashboard Update
    ↓
Personalized ASMR Voice Response
```

### Real-Time Intelligence Flow

1. **Initial Analysis** (0:00)
   - User starts session
   - Vertex AI analyzes initial emotional state
   - Dashboard displays baseline metrics

2. **Continuous Monitoring** (Every 30s)
   - Cloud Function sends session progress to Vertex AI
   - AI recalculates stress/energy levels
   - Dashboard updates with new metrics

3. **Adaptive Response**
   - ElevenLabs receives contextual information
   - Conversation adapts based on emotional progress
   - User experiences personalized ASMR

---

## 🎬 Demo

### Watch It In Action

**[📹 Demo Video](https://vimeo.com/1150634017?fl=ip&fe=ec)**

### Try It Yourself

**[🚀 Live Demo](https://whisperback.app)**

1. Enter your name
2. Choose a mode (Sleep, Relax, or Focus)
3. Watch the Intelligence Dashboard analyze your state
4. Start talking to the AI
5. Observe stress levels decrease in real-time

---

## 🧪 How It Works

### Emotional Intelligence Analysis

Vertex AI analyzes:
- **Emotional Tone** - Calm, stressed, tired, anxious, or seeking calm
- **Stress Level** - Scale of 1-10, updates every 30 seconds
- **Energy Level** - Scale of 1-10, adapts to session progress
- **Suggested Triggers** - Personalized ASMR techniques
- **Session Progress** - Just starting → warming up → deeply engaged → winding down

### Real-Time Adaptation Example

```
0:00 - Initial: Stress 5/10, Energy 6/10
      "User seeking calm, moderate stress"

0:30 - Update: Stress 4/10, Energy 6/10
      "Stress reducing, continue approach"

1:00 - Update: Stress 3/10, Energy 5/10
      "Good progress, user relaxing"

2:00 - Update: Stress 2/10, Energy 4/10
      "Deep relaxation achieved"
```

---

## 📊 Technical Highlights

### Google Cloud Integration
- ✅ Vertex AI Gemini 2.5 Flash (latest model)
- ✅ Cloud Functions Gen2 (serverless processing)
- ✅ Real-time API calls every 30 seconds
- ✅ Production-grade error handling

### ElevenLabs Integration
- ✅ Conversational AI with WebRTC
- ✅ Natural voice synthesis
- ✅ Real-time speech-to-speech
- ✅ Seamless audio streaming

### Performance
- ⚡ Sub-second initial load
- ⚡ Real-time voice latency < 300ms
- ⚡ Dashboard updates smoothly
- ⚡ Responsive on all devices

---

## 🎯 Impact & Use Cases

### Mental Health & Wellness
- Measurable stress reduction
- Accessible relaxation therapy
- Non-clinical anxiety support

### Sleep Enhancement
- Personalized sleep induction
- Adaptive pacing based on tiredness
- Progress tracking over time

### Productivity
- Focus mode for work/study
- Stress management during tasks
- Energy level optimization

### Market Potential
- ASMR industry: 13B+ views on YouTube
- Mental health apps: Growing market
- Personalization: Premium feature
- B2C & B2B opportunities

---

## 🏆 Hackathon Criteria

### Innovation ✅
- First real-time conversational ASMR platform
- Novel combination of Vertex AI + ElevenLabs
- Measurable wellness outcomes

### Technical Implementation ✅
- Deep Google Cloud integration (Vertex AI + Cloud Functions)
- Production-grade architecture
- Real-time processing and updates
- Clean, maintainable code

### User Experience ✅
- Polished, professional UI
- Smooth animations and transitions
- Clear value proposition
- Intuitive flow

### Business Viability ✅
- Clear market opportunity
- Scalable architecture
- Revenue model potential
- Real-world impact

---

## 📈 Future Enhancements

- [ ] Multi-modal input (image/video analysis for facial stress detection)
- [ ] Session history & progress tracking
- [ ] Personalized ASMR script generation for creators
- [ ] Biometric integration (heart rate, sleep tracking)
- [ ] Multi-language support
- [ ] Mobile apps (iOS/Android)
- [ ] Creator platform & revenue sharing

---

## 🔒 Environment Variables

The following environment variables are required:

```env
VITE_ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id
```

For Vercel deployment, add these in: Project Settings → Environment Variables

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 👨‍💻 Developer

**Built by Napoleon Beltran** for Google Cloud x ElevenLabs AI Hackathon 2025

- GitHub: [@YOUR_USERNAME](https://github.com/pinoycoach)
- Live Demo: [whisperback.app](https://whisperback.app)

---

## 🙏 Acknowledgments

- **Google Cloud** for Vertex AI & Cloud Functions
- **ElevenLabs** for Conversational AI technology
- **Anthropic** for development assistance
- **ASMR Community** for inspiration

---

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/whisperback-ai)

1. Click the button above
2. Add environment variable: `VITE_ELEVENLABS_AGENT_ID`
3. Deploy!

### Manual Deployment

```bash
# Build
npm run build

# Deploy to Vercel
vercel --prod
```

---

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Contact via hackathon platform
- Email: your.email@example.com

---

<div align="center">

**Built with ❤️ using Google Vertex AI and ElevenLabs**

**[Try WhisperBack Now →](https://whisperback-ai-5te4.vercel.app/)**

</div>
