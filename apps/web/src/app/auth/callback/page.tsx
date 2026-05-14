'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken } = useAuth() as any;

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Save token and redirect
      localStorage.setItem('auth_token', token);
      if (setToken) setToken(token);
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  }, [searchParams, router, setToken]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-sans">
      <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
      <h2 className="text-xl font-medium tracking-tight">Securing your session...</h2>
      <p className="text-white/30 text-sm mt-2">Welcome to the AuraGen Studio.</p>
    </div>
  );
}
