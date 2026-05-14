'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
          <Sparkles className="w-10 h-10 text-purple-400 relative z-10" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">Syncing Studio</h2>
          <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
