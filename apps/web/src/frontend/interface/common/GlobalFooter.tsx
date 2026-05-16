'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Github, Instagram, Mail, Globe, Shield, X } from 'lucide-react';
import Link from 'next/link';

export const GlobalFooter = () => {
  return (
    <footer className="relative bg-[#020203] border-t border-white/[0.03] pt-32 pb-20 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Section: Branding & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-purple-500/40 transition-all">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
              <span className="font-display font-bold text-3xl tracking-tighter">AyraGen <span className="text-white/20">AI</span></span>
            </Link>
            <p className="text-xl text-white/40 font-light leading-relaxed max-w-md">
              The world's first cinematic design ecosystem. We don't just build websites; we architect digital universes that pulse with emotion and life.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<X size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[48px] p-12 flex flex-col justify-between group hover:bg-white/[0.03] transition-all">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold font-display tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Ready to ignite <br /> your next legacy?</h3>
              <p className="text-sm text-white/20 uppercase tracking-[0.3em] font-black">Experience the future of creation.</p>
            </div>
            <Link href="/builder" className="mt-12 group/btn flex items-center justify-between px-8 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all">
               Start Architecting
               <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32 border-y border-white/[0.03] py-20">
          <FooterColumn title="Platform" links={[
            { name: 'Explore Universe', href: '/explore' },
            { name: 'Templates', href: '/templates' },
            { name: 'AI Engine', href: '/engine' },
            { name: 'Showcase', href: '/showcase' },
          ]} />
          <FooterColumn title="Creative" links={[
            { name: 'Editor V3', href: '/editor' },
            { name: 'Assets Library', href: '/assets' },
            { name: 'Theme Forge', href: '/themes' },
            { name: 'API Access', href: '/api-docs' },
          ]} />
          <FooterColumn title="Community" links={[
            { name: 'Creator Hub', href: '/community' },
            { name: 'Events', href: '/events' },
            { name: 'Discord', href: 'https://discord.gg/ayragen' },
            { name: 'Blog', href: '/blog' },
          ]} />
          <FooterColumn title="Legal" links={[
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Security', href: '/security' },
            { name: 'Cookie Policy', href: '/cookies' },
          ]} />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">&copy; 2026 AyraGen AI. All rights reserved.</p>
              <div className="h-1 w-1 rounded-full bg-white/10" />
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Proudly Crafted in the Void</p>
           </div>
           
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white transition-all cursor-pointer">
                 <Globe size={12} />
                 English (US)
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white transition-all cursor-pointer">
                 <Shield size={12} />
                 System Status: <span className="text-emerald-500">Optimal</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }: any) => (
  <div className="space-y-8">
    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20">{title}</h4>
    <ul className="space-y-4">
      {links.map((link: any) => (
        <li key={link.name}>
          <Link href={link.href} className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all inline-block font-medium">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }: any) => (
  <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all">
    {icon}
  </button>
);
