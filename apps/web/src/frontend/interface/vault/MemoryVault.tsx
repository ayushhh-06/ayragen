'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart, History, Star, Clock, Compass, Clapperboard } from 'lucide-react';
import Image from 'next/image';

const memories = [
  { id: 'm1', title: 'Midnight Muse', date: 'May 12, 2026', type: 'Romantic Story', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', isAnniversary: true },
  { id: 'm2', title: 'Golden Hour', date: 'Apr 28, 2026', type: 'Legacy Portfolio', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80', isAnniversary: false },
  { id: 'm3', title: 'Ethereal Echo', date: 'Mar 15, 2026', type: 'Cinematic Letter', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80', isAnniversary: false },
];

export const MemoryVault = () => {
  return (
    <div className="space-y-12">
      {/* Contextual Highlight (AI Resurfacing) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group rounded-[48px] overflow-hidden bg-white/[0.01] border border-white/5 p-12 flex flex-col md:flex-row items-center gap-12"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 opacity-30 pointer-events-none" />
        
        <div className="relative z-10 w-full md:w-1/2 aspect-video rounded-3xl overflow-hidden shadow-2xl">
           <img 
             src={memories[0].image} 
             className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
             alt="Featured Memory"
           />
           <div className="absolute inset-0 bg-black/20" />
           <div className="absolute top-6 left-6 px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/40 rounded-full flex items-center gap-2">
              <Star size={12} className="text-primary fill-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Memorable Highlight</span>
           </div>
        </div>

        <div className="relative z-10 space-y-6 flex-1">
           <div className="space-y-2">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">On this day, 1 year ago</span>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-tight">The Midnight Muse <br /> Universe</h2>
           </div>
           <p className="text-sm text-white/40 italic font-medium leading-relaxed max-w-md">
             "Your most immersive romantic creation. AI senses a nostalgic peak today. Revisit this universe to celebrate your timeless bond."
           </p>
           <div className="flex gap-4 pt-4">
              <button className="px-8 py-4 bg-white text-black rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                 <Clapperboard size={14} />
                 Replay Premiere
              </button>
              <button className="p-4 bg-white/5 border border-white/10 text-white/20 rounded-full hover:text-white transition-all">
                 <History size={18} />
              </button>
           </div>
        </div>
      </motion.div>

      {/* Grid of Legacy Portfolios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {memories.map((memory, i) => (
           <motion.div
             key={memory.id}
             whileHover={{ y: -10 }}
             className="relative group rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all"
           >
              <div className="h-64 relative overflow-hidden">
                 <img src={memory.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt={memory.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                 <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                       <Heart size={14} className="text-white/40" />
                    </div>
                 </div>
              </div>
              <div className="p-8 space-y-4">
                 <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">{memory.title}</h4>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">{memory.type} • {memory.date}</p>
                 </div>
                 <button className="w-full py-3 bg-white/5 text-white/40 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 hover:text-white transition-all">
                    Enter Vault
                 </button>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
};
