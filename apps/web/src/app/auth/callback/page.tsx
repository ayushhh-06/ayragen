'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/database/state/useAuthStore';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      const initAuth = async () => {
        try {
          // 1. Save token
          localStorage.setItem('access_token', token);
          document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;

          // 2. Fetch User Profile
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007/api';
          const res = await fetch(`${apiUrl}/auth/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const user = await res.json();

          // 3. Set Global Auth State
          setAuth(user, token);
          router.push('/dashboard');
        } catch (err) {
          console.error('Auth sync failed:', err);
          router.push('/auth');
        }
      };

      initAuth();
    } else {
      router.push('/auth');
    }
  }, [searchParams, router, setAuth]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-sans">
      <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
      <h2 className="text-xl font-medium tracking-tight">Securing your session...</h2>
      <p className="text-white/30 text-sm mt-2">Welcome to the AuraGen Studio.</p>
    </div>
  );
}
