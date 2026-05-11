'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, Github } from 'lucide-react';

import { GlowButton } from '@/components/shared/GlowButton';
import { FloatingParticles } from '@/components/shared/FloatingParticles';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-background flex selection:bg-primary/30 selection:text-white overflow-hidden">
      
      {/* Left Panel - Branding & Atmosphere */}
      <section className="hidden lg:flex flex-1 relative flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-rose/10 z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
        <FloatingParticles count={40} />

        {/* Ambient Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] z-0 pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], y: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose/20 rounded-full blur-[100px] z-0 pointer-events-none" 
        />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-rose flex items-center justify-center shadow-[0_0_20px_rgba(192,132,252,0.4)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-wide group-hover:text-primary transition-colors">AuraGen</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-display text-5xl font-black mb-6 leading-tight glow-text"
          >
            Your stories, <br />
            immortalized in code.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/50 text-xl font-light"
          >
            Join thousands of creators building emotional cinematic universes with our intelligence engine.
          </motion.p>
        </div>
      </section>

      {/* Right Panel - Auth Form */}
      <section className="w-full lg:w-[480px] xl:w-[540px] flex flex-col justify-center p-8 sm:p-16 relative bg-black/40 backdrop-blur-2xl z-10">
        <div className="w-full max-w-md mx-auto">
          
          {/* Mobile Header */}
          <div className="lg:hidden mb-12 flex justify-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-xl">AuraGen</span>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-display font-bold mb-2">
              {isLogin ? 'Welcome back' : 'Begin your journey'}
            </h2>
            <p className="text-white/40 mb-10">
              {isLogin ? 'Enter your credentials to access your memories.' : 'Create an account to start generating universes.'}
            </p>

            {/* Social Auth */}
            <div className="flex flex-col gap-3 mb-8">
              <button className="w-full py-3.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 text-sm font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Continue with Google
              </button>
              <button className="w-full py-3.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 text-sm font-medium">
                <Github className="w-5 h-5" />
                Continue with GitHub
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs font-label uppercase tracking-widest text-white/30">Or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wide">Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all" placeholder="John Doe" />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wide">Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wide">Password</label>
                <input type="password" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all" placeholder="••••••••" />
              </div>

              <div className="pt-4">
                <GlowButton variant="primary" className="w-full py-4 text-base">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </div>
            </form>

            <p className="text-center mt-8 text-sm text-white/40">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:text-white font-bold transition-colors">
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
