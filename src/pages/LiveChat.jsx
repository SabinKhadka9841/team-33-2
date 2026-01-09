import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/TranslationContext';
import { chatService } from '../services/chatService';
import './LiveChat.css';

export default function LiveChat() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [agent, setAgent] = useState(null);
  const [queuePosition, setQueuePosition] = useState(null);
  const [estimatedWait, setEstimatedWait] = useState(null);
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChatEvent = useCallback((event) => {
    switch (event.type) {
      case 'connected':
        setConnectionStatus('connected');
        break;
      case 'disconnected':
        setConnectionStatus('disconnected');
        setAgent(null);
        break;
      case 'connection_failed':
        setConnectionStatus('disconnected');
        addSystemMessage('Connection failed. Please try again.');
        break;
      case 'message':
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: event.message.id,
          type: event.message.from === 'agent' ? 'agent' : 'system',
          text: event.message.text,
          time: new Date(event.message.time),
          agentName: event.message.agentName,
        }]);
        break;
      case 'agent_join':
        setAgent(event.agent);
        setConnectionStatus('connected');
        setQueuePosition(null);
        addSystemMessage(`${event.agent.name} has joined the chat.`);
        break;
      case 'agent_leave':
        setAgent(null);
        addSystemMessage('The agent has left. You can start a new chat.');
        break;
      case 'typing':
        setIsTyping(event.isTyping);
        break;
      case 'queue_update':
        setQueuePosition(event.position);
        setEstimatedWait(event.estimatedWait);
        setConnectionStatus('waiting');
        break;
      case 'chat_ended':
        setAgent(null);
        setConnectionStatus('disconnected');
        setChatStarted(false);
        addSystemMessage('Chat ended. Thank you!');
        break;
      default:
        break;
    }
  }, []);

  const addSystemMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'system',
      text,
      time: new Date(),
    }]);
  };

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    const unsubscribe = chatService.subscribe(handleChatEvent);
    return () => {
      unsubscribe();
      chatService.disconnect();
    };
  }, [isAuthenticated, user?.id, handleChatEvent]);

  const handleStartChat = async () => {
    if (!user?.id) return;

    setChatStarted(true);
    setConnectionStatus('connecting');
    setMessages([{
      id: 1,
      type: 'system',
      text: 'Connecting you to a support agent...',
      time: new Date(),
    }]);

    try {
      await chatService.connect(user.id);
      const result = await chatService.startChat(user.id);

      if (result.success) {
        if (result.data?.queuePosition) {
          setQueuePosition(result.data.queuePosition);
          setEstimatedWait(result.data.estimatedWait);
          setConnectionStatus('waiting');
          addSystemMessage(`You are #${result.data.queuePosition} in queue.`);
        } else {
          setConnectionStatus('connected');
          addSystemMessage('Connected! An agent will be with you shortly.');
        }
      } else {
        setConnectionStatus('disconnected');
        addSystemMessage('Unable to connect. Please try again later.');
      }
    } catch (error) {
      console.error('Chat connection error:', error);
      setConnectionStatus('disconnected');
      addSystemMessage('Connection failed. Try contacting us via Telegram.');
    }
  };

  const handleEndChat = async () => {
    await chatService.endChat();
    setAgent(null);
    setConnectionStatus('disconnected');
    setChatStarted(false);
    setMessages([]);
  };

  const handleSend = async (messageText = input) => {
    const text = messageText.trim();
    if (!text || connectionStatus !== 'connected') return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text,
      time: new Date(),
    }]);
    setInput('');
    await chatService.sendMessage(text, user?.id);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (connectionStatus === 'connected') {
      chatService.sendTypingIndicator(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        chatService.sendTypingIndicator(false);
      }, 2000);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Welcome screen (not started chat)
  if (!chatStarted) {
    return (
      <div className="livechat-page">
        <div className="chat-welcome-card">
          <div className="welcome-header">
            <div className="welcome-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h1>{t('welcomeToTeam33')}</h1>
            <p className="welcome-subtitle">{t('howCanWeHelp')}</p>
          </div>

          <div className="contact-section">
            <h3>{t('contactUs')}</h3>
            <div className="social-buttons">
              <a href="https://t.me/Team33" target="_blank" rel="noopener noreferrer" className="social-btn telegram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
                </svg>
                <span>Telegram</span>
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              <a href="https://facebook.com/Team33" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          {isAuthenticated ? (
            <button className="start-chat-btn" onClick={handleStartChat}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {t('startChat')}
            </button>
          ) : (
            <div className="login-prompt-card">
              <p>{t('pleaseLoginToContinue')}</p>
              <a href="/login" className="login-btn">{t('login')}</a>
            </div>
          )}

          <div className="support-info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{t('liveSupport')}</span>
          </div>
        </div>
      </div>
    );
  }

  // Active chat screen
  return (
    <div className="livechat-page">
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className={`agent-avatar ${agent ? 'has-agent' : ''}`}>
              {agent ? agent.name.charAt(0).toUpperCase() : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              )}
            </div>
            <div className="header-text">
              <span className="agent-name">{agent ? agent.name : t('supportTeam')}</span>
              <span className={`status-text ${connectionStatus}`}>
                <span className="status-dot"></span>
                {connectionStatus === 'connecting' && t('connecting')}
                {connectionStatus === 'waiting' && (queuePosition ? `#${queuePosition}` : t('connecting'))}
                {connectionStatus === 'connected' && (agent ? t('online') : t('connecting'))}
                {connectionStatus === 'disconnected' && t('offline')}
              </span>
            </div>
          </div>
          <button className="end-chat-btn" onClick={handleEndChat}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message message-${msg.type}`}>
              {msg.type === 'agent' && (
                <div className="msg-avatar">
                  {msg.agentName ? msg.agentName.charAt(0) : 'A'}
                </div>
              )}
              <div className="msg-bubble">
                <p>{msg.text}</p>
                <span className="msg-time">{formatTime(msg.time)}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message message-agent">
              <div className="msg-avatar">
                {agent ? agent.name.charAt(0) : 'A'}
              </div>
              <div className="msg-bubble typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Queue Status */}
        {connectionStatus === 'waiting' && queuePosition && (
          <div className="queue-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>Position #{queuePosition}{estimatedWait && ` - Est. wait: ${estimatedWait}`}</span>
          </div>
        )}

        {/* Input Area */}
        <div className="chat-input-area">
          {connectionStatus === 'connecting' ? (
            <div className="connecting-state">
              <div className="spinner"></div>
              <span>{t('connecting')}</span>
            </div>
          ) : (
            <div className="input-wrap">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('typeMessage')}
                disabled={connectionStatus !== 'connected'}
              />
              <button
                className="send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim() || connectionStatus !== 'connected'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
