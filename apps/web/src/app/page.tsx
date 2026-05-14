'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Heart, History, Globe, ShieldCheck, ScrollText } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {/* Global Cinematic Elements */}
      <div className="fixed inset-0 pointer-events-none z-[1000] bg-[url('/grain.png')] opacity-[0.02] mix-blend-overlay" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_rgba(192,132,252,0.05),_transparent_50%)]" />

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 h-24 px-12 flex items-center justify-between z-[100] transition-all">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(192,132,252,0.2)]">
               <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-sm font-black text-white tracking-[0.3em] uppercase">AuraGen</span>
         </div>
         <div className="flex items-center gap-12">
            <Link href="/auth" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-white transition-all">Enter Vault</Link>
            <Link href="/onboarding" className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-all shadow-2xl">
               Ignite
            </Link>
         </div>
      </nav>

      {/* Hero: The Manifesto */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
         <div className="max-w-5xl space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: "var(--ease-aura)" }}
              className="space-y-6"
            >
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.6em]">The Aura Principle</span>
               <h1 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.8] uppercase">
                 Preserve <br /> Your <span className="text-glow">Legacy</span>
               </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1, duration: 3 }}
              className="text-lg md:text-2xl text-white font-medium leading-relaxed italic max-w-3xl mx-auto"
            >
              Technology should not overpower emotion. <br />
              It should quietly amplify it. <br />
              AuraGen is the cinematic archive for the moments that define us.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 2 }}
              className="flex flex-col items-center gap-12"
            >
               <Link href="/onboarding" className="group flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:scale-110 transition-all duration-1000">
                     <ArrowRight size={24} className="text-white/20 group-hover:text-primary transition-all" />
                  </div>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] group-hover:text-white transition-all">Begin the journey</span>
               </Link>
            </motion.div>
         </div>
      </section>

      {/* Philosophy Grid */}
      <section className="py-48 px-12 border-t border-white/5">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-32">
            <div className="space-y-12">
               <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                     <ScrollText size={24} />
                  </div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter">A Calmer Web</h2>
                  <p className="text-white/40 leading-relaxed italic text-lg">
                    We believe in a web that breathes. No noise, no chaos. Just intentional stories told with cinematic restraint and emotional clarity.
                  </p>
               </div>
               <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                     <History size={24} />
                  </div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Digital Heirlooms</h2>
                  <p className="text-white/40 leading-relaxed italic text-lg">
                    Your memories are not files. They are legacies. AuraGen ensures they are preserved in an immortal digital archive that evolves with you.
                  </p>
               </div>
            </div>
            <div className="relative aspect-[3/4] rounded-[60px] overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1200&q=90" 
                 className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-[3s]" 
                 alt="AuraGen Legacy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-[1em] -rotate-90">Immortal Storytelling</div>
               </div>
            </div>
         </div>
      </section>

      {/* The Final Invitation */}
      <section className="py-64 text-center px-6">
         <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              Don't just <br /> build. <span className="text-glow">Bequeath.</span>
            </h2>
            <Link href="/onboarding" className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_30px_100px_rgba(255,255,255,0.1)]">
               Create your legacy
               <Sparkles size={16} />
            </Link>
         </div>
      </section>

      {/* Footer: Silent & Eternal */}
      <footer className="py-24 px-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 text-[10px] font-black text-white/10 uppercase tracking-[0.6em]">
         <div className="flex items-center gap-4">
            <Sparkles size={14} className="text-primary/40" />
            <span>AuraGen Immortal Studios</span>
         </div>
         <div className="flex items-center gap-12">
            <span>The Aura Principle</span>
            <span>Est. 2026</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse" />
            <span>Archive Pulse Normal</span>
         </div>
      </footer>
    </div>
  );
}
