import { useState } from 'react';
import VoiceAgent from './components/VoiceAgent';
import { Sparkles } from 'lucide-react';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [selectedMode, setSelectedMode] = useState<'sleep' | 'relax' | 'focus'>('relax');
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (userName.trim()) {
      setStarted(true);
    }
  };

  if (started) {
    return <VoiceAgent userName={userName} mode={selectedMode} />;
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
