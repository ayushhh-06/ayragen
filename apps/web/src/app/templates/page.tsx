'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-presence';
import { 
  Sparkles, Search, Filter, ArrowUpRight, Heart, 
  Layers, Palette, Play, ChevronRight, Wand2
} from 'lucide-react';
import { TEMPLATES, Template } from '@/lib/templates';
import Image from 'next/image';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['All', 'Romantic', 'Anniversary', 'Luxury', 'Minimal', 'Portfolio'];

  const filteredTemplates = selectedCategory === 'All' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050505] p-8 md:p-16">
      {/* Cinematic Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-4"
        >
          <Sparkles size={12} />
          Cinematic Architect
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight uppercase">
          Choose Your <br /> Universe
        </h1>
        <p className="text-white/40 text-lg max-w-xl mx-auto italic font-medium leading-relaxed">
          Premium architectural templates designed for emotional impact. <br /> Remixed by AI, finished by you.
        </p>

        {/* Search & Filter */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-4">
           <div className="relative w-full max-w-md">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                placeholder="Search moods, emotions, or styles..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-full py-4 pl-14 pr-6 text-sm text-white focus:border-primary/50 outline-none transition-all"
              />
           </div>
           <div className="flex items-center gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-full">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-white text-black' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template, idx) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onMouseEnter={() => setHoveredId(template.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative rounded-[40px] overflow-hidden border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 cursor-pointer"
          >
             {/* Thumbnail */}
             <div className="relative h-[400px] overflow-hidden">
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80" />
                
                {/* Floating Tags */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                   <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black text-white/60 uppercase tracking-widest">{template.category}</span>
                   {idx === 0 && <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[9px] font-black text-primary uppercase tracking-widest">Trending</span>}
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[4px]">
                    <button className="px-8 py-3.5 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                       <Play size={12} fill="black" />
                       Preview Universe
                    </button>
                    <button className="px-8 py-3.5 bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                       <Wand2 size={12} />
                       AI Remix
                    </button>
                </div>
             </div>

             {/* Content */}
             <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                   <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{template.name}</h3>
                      <p className="text-xs text-white/30 italic font-medium mt-1">{template.description}</p>
                   </div>
                   <button className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all">
                      <Heart size={16} />
                   </button>
                </div>
                
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Layers size={10} />
                        <span>8 Sections</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Palette size={10} />
                        <span>4 Moods</span>
                      </div>
                   </div>
                   <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-primary" />
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
