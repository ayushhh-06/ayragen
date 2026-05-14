'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#040408] text-white overflow-hidden selection:bg-purple-500/30">
      {/* Immersive mesh gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-indigo-900/10 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[150px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <Compass className="w-12 h-12 text-white/40" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-8xl md:text-9xl font-display font-bold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-3xl font-light mb-6 tracking-tight"
        >
          Lost in the Digital Ether
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-white/40 leading-relaxed mb-12 max-w-lg"
        >
          The memory or vision you are searching for does not exist in this sector of the engine. It may have faded, or it never was.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/">
            <button className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all hover:scale-105 active:scale-95 backdrop-blur-md">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Return to Origin</span>
            </button>
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-light tracking-[0.3em] uppercase text-white/20">
        AyraGen System Protocol
      </div>
    </main>
  );
}
