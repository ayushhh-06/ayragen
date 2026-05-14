'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { GlowButton } from '../shared/GlowButton';

export const FloatingNavbar = () => {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ['rgba(4,4,8,0)', 'rgba(4,4,8,0.85)']);
  const border = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.07)']);

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 backdrop-blur-xl"
      style={{ background: bg, borderBottom: border.get() ? `1px solid ${border.get()}` : 'none' }}
    >
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-label font-bold text-sm tracking-wide text-white/90 group-hover:text-white transition-colors">
          AuraGen
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {['Features', 'Examples', 'Pricing'].map(item => (
          <Link key={item} href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-white/40 hover:text-white/80 transition-colors duration-300">
            {item}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/builder">
          <GlowButton variant="primary" size="sm">
            Create Memory
          </GlowButton>
        </Link>
      </div>
    </motion.header>
  );
};
