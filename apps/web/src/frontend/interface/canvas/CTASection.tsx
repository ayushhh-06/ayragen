'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTASection = ({ section }: { section: any }) => {
  const { title, subtitle, buttonText } = section.content || {};

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto rounded-[60px] bg-gradient-to-br from-primary/20 via-background to-purple-900/10 border border-white/10 p-16 md:p-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold font-display mb-8 tracking-tight">
            {title || 'Ready to start your story?'}
          </h2>
          
          <p className="text-xl text-white/40 max-w-2xl mx-auto font-light mb-12">
            {subtitle || 'Join the thousands of creators who are building beautiful cinematic universes with AyraGen.'}
          </p>

          <button className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto group">
            {buttonText || 'Create Your Universe'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
