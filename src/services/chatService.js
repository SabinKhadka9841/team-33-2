/**
 * Live Chat Service
 *
 * Backend Developer Notes:
 * ========================
 * This service connects to a real-time chat backend for customer support.
 *
 * Required Endpoints:
 * -------------------
 * WebSocket: ws://your-backend/chat
 *   - On connect: Send { type: 'auth', token: 'user-token', userId: 'user-id' }
 *   - Receive messages: { type: 'message', from: 'agent'|'system', text: string, agentName?: string, time: string }
 *   - Send messages: { type: 'message', text: string }
 *   - Agent join: { type: 'agent_join', agentName: string, agentId: string }
 *   - Agent leave: { type: 'agent_leave' }
 *   - Typing indicator: { type: 'typing', isTyping: boolean }
 *
 * REST Fallback (if WebSocket not available):
 * -------------------
 * POST /chat/messages
 *   Request: { text: string, userId: string }
 *   Response: { success: true, messageId: string }
 *
 * GET /chat/messages
 *   Query: userId, since (timestamp)
 *   Response: { success: true, messages: [{ id, from, text, time, agentName? }] }
 *
 * GET /chat/status
 *   Response: { success: true, queuePosition?: number, estimatedWait?: string, agentAvailable: boolean }
 *
 * POST /chat/start
 *   Request: { userId: string, initialMessage?: string }
 *   Response: { success: true, chatId: string, queuePosition?: number }
 */

import { apiClient, getStoredData, STORAGE_KEYS } from './api';

const CHAT_WS_URL = import.meta.env.VITE_CHAT_WS_URL || 'ws://localhost:5001/chat';
const POLL_INTERVAL = 3000; // 3 seconds for polling fallback

class ChatService {
  constructor() {
    this.ws = null;
    this.listeners = new Set();
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.pollInterval = null;
    this.lastMessageTime = null;
    this.chatId = null;
  }

  // Subscribe to chat events
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Notify all listeners
  notify(event) {
    this.listeners.forEach(callback => callback(event));
  }

  // Connect to chat (WebSocket with REST fallback)
  async connect(userId) {
    // Try WebSocket first
    try {
      await this.connectWebSocket(userId);
    } catch (error) {
      console.warn('WebSocket connection failed, using REST polling:', error);
      await this.startPolling(userId);
    }
  }

  // WebSocket connection
  connectWebSocket(userId) {
    return new Promise((resolve, reject) => {
      try {
        const token = getStoredData(STORAGE_KEYS.TOKEN);
        this.ws = new WebSocket(`${CHAT_WS_URL}?token=${token}&userId=${userId}`);

        this.ws.onopen = () => {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.notify({ type: 'connected' });
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
          } catch (e) {
            console.error('Failed to parse chat message:', e);
          }
        };

        this.ws.onclose = () => {
          this.isConnected = false;
          this.notify({ type: 'disconnected' });
          this.attemptReconnect(userId);
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

        // Timeout for connection
        setTimeout(() => {
          if (!this.isConnected) {
            this.ws?.close();
            reject(new Error('WebSocket connection timeout'));
          }
        }, 5000);

      } catch (error) {
        reject(error);
      }
    });
  }

  // Handle incoming messages
  handleMessage(data) {
    switch (data.type) {
      case 'message':
        this.notify({
          type: 'message',
          message: {
            id: data.id || Date.now(),
            from: data.from,
            text: data.text,
            time: data.time || new Date().toISOString(),
            agentName: data.agentName,
          }
        });
        break;

      case 'agent_join':
        this.notify({
          type: 'agent_join',
          agent: {
            name: data.agentName,
            id: data.agentId,
            avatar: data.avatar,
          }
        });
        break;

      case 'agent_leave':
        this.notify({ type: 'agent_leave' });
        break;

      case 'typing':
        this.notify({ type: 'typing', isTyping: data.isTyping });
        break;

      case 'queue_update':
        this.notify({
          type: 'queue_update',
          position: data.position,
          estimatedWait: data.estimatedWait,
        });
        break;

      case 'chat_ended':
        this.notify({ type: 'chat_ended' });
        break;

      default:
        console.log('Unknown chat event:', data.type);
    }
  }

  // Attempt to reconnect
  attemptReconnect(userId) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      setTimeout(() => this.connect(userId), delay);
    } else {
      this.notify({ type: 'connection_failed' });
    }
  }

  // REST polling fallback
  async startPolling(userId) {
    this.isConnected = true;
    this.notify({ type: 'connected', mode: 'polling' });

    this.pollInterval = setInterval(async () => {
      await this.pollMessages(userId);
    }, POLL_INTERVAL);
  }

  // Poll for new messages
  async pollMessages(userId) {
    try {
      const params = new URLSearchParams({ userId });
      if (this.lastMessageTime) {
        params.append('since', this.lastMessageTime);
      }

      const response = await apiClient.get(`/chat/messages?${params}`);
      if (response.success && response.data?.messages?.length > 0) {
        response.data.messages.forEach(msg => {
          this.notify({
            type: 'message',
            message: msg
          });
        });
        this.lastMessageTime = response.data.messages[response.data.messages.length - 1].time;
      }
    } catch (error) {
      console.error('Poll error:', error);
    }
  }

  // Send a message
  async sendMessage(text, userId) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'message', text }));
      return { success: true };
    }

    // REST fallback
    return await apiClient.post('/chat/messages', { text, userId, chatId: this.chatId });
  }

  // Start a new chat session
  async startChat(userId, initialMessage = null) {
    const response = await apiClient.post('/chat/start', { userId, initialMessage });
    if (response.success) {
      this.chatId = response.data?.chatId;
    }
    return response;
  }

  // End current chat
  async endChat() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'end_chat' }));
    }
    await apiClient.post('/chat/end', { chatId: this.chatId });
    this.chatId = null;
  }

  // Get queue status
  async getQueueStatus() {
    return await apiClient.get('/chat/status');
  }

  // Get chat history
  async getChatHistory(userId) {
    return await apiClient.get(`/chat/history?userId=${userId}`);
  }

  // Send typing indicator
  sendTypingIndicator(isTyping) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'typing', isTyping }));
    }
  }

  // Disconnect
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    this.isConnected = false;
    this.chatId = null;
  }
}

// Singleton instance
export const chatService = new ChatService();

// Export for backwards compatibility during development
// Remove these when backend is fully implemented
export const getSmartResponse = (message) => ({
  text: "Connecting you to a support agent...",
  matched: false,
  topic: null
});

export const getSuggestions = () => [
  'How do I deposit?',
  'Check withdrawal status',
  'Account verification help'
];

export default chatService;
