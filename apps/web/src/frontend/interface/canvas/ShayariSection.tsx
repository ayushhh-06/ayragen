'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@ayragen/schema';
import { Heart } from 'lucide-react';

export const ShayariSection = ({ section }: { section: Section }) => {
  const { lines, author, category } = section.content;

  // Cinematic Particles for this section
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 10,
    scale: 0.5 + Math.random() * 1,
  }));

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-[#050505]">
      {/* Floating Mood Particles (Inspired by user's site) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: '110vh', x: `${p.x}vw`, opacity: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.4, 0],
              x: `${p.x + (Math.random() * 10 - 5)}vw` 
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              delay: p.delay,
              ease: "linear" 
            }}
            className="absolute text-primary/30"
            style={{ scale: p.scale }}
          >
            <Heart size={20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-[0.03] text-[15vw] font-black pointer-events-none uppercase tracking-widest whitespace-nowrap">
        {category || 'Emotion'}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <div className="space-y-12">
          {lines?.map((lineSet: any, i: number) => {
            // Handle both string and object { hindi, english }
            const hindi = typeof lineSet === 'string' ? lineSet : lineSet.hindi;
            const english = typeof lineSet === 'string' ? null : lineSet.english;

            return (
              <div key={i} className="group flex flex-col items-center gap-4">
                <motion.p
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2, delay: i * 0.4 }}
                  className="text-4xl md:text-6xl font-serif italic text-white leading-tight tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  {hindi}
                </motion.p>
                {english && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    transition={{ duration: 1.2, delay: i * 0.4 + 0.6 }}
                    className="text-lg md:text-xl font-body text-white/80 max-w-xl"
                  >
                    {english}
                  </motion.p>
                )}
              </div>
            );
          })}
        </div>

        {author && (
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: (lines?.length || 0) * 0.4 + 1 }}
            className="mt-20 flex flex-col items-center gap-4"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
              — {author}
            </span>
          </motion.footer>
        )}
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-20" />
    </section>
  );
};
