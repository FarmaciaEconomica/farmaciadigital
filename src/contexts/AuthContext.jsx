import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext(null);

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(() => localStorage.getItem(AUTH_TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  const setToken = useCallback((value) => {
    if (value) {
      localStorage.setItem(AUTH_TOKEN_KEY, value);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
    setTokenState(value);
  }, []);

  const loadUser = useCallback(async () => {
    try {
      const me = await base44.auth.me();
      if (me) {
        setUser(me);
        setTokenState(localStorage.getItem(AUTH_TOKEN_KEY));
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(me));
      } else {
        setToken(null);
        setUser(null);
      }
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setToken]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(async (email, password) => {
    const result = await base44.auth.login(email, password);
    if (result.token) {
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.user));
      return result.user;
    }
    setUser(result);
    return result;
  }, [setToken]);

  const register = useCallback(async (data) => {
    const result = await base44.auth.register(data);
    if (result.token) {
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.user));
      return result.user;
    }
    setUser(result);
    return result;
  }, [setToken]);

  const logout = useCallback(async () => {
    await base44.auth.logout();
    setToken(null);
    setUser(null);
  }, [setToken]);

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
