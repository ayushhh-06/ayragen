'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/frontend/interface/shared/Button';
import { motion } from 'framer-motion';
import { CinematicBackground } from '@/frontend/interface/shared/CinematicBackground';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error: authError } = useAuth();
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    await login({ email, password });
  };

  const displayError = localError || authError;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <CinematicBackground />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4 font-bold text-xl text-white shadow-[0_0_30px_rgba(192,132,252,0.3)]">A</div>
          <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Welcome Back</h1>
          <p className="text-white/40 font-medium italic text-xs uppercase tracking-widest">Step back into the future of AyraGen.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 ml-1">Identity (Email)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@soul.com"
              className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-primary/50 transition-all outline-none placeholder:text-white/10"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 ml-1">Access Key (Password)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-primary/50 transition-all outline-none placeholder:text-white/10"
              required
            />
          </div>

          {displayError && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center"
            >
              {displayError}
            </motion.p>
          )}

          <Button type="submit" variant="premium" className="w-full py-7" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
            New to the Universe?{' '}
            <Link href="/register" className="text-primary hover:text-white transition-all underline decoration-primary/20 underline-offset-4">Create your legacy</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
