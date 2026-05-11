'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io, Socket } from 'socket.io-client';
import { Sparkles, Loader2, CheckCircle2, Globe, Heart, Stars, Zap } from 'lucide-react';

interface GenerationStep {
  step: string;
  data?: any;
}

export const GenerationView = ({ step, progress }: { step: string, progress: number }) => {
  // Pure UI Component - State managed by useGeneration hook

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[150px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-50" />
      </div>

      {/* Immersive Content */}
      <div className="relative z-10 w-full max-w-2xl px-8 text-center space-y-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 rounded-full border-t-2 border-primary/40"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-primary w-8 h-8 animate-pulse" />
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              {step || 'Initiating emotional engine...'}
            </h2>
            <p className="text-white/40 text-lg font-medium tracking-wide uppercase">
              Orchestrating Your Memory Universe
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Progress Bar */}
        <div className="space-y-4">
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineIcon = ({ active, icon }: { active: boolean, icon: any }) => (
  <motion.div 
    animate={{ 
      scale: active ? 1.2 : 1,
      color: active ? '#fff' : 'rgba(255,255,255,0.1)',
      backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent'
    }}
    className="p-3 rounded-2xl border border-white/5 transition-colors"
  >
    {icon}
  </motion.div>
);
