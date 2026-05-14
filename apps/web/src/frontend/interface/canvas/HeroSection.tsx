'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMoodReactiveStyles } from '@/hooks/useMoodReactiveStyles';
import { Section } from '@auragen/schema';

export const HeroSection = ({ section }: { section: Section }) => {
  const { title, copy, backgroundImage } = section.content;
  const containerRef = useRef(null);
  const mood = useMoodReactiveStyles();
  
  // Visual Stillness: High emotional intensity often requires less motion
  const motionScale = (mood.name === 'Memorial' || mood.name === 'Minimal') ? 0.2 : 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${50 * motionScale}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + (0.2 * motionScale)]);

  return (
    <section ref={containerRef} className="h-[120vh] flex flex-col items-center justify-center text-center relative overflow-hidden" style={{ filter: mood.lighting }}>
      {/* Cinematic Background Layer */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10" />
        <img 
          src={backgroundImage || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094'} 
          alt={title} 
          className="w-full h-full object-cover grayscale-[0.2] brightness-[0.6]"
        />
      </motion.div>
      
      <motion.div
        style={{ opacity }}
        className="relative z-20 space-y-12 px-6"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: mood.easing }}
            className="flex items-center justify-center gap-4 mb-4"
          >
             <div className="h-[1px] w-12 bg-primary/40" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">Cinematic Experience</span>
             <div className="h-[1px] w-12 bg-primary/40" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: mood.easing }}
            className="text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter uppercase"
            style={{ letterSpacing: mood.letterSpacing }}
          >
            {title}
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed italic text-white/90"
        >
          {copy}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="w-px h-24 bg-gradient-to-b from-primary/60 to-transparent shadow-[0_0_15px_rgba(192,132,252,0.5)]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/20 animate-pulse">Begin the Journey</span>
        </motion.div>
      </motion.div>

      {/* Floating Atmosphere Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: Math.random() * 0.5 
            }}
            animate={{ 
              y: [null, "-20px", "20px"],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
          />
        ))}
      </div>
    </section>
  );
};
