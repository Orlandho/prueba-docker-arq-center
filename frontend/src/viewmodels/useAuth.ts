import { useState, useEffect } from 'react';
import api from '../models/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      const res = await api.post('/auth/login', { username, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      throw err;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      setError(null);
      const res = await api.post('/auth/register', { username, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  };
};
