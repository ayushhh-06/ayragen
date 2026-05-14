'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007/api';
      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) throw new Error('Invalid or expired token');

      setSuccess(true);
      setTimeout(() => router.push('/auth'), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white font-sans relative overflow-hidden">
      {/* Background Cinematic Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-900/10 blur-[150px] mix-blend-screen" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/[0.01] backdrop-blur-3xl border border-white/[0.08] p-10 rounded-[32px] shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 shadow-lg">
            <Sparkles className="h-6 w-6 text-purple-300" />
          </div>
        </div>

        {success ? (
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Password Reset!</h2>
            <p className="text-white/40 text-sm mb-8">Your cinematic key has been updated. Redirecting you to the studio...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3 tracking-tight font-display">New Password</h2>
              <p className="text-sm text-white/30 font-light">Set a strong password for your studio.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-3">New Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-5 py-4 text-[14px] text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all" 
                  placeholder="••••••••" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-3">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-5 py-4 text-[14px] text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all" 
                  placeholder="••••••••" 
                />
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4.5 rounded-2xl bg-white text-black text-sm font-bold shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </main>
  );
}
