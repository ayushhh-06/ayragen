'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Music, ArrowRight, ChevronRight, Zap, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';

const steps = [
  {
    id: 'intro',
    title: 'Welcome to the Future of Emotion',
    subtitle: 'AuraGen isn\'t just a builder. It\'s a cinematic universe for your memories.',
    icon: Sparkles,
    color: 'from-purple-600 to-pink-600',
    highlight: 'Experience'
  },
  {
    id: 'intelligence',
    title: 'Neural Storytelling Engine',
    subtitle: 'Our AI senses the emotion in your words to architect a unique digital atmosphere.',
    icon: Zap,
    color: 'from-indigo-600 to-purple-600',
    highlight: 'Intelligence'
  },
  {
    id: 'cinematics',
    title: 'Immersive Experience',
    subtitle: 'Automatic music syncing, parallax visuals, and glassmorphism by default.',
    icon: Layers,
    color: 'from-pink-600 to-orange-600',
    highlight: 'Cinematic'
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/builder');
    }
  };

  const step = steps[currentStep];

  return (
    <div className="h-screen w-full bg-[#020203] overflow-hidden flex flex-col items-center justify-center relative px-6 text-center font-body">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.5 }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r ${step.color} rounded-full blur-[150px] mix-blend-screen`} 
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Animated Icon Container */}
            <div className="relative inline-flex items-center justify-center">
              <div className={`absolute inset-0 bg-gradient-to-r ${step.color} blur-3xl opacity-30 animate-pulse`} />
              <div className="w-24 h-24 rounded-[32px] bg-white/[0.02] border border-white/10 flex items-center justify-center relative z-10 backdrop-blur-3xl shadow-2xl">
                <step.icon size={40} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
            </div>

            <div className="space-y-6">
               <h1 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[1.1]">
                 {step.title.split(' ').map((word, i) => (
                   <span key={i} className={word === step.highlight ? `text-transparent bg-clip-text bg-gradient-to-r ${step.color}` : ''}>
                     {word}{' '}
                   </span>
                 ))}
               </h1>
               <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                 {step.subtitle}
               </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress & Controls */}
      <div className="absolute bottom-16 inset-x-0 flex flex-col items-center gap-10 z-20">
         {/* Progress Indicators */}
         <div className="flex gap-4">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-700 ${i === currentStep ? 'w-16 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'w-4 bg-white/10'}`} 
              />
            ))}
         </div>

         {/* Actions */}
         <div className="flex flex-col items-center gap-6 w-full max-w-xs">
            <button 
              onClick={next}
              className="w-full group px-10 py-5 bg-white text-black font-bold text-sm rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {currentStep === steps.length - 1 ? 'Start Your Journey' : 'Continue Journey'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-all" />
            </button>

            <button 
              onClick={() => router.push('/builder')}
              className="text-[11px] font-bold text-white/20 hover:text-white uppercase tracking-[0.3em] transition-all"
            >
              Skip Introduction
            </button>
         </div>
      </div>

      {/* Global Corner Branding */}
      <div className="fixed top-12 left-12 flex items-center gap-3 opacity-40">
         <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
            <Sparkles size={14} className="text-purple-400" />
         </div>
         <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">AuraGen v4.0</span>
      </div>
    </div>
  );
}
