'use client';

import { motion } from 'framer-motion';

interface EmotionBadgeProps { label: string; emoji?: string; color?: string; }

const colors: Record<string, string> = {
  purple:  'rgba(192,132,252,0.15)',
  rose:    'rgba(249,168,212,0.15)',
  indigo:  'rgba(129,140,248,0.15)',
};

const borders: Record<string, string> = {
  purple: 'rgba(192,132,252,0.35)',
  rose:   'rgba(249,168,212,0.35)',
  indigo: 'rgba(129,140,248,0.35)',
};

export const EmotionBadge = ({ label, emoji, color = 'purple' }: EmotionBadgeProps) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-label font-bold tracking-widest uppercase"
    style={{ background: colors[color] || colors.purple, border: `1px solid ${borders[color] || borders.purple}`, color: 'rgba(255,255,255,0.75)' }}
  >
    {emoji && <span>{emoji}</span>}
    {label}
  </motion.span>
);
