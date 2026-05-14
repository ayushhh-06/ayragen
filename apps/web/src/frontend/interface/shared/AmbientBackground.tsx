'use client';

import { motion } from 'framer-motion';

interface Orb { top: string; left: string; w: string; h: string; color: string; delay: number; duration: number; }

const orbs: Orb[] = [
  { top: '-15%', left: '-10%', w: '70vw', h: '70vw', color: 'rgba(124,58,237,0.12)', delay: 0,  duration: 20 },
  { top: '30%',  left: '55%',  w: '55vw', h: '55vw', color: 'rgba(219,39,119,0.08)', delay: 4,  duration: 26 },
  { top: '60%',  left: '-5%',  w: '60vw', h: '60vw', color: 'rgba(99,102,241,0.09)', delay: 8,  duration: 22 },
  { top: '-5%',  left: '60%',  w: '40vw', h: '40vw', color: 'rgba(192,132,252,0.1)', delay: 2,  duration: 18 },
];

export const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, #0d052080, transparent), #040408' }}>
    {orbs.map((orb, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{ top: orb.top, left: orb.left, width: orb.w, height: orb.h, background: `radial-gradient(circle, ${orb.color}, transparent 70%)`, filter: 'blur(1px)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
      />
    ))}
    {/* Dot grid */}
    <div className="absolute inset-0 opacity-[0.018]"
      style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
    {/* Bottom fade */}
    <div className="absolute inset-x-0 bottom-0 h-[50vh]" style={{ background: 'linear-gradient(to top, #040408, transparent)' }} />
  </div>
);
