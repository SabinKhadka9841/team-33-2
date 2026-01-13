import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { accountService } from '../services/accountService';
import { walletService } from '../services/walletService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [transactionVersion, setTransactionVersion] = useState(0); // Increments when transactions change

  // Check for existing session on mount
  useEffect(() => {
    const loadUser = async () => {
      // First check for external API user data in localStorage
      const storedUser = localStorage.getItem('user');
      const storedAccountId = localStorage.getItem('accountId');

      if (storedUser && storedAccountId) {
        try {
          const userData = JSON.parse(storedUser);
          // Refresh balance from external API
          const balanceResult = await walletService.getBalance(storedAccountId);
          if (balanceResult.success) {
            userData.balance = balanceResult.balance;
          }
          setUser(userData);
          setIsAuthenticated(true);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error loading stored user:', e);
        }
      }

      // Fall back to old authService for demo/legacy users
      const result = await authService.getCurrentUser();
      if (result.success && result.data) {
        setUser(result.data.user);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Periodic balance refresh when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const refreshBalance = async () => {
      const storedAccountId = localStorage.getItem('accountId');
      if (storedAccountId) {
        try {
          const balanceResult = await walletService.getBalance(storedAccountId);
          if (balanceResult.success) {
            setUser(prev => {
              if (!prev) return prev;
              // Always update if balance changed
              if (prev.balance !== balanceResult.balance) {
                const updated = { ...prev, balance: balanceResult.balance, availableBalance: balanceResult.balance };
                localStorage.setItem('user', JSON.stringify(updated));
                return updated;
              }
              return prev;
            });
          }
        } catch (e) {
          // Silently fail - will retry on next interval
        }
      }
    };

    // Check localStorage for updates from admin panel
    const checkLocalStorage = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(prev => {
            if (!prev) return prev;
            // Update if balance is different
            if (prev.balance !== userData.balance) {
              return { ...prev, balance: userData.balance, availableBalance: userData.balance };
            }
            return prev;
          });
        } catch (e) {
          // Ignore parse errors
        }
      }
    };

    // Listen for storage events from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'user' && e.newValue) {
        try {
          const userData = JSON.parse(e.newValue);
          setUser(prev => {
            if (!prev) return prev;
            if (prev.balance !== userData.balance) {
              return { ...prev, balance: userData.balance, availableBalance: userData.balance };
            }
            return prev;
          });
        } catch (e) {
          // Ignore parse errors
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Check localStorage every 1 second for instant updates (same tab)
    const localStorageInterval = setInterval(checkLocalStorage, 1000);
    // Refresh from API every 10 seconds (more frequent for better UX)
    const apiInterval = setInterval(refreshBalance, 10000);
    // Also refresh immediately
    refreshBalance();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(localStorageInterval);
      clearInterval(apiInterval);
    };
  }, [isAuthenticated]);

  // Login - supports both old format (username, password) and new format ({ username, password, _userData })
  const login = useCallback(async (usernameOrCredentials, password) => {
    // Handle new format from Signup page: login({ username, password, _userData })
    if (typeof usernameOrCredentials === 'object' && usernameOrCredentials._userData) {
      const { _userData } = usernameOrCredentials;
      setUser(_userData);
      setIsAuthenticated(true);
      return { success: true, data: { user: _userData } };
    }

    // Handle object format without _userData (phone/password or email/password login)
    if (typeof usernameOrCredentials === 'object') {
      const { username, email, phone, password: pwd } = usernameOrCredentials;
      const loginIdentifier = phone || email || username;

      // Try phone-based login first (for local accounts)
      if (loginIdentifier && (loginIdentifier.startsWith('+') || /^\d/.test(loginIdentifier))) {
        const phoneResult = await accountService.loginWithPhone(loginIdentifier, pwd);
        if (phoneResult.success) {
          const account = phoneResult.account;
          const balanceResult = await walletService.getBalance(account.accountId);

          const userData = {
            accountId: account.accountId,
            userId: account.userId,
            walletId: balanceResult.walletId,
            firstName: account.firstName,
            lastName: account.lastName,
            fullName: `${account.firstName} ${account.lastName}`,
            phone: account.phoneNumber,
            balance: balanceResult.success ? balanceResult.balance : 0,
            status: account.status,
            isLocal: account.isLocal,
          };

          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('accountId', account.accountId);
          if (account.userId) localStorage.setItem('userId', account.userId);
          if (balanceResult.walletId) localStorage.setItem('walletId', balanceResult.walletId);

          setUser(userData);
          setIsAuthenticated(true);
          return { success: true, data: { user: userData } };
        }
      }

      // Try to get account from external API by email
      const accountResult = await accountService.getAccountByEmail(loginIdentifier);
      if (accountResult.success) {
        const account = accountResult.account;
        const balanceResult = await walletService.getBalance(account.accountId);

        const userData = {
          accountId: account.accountId,
          email: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          fullName: `${account.firstName} ${account.lastName}`,
          phone: account.phoneNumber,
          balance: balanceResult.success ? balanceResult.balance : 0,
          status: account.status,
        };

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accountId', account.accountId);

        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, data: { user: userData } };
      }

      // Fall back to demo/legacy auth with the provided credentials
      const demoResult = await authService.login(loginIdentifier, pwd);
      if (demoResult.success) {
        setUser(demoResult.data.user);
        setIsAuthenticated(true);
      }
      return demoResult;
    }

    // Handle old format: login(username, password)
    const result = await authService.login(usernameOrCredentials, password);
    if (result.success) {
      setUser(result.data.user);
      setIsAuthenticated(true);
    }
    return result;
  }, []);

  const signup = useCallback(async (userData) => {
    const result = await authService.signup(userData);
    if (result.success) {
      setUser(result.data.user);
      setIsAuthenticated(true);
    }
    return result;
  }, []);

  const logout = useCallback(async () => {
    // Clear external API data
    localStorage.removeItem('user');
    localStorage.removeItem('accountId');
    localStorage.removeItem('userId');
    localStorage.removeItem('walletId');
    // Clear legacy auth data
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    // Check if using external API
    const storedAccountId = localStorage.getItem('accountId');
    if (storedAccountId) {
      const result = await accountService.updateAccount(storedAccountId, updates);
      if (result.success) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const updatedUser = { ...userData, ...updates };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      }
      return result;
    }

    // Fall back to legacy auth
    const result = await authService.updateProfile(updates);
    if (result.success) {
      setUser(result.data);
    }
    return result;
  }, []);

  const updateBalance = useCallback((newBalance) => {
    setUser(prev => {
      if (!prev) return null;

      const updatedUser = typeof newBalance === 'object'
        ? {
            ...prev,
            balance: newBalance.total ?? newBalance.balance ?? newBalance,
            availableBalance: newBalance.available ?? newBalance.total ?? newBalance,
            pendingBalance: newBalance.pending ?? 0
          }
        : { ...prev, balance: newBalance, availableBalance: newBalance };

      // Sync with localStorage for external API users
      const storedAccountId = localStorage.getItem('accountId');
      if (storedAccountId) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      return updatedUser;
    });
  }, []);

  const refreshUser = useCallback(async () => {
    // First check for external API user
    const storedAccountId = localStorage.getItem('accountId');
    if (storedAccountId) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          // Refresh balance from external API
          const balanceResult = await walletService.getBalance(storedAccountId);
          if (balanceResult.success) {
            userData.balance = balanceResult.balance;
            localStorage.setItem('user', JSON.stringify(userData));
          }
          setUser(userData);
          return;
        } catch (e) {
          console.error('Error refreshing user:', e);
        }
      }
    }

    // Fall back to legacy auth
    const result = await authService.getCurrentUser();
    if (result.success && result.data) {
      setUser(result.data.user);
    }
  }, []);

  // Notify that a transaction occurred (deposit, withdraw, win, loss)
  const notifyTransactionUpdate = useCallback(() => {
    setTransactionVersion(v => v + 1);
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateProfile,
    updateBalance,
    refreshUser,
    transactionVersion,
    notifyTransactionUpdate
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
