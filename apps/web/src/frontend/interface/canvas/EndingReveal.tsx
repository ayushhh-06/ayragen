'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@auragen/schema';

export const EndingReveal = ({ section }: { section: Section }) => {
  const { previewText, mainTitle, subText, triggerLabel } = section.content;
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden section-container">
      {/* Handcrafted Cinematic Particles */}
      <AnimatePresence>
        {isRevealed && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: '50%', 
                  y: '50%', 
                  scale: 0,
                  opacity: 1 
                }}
                animate={{ 
                  x: `${Math.random() * 100}%`, 
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0.5],
                  opacity: [1, 0.8, 0],
                  filter: ['blur(0px)', 'blur(10px)', 'blur(20px)']
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3,
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
                className="absolute w-4 h-4 bg-primary rounded-full mix-blend-screen"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="pre-reveal"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="text-center space-y-8"
          >
            <p className="text-xl md:text-2xl opacity-60 max-w-md mx-auto">{previewText || "You've reached the end, but there's one more thing..."}</p>
            <button
              onClick={() => setIsRevealed(true)}
              className="px-8 py-4 bg-primary text-white rounded-full font-bold text-xl hover:shadow-[0_0_30px_var(--primary)] transition-shadow duration-300 transform hover:scale-110 active:scale-95"
            >
              {triggerLabel || "Reveal the Surprise"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="text-center z-10 p-8"
          >
            <motion.h2 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl md:text-9xl font-black text-glow mb-6"
            >
              {mainTitle}
            </motion.h2>
            <p className="text-2xl md:text-4xl font-medium max-w-3xl mx-auto leading-relaxed">
              {subText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-primary-gradient opacity-10 pointer-events-none" />
    </section>
  );
};
