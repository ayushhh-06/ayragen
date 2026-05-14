'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGenerationStore } from '@/database/state/useGenerationStore';
import { useEffect, useState } from 'react';

export const AuraWorkspace = ({ children }: { children: React.ReactNode }) => {
  const { atmosphere, manifest } = useGenerationStore();
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'day' | 'dusk' | 'night'>('day');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) setTimeOfDay('dawn');
    else if (hour >= 8 && hour < 17) setTimeOfDay('day');
    else if (hour >= 17 && hour < 20) setTimeOfDay('dusk');
    else setTimeOfDay('night');
  }, []);

  const timeAdjustments = {
    dawn: { brightness: 0.8, temperature: 'sepia(20%) saturate(120%)' },
    day: { brightness: 1, temperature: 'none' },
    dusk: { brightness: 0.7, temperature: 'hue-rotate(10deg) saturate(140%)' },
    night: { brightness: 0.5, temperature: 'brightness(60%) contrast(110%)' }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden transition-colors duration-[4000ms] ease-aura" style={{ backgroundColor: atmosphere.backgroundColor }}>
      {/* Eternal Breathing: The Heartbeat of the Universe */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ 
            opacity: [0.04, 0.08, 0.04],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: `radial-gradient(circle at 50% -15%, ${atmosphere.primaryColor}15, transparent 70%)` }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      </div>

      {/* Cinematic Grain & Texture */}
      <div 
        className="absolute inset-0 pointer-events-none z-[10] opacity-[0.03] mix-blend-overlay" 
        style={{ backgroundImage: `url('/grain.png')`, opacity: atmosphere.grainIntensity }}
      />

      {/* Grid Pattern Overlay (Subtle) */}
      <div className="absolute inset-0 pointer-events-none z-[5] opacity-[0.02]" 
           style={{ backgroundImage: `radial-gradient(${atmosphere.primaryColor} 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }} 
      />

      {/* The Core Workspace Content */}
      <div 
        className="relative z-20 h-full w-full transition-all duration-[3000ms]"
        style={{ filter: timeAdjustments[timeOfDay].temperature, opacity: timeAdjustments[timeOfDay].brightness }}
      >
        {children}
      </div>

      {/* Masterpiece Vignette: Framing the emotion */}
      <div className="absolute inset-0 pointer-events-none z-[30] shadow-[inset_0_0_250px_rgba(0,0,0,0.95)]" />

      {/* Floating Mood Accents (Invisible Emotional Guidance) */}
      <AnimatePresence>
        <motion.div
          key={atmosphere.vibe}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 5, ease: "var(--ease-aura)" }}
          className="absolute -top-[30%] -right-[30%] w-[80%] h-[80%] blur-[200px] pointer-events-none z-0"
          style={{ backgroundColor: atmosphere.primaryColor }}
        />
      </AnimatePresence>
    </div>
  );
};
