'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Globe as Github, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { login, signup, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <main className="min-h-screen bg-[#050505] flex font-sans text-white selection:bg-purple-500/30 selection:text-white overflow-hidden relative">
      
      {/* Background Cinematic Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Left Panel - The Narrative Side */}
      <section className="hidden lg:flex flex-1 relative flex-col justify-between p-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop" alt="Background" fill className="object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_30_rgba(168,85,247,0.4)] transition-all">
              <Sparkles className="h-4 w-4 text-purple-300" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white/90">AuraGen</span>
          </Link>
        </motion.div>

        <div className="relative z-10 max-w-xl mt-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl font-bold font-display leading-[1.05] mb-8 text-white tracking-tighter"
          >
            Create.<br />
            Inspire.<br />
            <span className="text-white/40 italic">Captivate.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/40 text-[18px] max-w-md leading-relaxed font-light"
          >
            AuraGen helps you weave your stories into stunning cinematic universes with the power of modern intelligence.
          </motion.p>
        </div>
      </section>

      {/* Right Panel - The Functional Side */}
      <section className="w-full lg:w-[540px] flex flex-col justify-center p-10 sm:p-20 relative bg-white/[0.01] backdrop-blur-3xl z-10 border-l border-white/[0.08] shadow-2xl overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-sm mx-auto">
          
          <div className="lg:hidden mb-16">
            <Link href="/" className="inline-flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="font-bold text-xl">AuraGen</span>
            </Link>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-3 tracking-tight font-display">
              {isLogin ? 'Welcome back' : 'Start your journey'}
            </h2>
            <p className="text-[14px] text-white/30 font-light">
              {isLogin ? 'Enter your credentials to enter the studio.' : 'Create an account to begin building your universe.'}
            </p>
          </motion.div>

          {/* Social Auth */}
          <div className="flex flex-col gap-3.5 mb-10">
            <SocialButton 
              icon={<svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>} 
              label="Continue with Google" 
              onClick={() => {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007/api';
                window.location.href = `${apiUrl}/auth/google`;
              }}
            />
          </div>

          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">or</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-3">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-5 py-4 text-[14px] text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all" 
                    placeholder="Alex Johnson" 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-3">Email address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-5 py-4 text-[14px] text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all" 
                placeholder="alex@example.com" 
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em]">Password</label>
                {isLogin && <a href="#" className="text-[11px] text-white/20 hover:text-white transition-colors">Forgot password?</a>}
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-5 py-4 text-[14px] text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all" 
                placeholder="••••••••" 
              />
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </motion.div>
            )}

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4.5 rounded-2xl bg-white text-black text-sm font-bold shadow-[0_0_40_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLogin ? 'Log In Studio' : 'Create Account')}
                {!loading && <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>

          <p className="text-center mt-12 text-[13px] text-white/30 font-light">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-white hover:underline underline-offset-4 font-medium transition-all"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}

function SocialButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full py-3.5 px-6 rounded-2xl border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/20 transition-all flex items-center justify-center gap-3 text-[13px] font-medium text-white/70 hover:text-white"
    >
      {icon}
      {label}
    </button>
  );
}
