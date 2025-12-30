import { useState } from 'react';
import VoiceAgent from './components/VoiceAgent';
import { Sparkles } from 'lucide-react';
import './App.css';

// === VERTEX AI INTEGRATION ===
const CLOUD_FUNCTION_URL = 'https://us-central1-patient-advocate-hackathon.cloudfunctions.net/enhanceConversation';

function App() {
  const [userName, setUserName] = useState('');
  const [selectedMode, setSelectedMode] = useState<'sleep' | 'relax' | 'focus'>('relax');
  const [started, setStarted] = useState(false);
  const [vertexAIActive, setVertexAIActive] = useState(false);

  // Vertex AI enhancement - now NON-BLOCKING
  async function enhanceWithVertexAI(
    message: string,
    mode: 'sleep' | 'relax' | 'focus',
    userName: string
  ) {
    try {
      console.log('🧠 Calling Vertex AI in background...');
      
      const response = await fetch(CLOUD_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, mode, userName })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Vertex AI Enhancement:', data.enhancement);
        setVertexAIActive(true);
        return data.enhancement;
      } else {
        console.log('⚠️ Vertex AI failed, continuing without enhancement');
        return null;
      }
    } catch (error) {
      console.error('❌ Vertex AI error:', error);
      return null;
    }
  }

  const handleStart = async () => {
    // Check userName
    if (!userName.trim()) {
      alert('Please enter your name first! 😊');
      return;
    }

    // Start conversation IMMEDIATELY (don't wait for Vertex AI)
    console.log(`Starting session for ${userName} in ${selectedMode} mode`);
    setStarted(true);

    // Call Vertex AI in background (non-blocking)
    const initialMessage = `Hi, I'm ${userName}. I want to ${selectedMode}.`;
    enhanceWithVertexAI(initialMessage, selectedMode, userName).then(enhancement => {
      if (enhancement) {
        console.log('🎯 Vertex AI personalization loaded!');
        console.log('Emotional State:', enhancement.emotionalTone);
        console.log('Energy Level:', enhancement.energyLevel);
        console.log('Suggested Triggers:', enhancement.suggestedTriggers);
      }
    });
  };

  if (started) {
    return (
      <>
        {/* Vertex AI Badge */}
        {vertexAIActive && (
          <div style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '12px 24px',
            borderRadius: 25,
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            🧠 Vertex AI Active
          </div>
        )}
        
        {/* Pass userName to VoiceAgent */}
        <VoiceAgent userName={userName} mode={selectedMode} />
      </>
    );
  }

  return (
    <div className="app-container">
      <div className="welcome-screen">
        <div className="logo-container">
          <Sparkles className="logo-icon" size={48} />
          <h1 className="app-title">WhisperBack</h1>
        </div>
        
        <p className="tagline">Your AI companion for soothing ASMR conversations</p>
        
        <div className="setup-form">
          <div className="input-group">
            <label htmlFor="name">What's your name?</label>
            <input
              id="name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name..."
              className="name-input"
              autoFocus
            />
          </div>

          <div className="input-group">
            <label>Choose your mood</label>
            <div className="mode-selector">
              <button
                className={`mode-btn ${selectedMode === 'sleep' ? 'active' : ''}`}
                onClick={() => setSelectedMode('sleep')}
              >
                🌙 Sleep
              </button>
              <button
                className={`mode-btn ${selectedMode === 'relax' ? 'active' : ''}`}
                onClick={() => setSelectedMode('relax')}
              >
                🧘 Relax
              </button>
              <button
                className={`mode-btn ${selectedMode === 'focus' ? 'active' : ''}`}
                onClick={() => setSelectedMode('focus')}
              >
                🎯 Focus
              </button>
            </div>
          </div>

          <button
            className="start-btn"
            onClick={handleStart}
            disabled={!userName.trim()}
          >
            Begin Experience
          </button>
        </div>

        <p className="hint">🎧 Headphones recommended for the best experience</p>
      </div>
    </div>
  );
}

export default App;