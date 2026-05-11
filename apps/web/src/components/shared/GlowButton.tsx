'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variants = {
  primary: 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-[0_0_30px_rgba(192,132,252,0.35)] hover:shadow-[0_0_50px_rgba(192,132,252,0.55)] hover:brightness-110',
  ghost:   'border border-white/10 text-white/70 hover:text-white hover:border-white/25 hover:bg-white/5',
  glass:   'glass text-white hover:bg-white/[0.06]',
};

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-10 py-5 text-base',
};

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-label font-semibold tracking-wide transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
);

GlowButton.displayName = 'GlowButton';
