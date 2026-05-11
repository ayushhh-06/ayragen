'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const STEPS = [
  { label: 'Sensing your emotion',       icon: '💭' },
  { label: 'Painting the atmosphere',    icon: '🎨' },
  { label: 'Writing your story',         icon: '✍️' },
  { label: 'Crafting the visuals',       icon: '✨' },
  { label: 'Breathing life into it',     icon: '🌹' },
];

interface RomanticLoaderProps { step?: string; stepIndex?: number; }

export const RomanticLoader = ({ step, stepIndex = 0 }: RomanticLoaderProps) => {
  const idx = Math.min(stepIndex, STEPS.length - 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Pulsing orb */}
      <div className="relative mb-16">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.6), rgba(249,168,212,0.3), transparent 70%)' }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="relative w-28 h-28 rounded-full flex items-center justify-center glass-strong"
        >
          <div className="absolute inset-2 rounded-full border border-purple-400/20" />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-10 h-10" style={{ color: 'var(--primary)' }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Step text */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 text-5xl"
      >
        {STEPS[idx].icon}
      </motion.div>

      <motion.h2
        key={`label-${idx}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-3xl md:text-4xl font-bold text-white mb-3"
      >
        {step || STEPS[idx].label}
      </motion.h2>

      <p className="label mb-14" style={{ color: 'rgba(255,255,255,0.28)' }}>
        Creating your emotional universe
      </p>

      {/* Progress dots */}
      <div className="flex gap-3">
        {STEPS.map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i <= idx ? 1 : 0.15, scale: i === idx ? 1.4 : 1 }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--primary)' }}
          />
        ))}
      </div>
    </div>
  );
};
