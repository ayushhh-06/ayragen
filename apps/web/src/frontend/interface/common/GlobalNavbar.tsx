'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ArrowRight, Mail, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const GlobalNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Explore', href: '/explore' },
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-[5000] transition-all duration-700 ${isScrolled ? 'py-4 px-6 md:px-12' : 'py-8 px-6 md:px-16'}`}>
      <motion.div 
        className={`max-w-7xl mx-auto rounded-full border transition-all duration-700 flex items-center justify-between px-6 py-3 ${
          isScrolled 
            ? 'bg-black/60 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-all">
            <Sparkles className="h-4 w-4 text-white" />
            <div className="absolute inset-0 blur-xl bg-purple-500/40 animate-pulse" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-purple-400 transition-all">AyraGen</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-purple-400 ${
                pathname === link.href ? 'text-purple-400' : 'text-white/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/auth" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">Login</Link>
          <Link href="/builder" className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            Ignite Studio
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-white/40 hover:text-white transition-all">
          <Menu size={20} />
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[6000] bg-black/95 backdrop-blur-3xl flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
               <span className="font-display font-bold text-2xl">AyraGen</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={24} /></button>
            </div>
            
            <div className="flex flex-col gap-8 flex-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bold font-display hover:text-purple-400 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5 space-y-6">
               <Link href="/builder" className="w-full py-5 bg-white text-black text-center font-black uppercase tracking-widest rounded-2xl block">Get Started</Link>
               <div className="flex justify-center gap-8 text-white/20">
                  <Globe size={20} />
                  <X size={20} />
                  <Mail size={20} />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
