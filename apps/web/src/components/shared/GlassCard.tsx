'use client';

import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export const GlassCard = ({ children, className = '', glow = false, hover = true }: GlassCardProps) => (
  <motion.div
    whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
    className={`glass rounded-3xl transition-all duration-500 ${glow ? 'glow-box' : ''} ${hover ? 'glow-box-hover' : ''} ${className}`}
  >
    {children}
  </motion.div>
);
