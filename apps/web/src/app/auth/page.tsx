'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Loader2, Camera, Lock, Mail, User } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { login, signup, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isForgot) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007/api';
        const res = await fetch(`${apiUrl}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        });
        const data = await res.json();
        setMessage(data.message || 'Check your email for instructions.');
      } catch (err) {
        setMessage('Failed to send reset email. Please try again.');
      }
      return;
    }

    if (isLogin) {
      await login({ email: formData.email, password: formData.password });
    } else {
      await signup(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-[#020203] flex font-body text-white selection:bg-purple-500/30 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Left Panel: The Cinematic Preview */}
      <section className="hidden lg:flex flex-1 relative flex-col justify-between p-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop" 
            alt="Background" 
            fill 
            className="object-cover opacity-20 grayscale brightness-50" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020203] via-transparent to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="relative z-10"
        >
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 shadow-2xl">
              <Sparkles className="h-5 w-5 text-purple-400" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">AuraGen</span>
          </Link>
        </motion.div>

        <div className="relative z-10 max-w-xl mt-auto space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-7xl font-bold font-display leading-[1.05] tracking-tighter"
          >
            Your Story. <br />
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Universe.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-white/40 text-xl font-light leading-relaxed max-w-md"
          >
            Enter the studio to weave your memories into stunning cinematic masterpieces.
          </motion.p>
        </div>
      </section>

      {/* Right Panel: The Auth Form */}
      <section className="w-full lg:w-[580px] flex flex-col justify-center p-8 md:p-24 relative bg-white/[0.01] backdrop-blur-3xl z-10 border-l border-white/[0.05] shadow-2xl">
        <div className="w-full max-w-sm mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-3 tracking-tight font-display">
              {isForgot ? 'Reset Vault' : isLogin ? 'Welcome back' : 'Join the Studio'}
            </h2>
            <p className="text-sm text-white/30 font-light leading-relaxed">
              {isForgot ? 'Enter your email to recover your digital keys.' : isLogin ? 'Access your private cinematic vault.' : 'Create an account to begin building your universe.'}
            </p>
          </motion.div>

          {!isForgot && (
            <div className="flex flex-col gap-4 mb-10">
              <button 
                onClick={() => {
                  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007/api';
                  window.location.href = `${apiUrl}/auth/google`;
                }}
                className="w-full py-4 px-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all flex items-center justify-center gap-3 text-sm font-medium text-white/70"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-4 py-4">
                <div className="flex-1 h-px bg-white/[0.05]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">or</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && !isForgot && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="block text-[11px] font-bold text-white/20 uppercase tracking-widest ml-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl pl-12 pr-5 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.04] transition-all" 
                      placeholder="Alex Johnson" 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-white/20 uppercase tracking-widest ml-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl pl-12 pr-5 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.04] transition-all" 
                  placeholder="alex@example.com" 
                />
              </div>
            </div>
            
            {!isForgot && (
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-2">
                  <label className="block text-[11px] font-bold text-white/20 uppercase tracking-widest">Password</label>
                  {isLogin && <button type="button" onClick={() => setIsForgot(true)} className="text-[11px] text-white/20 hover:text-white transition-colors">Forgot?</button>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input 
                    type="password" name="password" value={formData.password} onChange={handleChange} required
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl pl-12 pr-5 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.04] transition-all" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            )}

            {(error || message) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className={`p-4 rounded-2xl border text-[13px] leading-relaxed ${error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-purple-500/10 border-purple-500/20 text-purple-400'}`}
              >
                {error || message}
              </motion.div>
            )}

            <div className="pt-4">
              <button 
                type="submit" disabled={loading}
                className="w-full py-4.5 rounded-2xl bg-white text-black text-sm font-bold shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isForgot ? 'Send Reset Link' : isLogin ? 'Open Vault' : 'Join Studio')}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            {isForgot && (
              <button 
                onClick={() => { setIsForgot(false); setMessage(''); }}
                className="w-full text-center text-[12px] text-white/20 hover:text-white transition-colors"
              >
                Back to Login
              </button>
            )}
          </form>

          <p className="text-center mt-12 text-[13px] text-white/20 font-light">
            {!isForgot && (isLogin ? "Don't have an account?" : "Already have an account?")}{' '}
            {!isForgot && (
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:underline underline-offset-8 font-bold transition-all ml-1"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
