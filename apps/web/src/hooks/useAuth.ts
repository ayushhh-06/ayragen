import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/database/state/useAuthStore';

export function useAuth() {
  const router = useRouter();
  const { setAuth, logout: clearStore, user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
  };

  const login = async (credentials: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { access_token, user } = response.data;
      
      localStorage.setItem('access_token', access_token);
      setCookie('access_token', access_token);
      
      setAuth(user, access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/register', data);
      const { access_token, user } = response.data;
      
      localStorage.setItem('access_token', access_token);
      setCookie('access_token', access_token);
      
      setAuth(user, access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    deleteCookie('access_token');
    clearStore();
    router.push('/auth');
  };

  return { user, isAuthenticated, login, signup, logout, loading, error };
}
