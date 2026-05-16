'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Music } from 'lucide-react';

export const CinematicGate = ({ onEnter }: { onEnter: () => void }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initial delay to let the environment settle
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[20000] flex flex-col items-center justify-center bg-[#020203] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent opacity-40" />
      
      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="relative flex flex-col items-center gap-12"
          >
            {/* The Ceremonial Pulse Heart */}
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
            >
              {/* Layered Pulsing Rings */}
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" 
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -inset-8 border border-primary/20 rounded-full" 
              />

              {/* Central Heart Icon */}
              <div className="relative w-32 h-32 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.2)] group-hover:border-primary/50 group-hover:shadow-[0_0_80px_rgba(168,85,247,0.4)] transition-all duration-500">
                <Heart 
                  size={48} 
                  className="text-primary fill-primary group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
            </motion.button>

            {/* Tap to Ignite Text */}
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40"
              >
                Ceremony of Hearts
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tighter">
                Ignite Your <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Cinematic Universe.</span>
              </h2>
            </div>

            {/* Instruction Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-[-100px] flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10"
            >
              <Music size={14} className="text-primary" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                Music Recommended • Interaction Required
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {/* We can add subtle grain or stars here */}
      </div>
    </div>
  );
};
