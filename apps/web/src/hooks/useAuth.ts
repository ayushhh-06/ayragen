'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useAuth = () => {
  const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, access_token } = response.data;
      
      setAuth(user, access_token);
      localStorage.setItem('auragen_token', access_token);
      
      router.push('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', data);
      const { user, access_token } = response.data;
      
      setAuth(user, access_token);
      localStorage.setItem('auragen_token', access_token);
      
      router.push('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const performLogout = () => {
    logout();
    router.push('/');
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout: performLogout,
  };
};
