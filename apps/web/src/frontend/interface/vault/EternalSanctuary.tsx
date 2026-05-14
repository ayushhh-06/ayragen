'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart, History, Star, Clock, Compass, Clapperboard, ShieldCheck, Plus, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

const legacies = [
  { 
    id: 'L1', 
    title: 'The Midnight Muse', 
    date: 'Oct 2026', 
    type: 'Legacy Story', 
    vibe: 'Romantic Noir', 
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    id: 'L2', 
    title: 'Golden Hour Memories', 
    date: 'Aug 2025', 
    type: 'Family Journey', 
    vibe: 'Ethereal Warmth', 
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop' 
  },
];

export const EternalSanctuary = () => {
  return (
    <div className="min-h-screen bg-[#020203] text-white font-body selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] text-purple-400 font-bold uppercase tracking-widest">
               <ShieldCheck size={12} />
               Your Secured Universe
            </div>
            <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter leading-none">
               Creative <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Studio</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-end gap-6">
             <p className="text-sm text-white/30 font-light italic text-right max-w-xs leading-relaxed">
               "Where technology disappears and only the feeling remains."
             </p>
             <Link href="/builder" className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                <Plus size={18} />
                Create New Story
             </Link>
          </div>
        </div>

        {/* Hero Highlight */}
        <section className="relative group">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="relative aspect-[21/9] rounded-[48px] overflow-hidden border border-white/[0.08] bg-white/[0.01] group"
           >
              <img 
                src={legacies[0].image} 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-[3000ms]"
                alt="Featured Legacy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent" />
              
              <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
                 <div className="space-y-4">
                    <div className="flex items-center gap-2 text-purple-400">
                      <Sparkles size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Featured Creation</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold">{legacies[0].title}</h2>
                    <div className="flex items-center gap-4 text-[11px] font-medium text-white/40 uppercase tracking-widest">
                       <span>{legacies[0].vibe}</span>
                       <span className="w-1 h-1 rounded-full bg-white/20" />
                       <span>{legacies[0].date}</span>
                    </div>
                 </div>
                 
                 <Link href={`/editor/${legacies[0].id}`} className="px-8 py-4 bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-3xl text-white text-[12px] font-bold rounded-2xl border border-white/10 transition-all flex items-center gap-3 group/btn">
                    <Play size={14} className="fill-current" />
                    Open in Editor
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-all" />
                 </Link>
              </div>
           </motion.div>
        </section>

        {/* Gallery Grid */}
        <section className="space-y-12">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/20">Legacy Archive</h3>
            <span className="text-[10px] text-white/40">{legacies.length} Stories Saved</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {legacies.map((legacy, idx) => (
               <motion.div
                 key={legacy.id}
                 whileHover={{ y: -10 }}
                 className="relative group space-y-8"
               >
                  <div className="relative aspect-video rounded-[32px] overflow-hidden border border-white/[0.08] bg-white/[0.01]">
                     <img 
                       src={legacy.image} 
                       className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-[2000ms]"
                       alt={legacy.title}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent opacity-80" />
                     
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center">
                           <Play size={24} className="fill-white translate-x-0.5" />
                        </div>
                     </div>

                     <div className="absolute top-6 right-6">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white/20 group-hover:text-pink-400 transition-all">
                           <Heart size={18} />
                        </div>
                     </div>
                  </div>
                  
                  <div className="px-4 flex justify-between items-center">
                    <div className="space-y-2">
                       <h4 className="text-2xl font-bold font-display">{legacy.title}</h4>
                       <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{legacy.type} • {legacy.date}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-white/20 opacity-0 group-hover:opacity-100 transition-all">
                       <ArrowRight size={16} />
                    </div>
                  </div>
               </motion.div>
             ))}

             {/* Create New Placeholder */}
             <Link href="/builder" className="relative aspect-video rounded-[32px] border-2 border-dashed border-white/[0.05] hover:border-purple-500/30 transition-all flex flex-col items-center justify-center gap-4 group">
                <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group-hover:scale-110 transition-all">
                   <Plus size={32} className="text-white/20 group-hover:text-purple-400" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/10 group-hover:text-white/40">Create a New Universe</span>
             </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
