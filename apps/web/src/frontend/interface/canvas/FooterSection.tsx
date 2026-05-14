'use client';

import React from 'react';
import { Sparkles, X, Instagram, Github } from 'lucide-react';
import Link from 'next/link';

export const FooterSection = ({ section }: { section: any }) => {
  const { copyright, links = [] } = section.content || {};

  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-bold text-lg tracking-tight">AuraGen</span>
        </div>

        <div className="flex gap-8 text-sm text-white/40 font-light">
          {links.map((link: any, idx: number) => (
            <a key={idx} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-6 text-white/20">
          <X className="w-4 h-4 hover:text-white cursor-pointer transition-all" />
          <Instagram className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          <Github className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-white/[0.02] text-center text-[11px] text-white/10 uppercase tracking-widest font-bold">
        {copyright || `© ${new Date().getFullYear()} AuraGen Experience. All rights reserved.`}
      </div>
    </footer>
  );
};
