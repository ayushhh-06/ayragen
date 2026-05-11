'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@auragen/schema';

export const HeroSection = ({ section }: { section: Section }) => {
  const { title, copy, imageUrl } = section.content;

  // Cloudinary Optimization Pattern
  const optimizedImageUrl = imageUrl?.replace('/upload/', '/upload/q_auto,f_auto,w_1920,c_limit/');
  const mobileImageUrl = imageUrl?.replace('/upload/', '/upload/q_auto,f_auto,w_800,c_limit/');

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden section-container">
      {imageUrl && (
        <picture className="absolute inset-0 z-0">
          <source media="(max-width: 768px)" srcSet={mobileImageUrl} />
          <img 
            src={optimizedImageUrl} 
            alt={title} 
            loading="eager"
            className="w-full h-full object-cover opacity-10 scale-105 blur-[2px]"
          />
        </picture>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 space-y-10"
      >
        <div className="space-y-4">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '1em' }}
            animate={{ opacity: 0.4, letterSpacing: '0.5em' }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-display block"
          >
            A Story of Emotion
          </motion.span>
          <h1 className="text-7xl md:text-[10rem] font-black text-glow tracking-tighter leading-[0.8] mb-4">
            {title}
          </h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-xl md:text-3xl max-w-2xl mx-auto font-medium leading-relaxed"
        >
          {copy}
        </motion.p>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1.5, ease: "circOut" }}
          className="h-[1px] w-32 bg-white/20 mx-auto" 
        />
      </motion.div>

      {/* Atmospheric Floating Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary/40 rounded-full blur-sm animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-3 h-3 bg-blue-500/30 rounded-full blur-md animate-pulse delay-1000" />
    </section>
  );
};
