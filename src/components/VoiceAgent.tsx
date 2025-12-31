import { useCallback, useEffect, useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Volume2, VolumeX, Loader } from 'lucide-react';

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

interface VoiceAgentProps {
  userName: string;
  mode: 'sleep' | 'relax' | 'focus';
  aiInsights: VertexAIEnhancement | null;
  onUpdateInsights: (insights: VertexAIEnhancement) => void;
  onUpdateVertexStatus: (status: boolean) => void;
}

export default function VoiceAgent({ userName, mode, aiInsights, onUpdateInsights, onUpdateVertexStatus }: VoiceAgentProps) {
  const conversation = useConversation();
  const [sessionTime, setSessionTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;
      
      if (!agentId) {
        console.error('Agent ID not found');
        return;
      }

      await conversation.startSession({
        agentId: agentId,
        connectionType: 'webrtc'
      });
      
      console.log(`✅ Connected! Mode: ${mode}, User: ${userName}`);
      
      if (aiInsights) {
        console.log('🎯 AI Insights loaded:', aiInsights);
      }
    } catch (error) {
      console.error('❌ Failed to start conversation:', error);
    }
  }, [conversation, userName, mode, aiInsights]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  // 🔥 REAL-TIME INTELLIGENCE - Updates every 30 seconds!
  useEffect(() => {
    if (conversation.status !== 'connected') return;
    
    const updateInterval = setInterval(async () => {
      setSessionTime(prev => prev + 30);
      
      // Call Vertex AI for updated analysis
      setIsAnalyzing(true);
      
      try {
        console.log(`🔄 Requesting update at ${sessionTime + 30}s...`);
        
        const response = await fetch('https://us-central1-patient-advocate-hackathon.cloudfunctions.net/enhanceConversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `Session update at ${sessionTime + 30}s`,
            mode: mode,
            userName: userName,
            previousStress: aiInsights?.stressLevel || 5,
            sessionDuration: sessionTime + 30
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          console.log(`📊 Update at ${sessionTime + 30}s:`, data.enhancement);
          console.log(`📉 Stress: ${aiInsights?.stressLevel} → ${data.enhancement.stressLevel}`);
          onUpdateInsights(data.enhancement);
          onUpdateVertexStatus(true);
        }
      } catch (error) {
        console.error('❌ Update error:', error);
      } finally {
        setIsAnalyzing(false);
      }
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(updateInterval);
  }, [conversation.status, sessionTime, aiInsights, mode, userName, onUpdateInsights, onUpdateVertexStatus]);

  useEffect(() => {
    if (conversation.status === 'disconnected') {
      startConversation();
    }
  }, [startConversation, conversation.status]);

  const getMoodEmoji = () => {
    switch (mode) {
      case 'sleep': return '🌙';
      case 'relax': return '🧘';
      case 'focus': return '🎯';
      default: return '✨';
    }
  };

  const getMoodText = () => {
    switch (mode) {
      case 'sleep': return 'Drift into peaceful sleep';
      case 'relax': return 'Find your calm';
      case 'focus': return 'Center your mind';
      default: return 'Begin your journey';
    }
  };

  return (
    <div className="voice-agent-container">
      <div className="agent-content">
        <div className="greeting">
          <h2>Hello, {userName} {getMoodEmoji()}</h2>
          <p className="mood-text">{getMoodText()}</p>
          {aiInsights && (
            <p style={{ 
              fontSize: 14, 
              opacity: 0.7, 
              marginTop: 8,
              fontStyle: 'italic'
            }}>
              Your emotional state: {aiInsights.emotionalTone}
            </p>
          )}
          {isAnalyzing && (
            <p style={{
              fontSize: 11,
              color: '#a78bfa',
              marginTop: 4,
              animation: 'pulse 1.5s ease-in-out infinite'
            }}>
              🧠 Analyzing...
            </p>
          )}
        </div>

        <div className={`voice-orb ${conversation.status}`}>
          {conversation.status === 'connected' && <div className="pulse-ring" />}
          {conversation.status === 'connecting' ? (
            <Loader className="orb-icon rotating" size={64} />
          ) : conversation.isSpeaking ? (
            <Volume2 className="orb-icon speaking" size={64} />
          ) : (
            <VolumeX className="orb-icon" size={64} />
          )}
        </div>

        <div className="status-text">
          {conversation.status === 'disconnected' && 'Ready to begin'}
          {conversation.status === 'connecting' && 'Connecting...'}
          {conversation.status === 'connected' && !conversation.isSpeaking && 'Listening...'}
          {conversation.status === 'connected' && conversation.isSpeaking && 'Speaking...'}
        </div>

        <div className="controls">
          {conversation.status === 'connected' && (
            <button 
              className="control-btn secondary" 
              onClick={async () => {
                await stopConversation();
                setTimeout(() => window.location.reload(), 300);
              }}
            >
              End Session
            </button>
          )}
        </div>

        <div className="tips">
          <p>💡 AI will ask your name for a personal connection</p>
          <p>🎧 Adjust your volume for optimal comfort</p>
          {sessionTime > 0 && (
            <p style={{ color: '#4ade80', fontSize: 12, marginTop: 8 }}>
              ⏱️ Session: {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
