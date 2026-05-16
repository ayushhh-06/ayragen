'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { WebsiteManifest } from '@ayragen/schema';

export const GlobalAtmosphere = ({ manifest }: { manifest: WebsiteManifest }) => {
  const { colors, effects } = manifest.theme;

  // Generate dynamic glowing orbs
  const orbs = useMemo(() => Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    size: 400 + Math.random() * 400,
    color: i % 2 === 0 ? colors.primary : colors.accent,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: 15 + Math.random() * 20,
  })), [colors]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020203]">
      {/* 1. Deep Background Gradient */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{ 
          background: `radial-gradient(circle at 50% -20%, ${colors.primary}22, transparent 70%)` 
        }} 
      />

      {/* 2. Animated Glowing Orbs (Luxury Feel) */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          animate={{
            x: ['-20%', '120%', '-20%'],
            y: ['-20%', '120%', '-20%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute rounded-full blur-[120px] mix-blend-screen opacity-20"
          style={{
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            left: `${orb.initialX}%`,
            top: `${orb.initialY}%`,
          }}
        />
      ))}

      {/* 3. Film Grain Overlay */}
      {effects.grain && (
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      )}

      {/* 4. Cinematic Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-40" />

      {/* 5. Ambient Dust Particles (Subtle) */}
      {effects.particles !== 'none' && (
        <div className="absolute inset-0 z-30">
           {/* Custom particle logic can go here or use a library */}
        </div>
      )}
    </div>
  );
};
