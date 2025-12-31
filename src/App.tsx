import { useState } from 'react';
import VoiceAgent from './components/VoiceAgent';
import { Sparkles } from 'lucide-react';
import './App.css';

// === VERTEX AI INTEGRATION ===
const CLOUD_FUNCTION_URL = 'https://us-central1-patient-advocate-hackathon.cloudfunctions.net/enhanceConversation';

interface VertexAIEnhancement {
  emotionalTone: string;
  stressLevel: number;
  energyLevel: number;
  suggestedTriggers: string[];
  conversationPace: string;
  personalizedApproach: string;
  detectedNeeds: string[];
  sessionProgress: string;
  progressNote?: string;
}

function App() {
  const [userName, setUserName] = useState('');
  const [selectedMode, setSelectedMode] = useState<'sleep' | 'relax' | 'focus'>('relax');
  const [started, setStarted] = useState(false);
  const [vertexAIActive, setVertexAIActive] = useState(false);
  const [aiInsights, setAiInsights] = useState<VertexAIEnhancement | null>(null);

  // Vertex AI enhancement function
  async function enhanceWithVertexAI(
    message: string,
    mode: 'sleep' | 'relax' | 'focus',
    userName: string,
    previousStress?: number,
    sessionDuration?: number
  ): Promise<VertexAIEnhancement | null> {
    try {
      console.log('🧠 Calling Vertex AI...');
      
      const response = await fetch(CLOUD_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          mode, 
          userName,
          previousStress,
          sessionDuration,
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Vertex AI Enhancement:', data.enhancement);
        setVertexAIActive(true);
        setAiInsights(data.enhancement);
        return data.enhancement;
      } else {
        console.log('⚠️ Vertex AI failed:', data.error);
        return null;
      }
    } catch (error) {
      console.error('❌ Vertex AI error:', error);
      return null;
    }
  }

  const handleStart = async () => {
    if (!userName.trim()) {
      alert('Please enter your name first! 😊');
      return;
    }

    console.log(`Starting session for ${userName} in ${selectedMode} mode`);
    
    // Call Vertex AI for initial analysis
    const initialMessage = `Hi, I'm ${userName}. I want to ${selectedMode}.`;
    const enhancement = await enhanceWithVertexAI(initialMessage, selectedMode, userName);

    if (enhancement) {
      console.log('🎯 Vertex AI Analysis Complete!');
      console.log('📊 Emotional Tone:', enhancement.emotionalTone);
      console.log('😰 Stress Level:', enhancement.stressLevel);
      console.log('⚡ Energy Level:', enhancement.energyLevel);
      console.log('🎭 Suggested Triggers:', enhancement.suggestedTriggers);
    }

    // Start the session
    setStarted(true);
  };

  if (started) {
    return (
      <>
        {/* Vertex AI Intelligence Dashboard */}
        {vertexAIActive && aiInsights && (
          <div style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            borderRadius: 15,
            color: 'white',
            fontSize: 12,
            zIndex: 1000,
            minWidth: 280,
            maxWidth: 320,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 15,
              paddingBottom: 15,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#4ade80',
                animation: 'pulse 2s ease-in-out infinite'
              }}></div>
              <span style={{ fontWeight: 600, fontSize: 14 }}>🧠 Vertex AI Active</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ opacity: 0.7, marginBottom: 4 }}>Emotional State</div>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 600,
                  color: '#a78bfa',
                  transition: 'all 0.5s ease'
                }}>
                  {aiInsights.emotionalTone.charAt(0).toUpperCase() + aiInsights.emotionalTone.slice(1)}
                </div>
              </div>

              <div>
                <div style={{ opacity: 0.7, marginBottom: 4 }}>Stress Level</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    flex: 1,
                    height: 6,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${aiInsights.stressLevel * 10}%`,
                      height: '100%',
                      background: aiInsights.stressLevel > 7 ? '#ef4444' : 
                                 aiInsights.stressLevel > 4 ? '#f59e0b' : '#4ade80',
                      transition: 'all 0.8s ease'
                    }}></div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>
                    {aiInsights.stressLevel}/10
                  </span>
                </div>
              </div>

              <div>
                <div style={{ opacity: 0.7, marginBottom: 4 }}>Energy Level</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    flex: 1,
                    height: 6,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${aiInsights.energyLevel * 10}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                      transition: 'all 0.8s ease'
                    }}></div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>
                    {aiInsights.energyLevel}/10
                  </span>
                </div>
              </div>

              <div>
                <div style={{ opacity: 0.7, marginBottom: 6 }}>ASMR Triggers</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {aiInsights.suggestedTriggers.slice(0, 3).map((trigger, i) => (
                    <span key={i} style={{
                      background: 'rgba(167, 139, 250, 0.2)',
                      padding: '4px 10px',
                      borderRadius: 12,
                      fontSize: 11,
                      border: '1px solid rgba(167, 139, 250, 0.3)',
                      transition: 'all 0.3s ease'
                    }}>
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>

              {aiInsights.progressNote && (
                <div style={{
                  marginTop: 4,
                  padding: 8,
                  background: 'rgba(74, 222, 128, 0.1)',
                  borderRadius: 6,
                  fontSize: 10,
                  color: '#4ade80',
                  border: '1px solid rgba(74, 222, 128, 0.2)'
                }}>
                  📉 {aiInsights.progressNote}
                </div>
              )}

              <div style={{
                marginTop: 8,
                padding: 12,
                background: 'rgba(167, 139, 250, 0.1)',
                borderRadius: 8,
                border: '1px solid rgba(167, 139, 250, 0.2)',
                fontSize: 11,
                lineHeight: 1.5,
                opacity: 0.9
              }}>
                💡 {aiInsights.personalizedApproach}
              </div>
            </div>
          </div>
        )}
        
        <VoiceAgent 
          userName={userName} 
          mode={selectedMode}
          aiInsights={aiInsights}
          onUpdateInsights={setAiInsights}
          onUpdateVertexStatus={setVertexAIActive}
        />
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
        
        <p className="tagline">AI-powered ASMR with emotional intelligence</p>
        
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

        <p className="hint">🧠 Powered by Google Vertex AI + ElevenLabs</p>
      </div>
    </div>
  );
}

export default App;
