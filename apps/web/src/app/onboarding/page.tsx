'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Heart, Music, Image as ImageIcon, Rocket, ChevronRight, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const steps = [
  {
    id: 'intro',
    title: 'Welcome to the Future of Emotion',
    subtitle: 'AuraGen isn\'t just a builder. It\'s a cinematic universe for your memories.',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'intelligence',
    title: 'Neural Storytelling',
    subtitle: 'Our AI senses the emotion in your words to architect a unique digital atmosphere.',
    icon: Wand2,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'cinematics',
    title: 'Immersive Experience',
    subtitle: 'Automatic music syncing, parallax visuals, and glassmorphism by default.',
    icon: Music,
    color: 'from-emerald-500 to-teal-500'
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
    <div className="h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center relative px-6 text-center">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${step.color} opacity-10 blur-[120px] transition-all duration-1000`} />
        <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-2xl space-y-8"
        >
          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} p-0.5 mx-auto shadow-2xl`}>
             <div className="w-full h-full bg-[#050505] rounded-[22px] flex items-center justify-center">
                <step.icon size={40} className="text-white" />
             </div>
          </div>

          <div className="space-y-4">
             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-tight">
               {step.title}
             </h1>
             <p className="text-white/40 text-lg md:text-xl font-medium italic leading-relaxed px-8">
               {step.subtitle}
             </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress & Controls */}
      <div className="absolute bottom-16 inset-x-0 flex flex-col items-center gap-8 z-20">
         <div className="flex gap-3">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-500 ${i === currentStep ? 'w-12 bg-white' : 'w-2 bg-white/10'}`} 
              />
            ))}
         </div>

         <button 
           onClick={next}
           className="group px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
         >
           {currentStep === steps.length - 1 ? 'Ignite your vision' : 'Continue Journey'}
           <ArrowRight size={16} className="group-hover:translate-x-1 transition-all" />
         </button>

         <button 
           onClick={() => router.push('/builder')}
           className="text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest transition-all"
         >
           Skip Experience
         </button>
      </div>

      {/* Cinematic Corner Accents */}
      <div className="fixed top-12 left-12 flex items-center gap-3">
         <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles size={14} className="text-primary" />
         </div>
         <span className="text-[10px] font-black text-white uppercase tracking-widest">AuraGen v4.0</span>
      </div>
    </div>
  );
}
