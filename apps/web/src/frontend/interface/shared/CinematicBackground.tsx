'use client';

import { motion } from 'framer-motion';

export const CinematicBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ background: 'var(--bg-gradient, radial-gradient(ellipse at top, #0d0520 0%, #040407 60%))' }}>
      {/* Primary aurora orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full"
        style={{ background: 'radial-gradient(circle, #7c3aed40, transparent 70%)' }}
      />
      {/* Secondary rose orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full"
        style={{ background: 'radial-gradient(circle, #db277730, transparent 70%)' }}
      />
      {/* Indigo center pulse */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[30%] left-[20%] w-[60vw] h-[60vw] rounded-full"
        style={{ background: 'radial-gradient(circle, #6366f120, transparent 70%)' }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh]" style={{ background: 'linear-gradient(to top, #040407, transparent)' }} />
    </div>
  );
};
