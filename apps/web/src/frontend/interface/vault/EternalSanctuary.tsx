'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart, History, Star, Clock, Compass, Clapperboard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const legacies = [
  { id: 'L1', title: 'The Midnight Muse', date: 'Est. 2026', type: 'Legacy Story', vibe: 'Romantic Noir', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=90' },
  { id: 'L2', title: 'Golden Hour Memories', date: 'Est. 2025', type: 'Family Journey', vibe: 'Ethereal Warmth', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=90' },
];

export const EternalSanctuary = () => {
  return (
    <div className="min-h-screen bg-[#050505] p-12 md:p-24 space-y-32">
      {/* Header: The Portal */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-[9px] text-primary font-black uppercase tracking-[0.5em]">
             <ShieldCheck size={12} />
             Sealed Memories
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8]">
             Your <br /> <span className="text-glow">Sanctuary</span>
          </h1>
        </div>
        <div className="flex flex-col items-end space-y-4">
           <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.4em] italic text-right max-w-xs leading-relaxed">
             "Where technology disappears and only the feeling remains."
           </p>
           <Link href="/builder" className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl hover:scale-105 transition-all">
              Begin New Journey
           </Link>
        </div>
      </div>

      {/* Featured Legacy: The Soul Focus */}
      <section className="relative group">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 2, ease: "var(--ease-aura)" }}
           className="relative aspect-[21/9] rounded-[60px] overflow-hidden border border-white/5 bg-white/[0.01]"
         >
            <img 
              src={legacies[0].image} 
              className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-[3000ms] grayscale-[0.5] group-hover:grayscale-0"
              alt="Legacy Focus"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            
            <div className="absolute bottom-16 left-16 space-y-6">
               <div className="space-y-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Active Anniversary</span>
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">{legacies[0].title}</h2>
               </div>
               <div className="flex items-center gap-6">
                  <button className="px-8 py-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl flex items-center gap-3">
                     <Clapperboard size={14} />
                     Revisit Premiere
                  </button>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{legacies[0].vibe} • {legacies[0].date}</span>
               </div>
            </div>
         </motion.div>
      </section>

      {/* Legacy Archive: The Timeline of Emotion */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
         {legacies.map((legacy, idx) => (
           <motion.div
             key={legacy.id}
             whileHover={{ y: -10 }}
             className="relative group space-y-8"
           >
              <div className="relative aspect-video rounded-[48px] overflow-hidden border border-white/5 bg-white/[0.01]">
                 <img 
                   src={legacy.image} 
                   className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-[2000ms]"
                   alt={legacy.title}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute top-8 right-8">
                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-3xl flex items-center justify-center text-white/20 group-hover:text-white transition-all">
                       <Heart size={20} />
                    </div>
                 </div>
              </div>
              <div className="px-4 space-y-2">
                 <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{legacy.title}</h4>
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{legacy.type} • {legacy.date}</p>
              </div>
           </motion.div>
         ))}
      </section>
    </div>
  );
};
