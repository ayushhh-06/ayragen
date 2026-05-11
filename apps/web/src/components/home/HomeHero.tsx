'use client';

import React from 'react';
import { motion } from 'framer-motion';

const floatVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(20px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.25, duration: 1.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const HomeHero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-8 overflow-hidden">

      {/* Eyebrow badge */}
      <motion.div
        custom={0}
        variants={floatVariants}
        initial="hidden"
        animate="visible"
        className="mb-10 inline-flex items-center gap-2 px-5 py-2 rounded-full"
        style={{ background: 'rgba(192,132,252,0.08)', border: '1px solid rgba(192,132,252,0.2)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
        <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary/80">
          AI Cinematic Engine
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        custom={1}
        variants={floatVariants}
        initial="hidden"
        animate="visible"
        className="text-[clamp(3.5rem,12vw,10rem)] font-black tracking-tighter leading-[0.85] mb-6"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Your Story,{' '}
        <em className="not-italic" style={{ color: 'var(--primary)' }}>
          Immortalised.
        </em>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        custom={2}
        variants={floatVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg text-lg md:text-xl leading-relaxed mb-14"
        style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Inter, sans-serif' }}
      >
        Turn your most sacred memories into immersive cinematic universes.
        Powered by AI. Felt by the soul.
      </motion.p>

      {/* Floating orbs decorating the headline */}
      <div className="absolute top-[15%] left-[8%] w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.12), transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-[20%] right-[8%] w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,168,212,0.1), transparent 70%)', filter: 'blur(50px)' }} />

      {/* Scroll indicator */}
      <motion.div
        custom={4}
        variants={floatVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-bold tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(192,132,252,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  );
};
