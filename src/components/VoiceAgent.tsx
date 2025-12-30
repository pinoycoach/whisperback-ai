import { useCallback, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Volume2, VolumeX, Loader } from 'lucide-react';

interface VoiceAgentProps {
  userName: string;
  mode: 'sleep' | 'relax' | 'focus';
}

export default function VoiceAgent({ userName, mode }: VoiceAgentProps) {
  const conversation = useConversation();

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;
      
      if (!agentId) {
        console.error('Agent ID not found. Please set VITE_ELEVENLABS_AGENT_ID in your .env file');
        return;
      }

      // SIMPLEST connection - exactly like what worked before
      await conversation.startSession({
        agentId: agentId,
        connectionType: 'webrtc'
      });
      
      console.log(`✅ Connected! Mode: ${mode}, User: ${userName}`);
    } catch (error) {
      console.error('❌ Failed to start conversation:', error);
    }
  }, [conversation, userName, mode]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  // Auto-start when component loads
  useEffect(() => {
    if (conversation.status === 'disconnected') {
      startConversation();
    }
  }, []);

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
            <button className="control-btn secondary" onClick={stopConversation}>
              End Session
            </button>
          )}
        </div>

        <div className="tips">
          <p>💡 Just say "Hi, my name is {userName}" to introduce yourself</p>
          <p>🎧 Adjust your volume for optimal comfort</p>
        </div>
      </div>
    </div>
  );
}