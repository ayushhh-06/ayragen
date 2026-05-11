'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { CinematicBackground } from '@/components/shared/CinematicBackground';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <CinematicBackground />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">A</div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/40">Step back into the future of web design.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 transition-all outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 transition-all outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" variant="premium" className="w-full py-6" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/40 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-red-500 hover:text-red-400 font-medium">Create one free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
