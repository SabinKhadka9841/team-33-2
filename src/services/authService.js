import { apiClient, STORAGE_KEYS, getStoredData, setStoredData, removeStoredData } from './api';

// Demo account for testing
const DEMO_ACCOUNT = {
  username: 'demo',
  password: 'demo123',
  user: {
    id: 'demo-user-001',
    username: 'demo',
    email: 'demo@team33.com',
    phone: '+1234567890',
    balance: 1000,
    availableBalance: 1000,
    pendingBalance: 0,
    createdAt: new Date().toISOString()
  }
};

export const authService = {
  async login(username, password) {
    // Check for demo account first
    if (username === DEMO_ACCOUNT.username && password === DEMO_ACCOUNT.password) {
      const demoToken = 'demo-token-' + Date.now();
      setStoredData(STORAGE_KEYS.USER, DEMO_ACCOUNT.user);
      setStoredData(STORAGE_KEYS.TOKEN, demoToken);
      return {
        success: true,
        data: { user: DEMO_ACCOUNT.user, token: demoToken },
        message: 'Login successful'
      };
    }

    const response = await apiClient.post('/auth/login', { username, password });

    if (response.success && response.data) {
      setStoredData(STORAGE_KEYS.USER, response.data.user);
      setStoredData(STORAGE_KEYS.TOKEN, response.data.token);
    }

    return response;
  },

  async signup(userData) {
    const { username, email, phone, password, confirmPassword } = userData;

    // Client-side validation
    if (password !== confirmPassword) {
      return { success: false, data: null, message: 'Passwords do not match' };
    }

    const response = await apiClient.post('/auth/register', {
      username,
      email,
      phone,
      password
    });

    if (response.success && response.data) {
      setStoredData(STORAGE_KEYS.USER, response.data.user);
      setStoredData(STORAGE_KEYS.TOKEN, response.data.token);
    }

    return response;
  },

  async logout() {
    removeStoredData(STORAGE_KEYS.USER);
    removeStoredData(STORAGE_KEYS.TOKEN);
    removeStoredData(STORAGE_KEYS.CHECKIN);
    removeStoredData(STORAGE_KEYS.TRANSACTIONS);
    return { success: true, data: null, message: 'Logged out successfully' };
  },

  async getCurrentUser() {
    const token = getStoredData(STORAGE_KEYS.TOKEN);
    if (!token) {
      return { success: false, data: null, message: 'Not authenticated' };
    }

    // Handle demo account session
    if (token.startsWith('demo-token-')) {
      const storedUser = getStoredData(STORAGE_KEYS.USER);
      if (storedUser) {
        return { success: true, data: { user: storedUser, token } };
      }
    }

    const response = await apiClient.get('/auth/me');

    if (response.success && response.data) {
      setStoredData(STORAGE_KEYS.USER, response.data.user);
      return { success: true, data: { user: response.data.user, token } };
    }

    // Token expired or invalid
    if (!response.success) {
      removeStoredData(STORAGE_KEYS.USER);
      removeStoredData(STORAGE_KEYS.TOKEN);
    }

    return response;
  },

  async forgotPassword(email) {
    return await apiClient.post('/auth/forgot-password', { email });
  },

  async updateProfile(updates) {
    const response = await apiClient.put('/auth/profile', updates);

    if (response.success && response.data) {
      setStoredData(STORAGE_KEYS.USER, response.data.user);
    }

    return response;
  },

  async changePassword(currentPassword, newPassword) {
    return await apiClient.put('/auth/password', { currentPassword, newPassword });
  }
};

export default authService;
