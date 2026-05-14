'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('AyraGen Runtime Error:', error);
  }, [error]);

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Cinematic blurred background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-rose-900/10 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        <motion.div
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-16 h-16 mb-6 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-400"
        >
          <AlertCircle className="w-8 h-8" />
        </motion.div>

        <h2 className="text-3xl font-display font-bold mb-4 tracking-tight">
          A Ripple in the Flow
        </h2>
        
        <p className="text-white/50 text-lg leading-relaxed mb-10">
          Something disturbed the aesthetic engine. Let's realign the connection and try again.
        </p>

        <button
          onClick={() => reset()}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
        >
          <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
          <span>Restore Vision</span>
        </button>
      </motion.div>
    </div>
  );
}
