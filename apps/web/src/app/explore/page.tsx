'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Search, Compass, Users, Heart, Share2, 
  Play, Wand2, Filter, ChevronRight, Layout, Palette
} from 'lucide-react';
import { TEMPLATES } from '@/lib/templates';

const creators = [
  { id: '1', name: 'AuraMaster', avatar: 'AM', followers: '12.4k', creations: 142, vibe: 'Cinematic Noir' },
  { id: '2', name: 'LoveArchitect', avatar: 'LA', followers: '8.2k', creations: 89, vibe: 'Ethereal Romantic' },
  { id: '3', name: 'DigitalAlchemist', avatar: 'DA', followers: '5.1k', creations: 56, vibe: 'Minimal Luxury' },
];

export default function ExplorePage() {
  const [selectedType, setSelectedType] = useState('All');
  const types = ['All', 'Website', 'Letter', 'Invitation', 'Story'];

  return (
    <div className="min-h-screen bg-[#050505] p-8 md:p-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] text-primary font-black uppercase tracking-[0.3em]">
              <Compass size={12} />
              Universe Explorer
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
              Explore the <br /> <span className="text-glow">Ecosystem</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 p-1.5 bg-white/[0.03] border border-white/10 rounded-full">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedType === t ? 'bg-white text-black' : 'text-white/30 hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Creators Bar */}
        <div className="pt-12 border-t border-white/5">
           <div className="flex items-center gap-3 mb-6">
              <Users size={16} className="text-white/20" />
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Elite Creators</span>
           </div>
           <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
              {creators.map(creator => (
                <motion.div
                  key={creator.id}
                  whileHover={{ y: -5 }}
                  className="flex-shrink-0 flex items-center gap-4 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer"
                >
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-black text-xs shadow-xl">
                      {creator.avatar}
                   </div>
                   <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">{creator.name}</h4>
                      <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">{creator.followers} followers</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>

      {/* Universe Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
        {TEMPLATES.filter(t => selectedType === 'All' || t.type === selectedType).map((template, idx) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative rounded-[40px] overflow-hidden border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700"
          >
             <div className="relative h-[350px] overflow-hidden">
                <img 
                  src={template.thumbnail} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  alt={template.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                
                {/* Meta Overlays */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-black text-primary uppercase tracking-[0.2em]">
                   {template.type}
                </div>

                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-all"><Play size={20} fill="black" /></button>
                    <button className="p-4 bg-primary text-white rounded-full shadow-2xl hover:scale-110 transition-all"><Wand2 size={20} /></button>
                </div>
             </div>

             <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{template.name}</h3>
                      <p className="text-xs text-white/30 italic mt-1">by {creators[idx % 3].name}</p>
                   </div>
                   <div className="flex items-center gap-4 text-white/20">
                      <div className="flex items-center gap-1.5 hover:text-red-400 transition-all cursor-pointer">
                         <Heart size={14} />
                         <span className="text-[10px] font-bold">1.2k</span>
                      </div>
                      <Share2 size={14} className="hover:text-white transition-all cursor-pointer" />
                   </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                   <div className="px-3 py-1 rounded-full bg-white/5 text-[8px] font-black text-white/40 uppercase tracking-widest">{template.category}</div>
                   <div className="px-3 py-1 rounded-full bg-white/5 text-[8px] font-black text-white/40 uppercase tracking-widest">v2.1</div>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
