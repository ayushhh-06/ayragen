'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const FinalReveal = ({ children }: { children: React.ReactNode }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Start the reveal sequence after a short delay
    const timer = setTimeout(() => {
      setIsRevealed(true);
      setTimeout(() => setShowOverlay(false), 3000); // Remove overlay after animation
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
              animate={{ 
                scale: isRevealed ? 1.5 : 1, 
                opacity: isRevealed ? 0 : 1,
                filter: isRevealed ? 'blur(40px)' : 'blur(0px)'
              }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="text-center space-y-4"
            >
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse" />
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
                Your Story is Ready
              </h1>
              <p className="text-white/20 font-bold uppercase tracking-[0.5em] text-xs">
                Entering Your Emotional Universe
              </p>
            </motion.div>

            {/* Cinematic Lens Flare Effect during reveal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isRevealed ? [0, 1, 0] : 0,
                scale: isRevealed ? [0.5, 2, 3] : 0
              }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-white rounded-full blur-[100px] mix-blend-overlay"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Actual Content Reveal */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
        animate={{ 
          scale: isRevealed ? 1 : 1.1, 
          opacity: isRevealed ? 1 : 0,
          filter: isRevealed ? 'blur(0px)' : 'blur(10px)'
        }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-0"
      >
        {children}
      </motion.div>

      {/* Atmospheric Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-radial-vignette opacity-40" />
    </div>
  );
};
