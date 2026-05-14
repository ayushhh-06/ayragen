'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Search, Filter, ArrowUpRight, Heart, 
  Layers, Palette, Play, ChevronRight, Wand2,
  ArrowLeft, ShieldCheck
} from 'lucide-react';
import { TEMPLATES, Template } from '@/lib/templates';
import Image from 'next/image';
import Link from 'next/link';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['All', 'Romantic', 'Anniversary', 'Luxury', 'Minimal', 'Portfolio'];

  const filteredTemplates = selectedCategory === 'All' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#020203] text-white font-body selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-20">
           <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white transition-all group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Studio</span>
           </Link>
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
               <ShieldCheck className="w-4 h-4 text-purple-400" />
             </div>
             <span className="font-display font-bold text-xl tracking-tight text-white">AyraGen <span className="text-white/20 italic font-light">Architect</span></span>
           </div>
           <div className="w-20" />
        </header>

        {/* Cinematic Hero Section */}
        <section className="text-center mb-24 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-4"
          >
            <Sparkles size={12} />
            Digital Fabric of Emotion
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter leading-none">
             Choose Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Universe.</span>
          </h1>
          
          <p className="text-white/30 text-xl font-light max-w-2xl mx-auto italic leading-relaxed">
            Premium architectural templates designed for emotional impact. <br /> Remixed by AI, finalized by your imagination.
          </p>

          {/* Search & Filter Bar */}
          <div className="pt-12 flex flex-col lg:flex-row items-center justify-center gap-6">
             <div className="relative w-full max-w-md group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-400 transition-colors" size={18} />
                <input 
                  placeholder="Search moods, emotions, or styles..."
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-sm text-white focus:border-purple-500/40 focus:bg-white/[0.04] outline-none transition-all shadow-2xl"
                />
             </div>
             
             <div className="flex items-center gap-2 p-1.5 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-3xl overflow-x-auto max-w-full scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                      selectedCategory === cat 
                        ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                        : 'text-white/30 border-transparent hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        </section>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredTemplates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex flex-col"
            >
               {/* Cinematic Thumbnail */}
               <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden border border-white/[0.08] bg-white/[0.01] transition-all duration-700">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-[#020203]/20 to-transparent opacity-80" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                     <span className="px-4 py-1.5 rounded-xl bg-black/60 backdrop-blur-2xl border border-white/10 text-[9px] font-bold text-white/60 uppercase tracking-widest">{template.category}</span>
                     {idx === 0 && <span className="px-4 py-1.5 rounded-xl bg-purple-500/20 backdrop-blur-2xl border border-purple-500/30 text-[9px] font-bold text-purple-300 uppercase tracking-widest animate-pulse">Trending</span>}
                  </div>

                  {/* High-End Hover Interaction */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-md scale-110 group-hover:scale-100">
                      <button className="px-8 py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                         <Play size={14} className="fill-current" />
                         Preview Universe
                      </button>
                      <button className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                         <Wand2 size={14} />
                         AI Remix
                      </button>
                  </div>
               </div>

               {/* Descriptive Content */}
               <div className="pt-8 px-4 space-y-4">
                  <div className="flex justify-between items-start">
                     <div className="space-y-1">
                        <h3 className="text-2xl font-bold font-display text-white">{template.name}</h3>
                        <p className="text-[11px] text-white/30 italic font-medium tracking-wide">{template.description}</p>
                     </div>
                     <button className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/10 text-white/20 hover:text-pink-400 hover:bg-pink-400/10 transition-all flex items-center justify-center">
                        <Heart size={18} />
                     </button>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-white/10 uppercase tracking-[0.3em]">
                     <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Layers size={12} />
                          <span>8 Layers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Palette size={12} />
                          <span>4 Moods</span>
                        </div>
                     </div>
                     <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-purple-500/40 group-hover:text-purple-400 transition-all">
                        <ArrowUpRight size={16} />
                     </div>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
