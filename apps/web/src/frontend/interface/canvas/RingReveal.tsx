'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface SectionContent {
  question: string;
  subtext: string;
}

interface Section {
  content: SectionContent;
}

interface RingRevealProps {
  section: Section;
}

export const RingReveal: React.FC<RingRevealProps> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black text-center p-6">
      {/* Cinematic Moonlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 space-y-12"
      >
        <motion.div 
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer group relative"
        >
          {/* Handcrafted Ring Box Visual */}
          <div className="w-32 h-32 md:w-48 md:h-48 glass-card flex items-center justify-center border-primary/20 group-hover:border-primary transition-colors duration-700">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 2, filter: 'blur(10px)' }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-4 h-4 rounded-full bg-primary animate-ping" />
                  <span className="text-display">Open Your Heart</span>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  className="relative"
                >
                  <Heart size={64} className="text-primary fill-primary animate-pulse" />
                  {/* Glowing Ring Silhouette */}
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-5xl md:text-8xl font-black text-glow tracking-tighter italic">
                {section.content.question}
              </h2>
              <p className="text-xl md:text-2xl text-white/40 font-medium tracking-widest uppercase">
                {section.content.subtext}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Gold Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 1000 - 500, 
            y: Math.random() * 1000 - 500,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -100],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 10, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
        />
      ))}
    </section>
  );
};
