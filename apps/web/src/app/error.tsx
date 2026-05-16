'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, AlertCircle, ZapOff, Ghost } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    console.error('AyraGen Architectural Fault:', error);
    
    // Create a periodic "glitch" pulse
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-[#020203] flex flex-col items-center justify-center p-8 overflow-hidden">
      
      {/* Background Static/Glitch Overlay */}
      <div className={`fixed inset-0 pointer-events-none opacity-[0.03] transition-opacity duration-75 ${glitch ? 'opacity-[0.1]' : ''}`}>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-50" />
      </div>

      {/* Pulsing Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-rose-900/5 blur-[150px] animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="bg-white/[0.02] border border-white/10 rounded-[48px] p-12 md:p-20 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col items-center text-center">
          
          <div className="relative mb-12">
            <motion.div
              animate={glitch ? { x: [-2, 2, -1], y: [1, -1, 0] } : {}}
              className="w-24 h-24 rounded-[32px] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500"
            >
              <ZapOff size={40} />
            </motion.div>
            <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-black border border-rose-500/20 flex items-center justify-center text-[10px] font-black text-rose-400">
               !
            </div>
          </div>

          <h1 className={`text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 transition-transform ${glitch ? 'translate-x-1' : ''}`}>
             Neural Link <br /> <span className="text-rose-500">Severed.</span>
          </h1>

          <div className="space-y-4 mb-16">
            <p className="text-white/40 text-lg font-light leading-relaxed italic">
              "The aesthetic frequency has been disturbed. The connection to the multiversal core is unstable."
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
               <Ghost size={12} />
               Fault Code: {error.digest || 'UNKNOWN_VOID_DISTURBANCE'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => reset()}
              className="flex-1 py-5 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <RotateCcw size={16} />
              Re-Ignite Neural Connection
            </button>
            <Link 
              href="/"
              className="flex-1 py-5 bg-white/[0.03] border border-white/10 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-white/[0.06] transition-all flex items-center justify-center"
            >
              Return to Reality
            </Link>
          </div>
        </div>

        {/* Pro Tip Tooltip */}
        <div className="mt-12 text-center">
           <p className="text-[10px] font-bold uppercase tracking-widest text-white/10">
             Architect Tip: Try clearing your neural cache if the void persists.
           </p>
        </div>
      </motion.div>
    </div>
  );
}

// Sub-component for Link to avoid import issues in some Next versions
function Link({ href, children, className }: any) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
