'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Search, Compass, Users, Heart, Share2, 
  Play, Wand2, Filter, ChevronRight, Loader2, Globe
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { GlobalAtmosphere } from '@/frontend/interface/canvas/GlobalAtmosphere';
import { CinematicCursor } from '@/frontend/interface/canvas/CinematicCursor';
import Link from 'next/link';

export default function ExplorePage() {
  const [selectedType, setSelectedType] = useState('All');
  const [universes, setUniverses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const types = ['All', 'Cinematic', 'Romantic', 'Luxury', 'Ethereal'];

  useEffect(() => {
    const fetchUniverses = async () => {
      try {
        const { data } = await apiClient.get('/websites/explore');
        setUniverses(data);
      } catch (err) {
        console.error('Failed to fetch universe feed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUniverses();
  }, []);

  const filteredUniverses = universes.filter(uni => {
    const matchesType = selectedType === 'All' || uni.manifest?.emotionalTone?.vibe?.toLowerCase() === selectedType.toLowerCase();
    const matchesSearch = uni.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#020203] text-white font-body selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-purple-900/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-indigo-900/5 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <CinematicCursor />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[9px] text-purple-400 font-bold uppercase tracking-[0.3em]">
               <Compass size={12} />
               Public Network
            </div>
            <h1 className="text-6xl md:text-9xl font-bold font-display tracking-tighter leading-[0.85]">
               Explore the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Multiverse.</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-end gap-8">
             <div className="flex items-center gap-4 p-1.5 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-xl">
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedType === t ? 'bg-white text-black shadow-2xl' : 'text-white/30 hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
             
             <div className="relative w-full max-w-xs group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search visions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-xs text-white placeholder:text-white/10 outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all"
                />
             </div>
          </div>
        </div>

        {/* Dynamic Grid */}
        <section className="space-y-16 pb-32">
          {loading ? (
            <div className="py-48 flex flex-col items-center justify-center gap-8">
               <div className="relative">
                  <Loader2 className="w-16 h-16 text-purple-500 animate-spin" />
                  <div className="absolute inset-0 blur-2xl bg-purple-500/20 animate-pulse" />
               </div>
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/10">Scanning Neural Channels</span>
            </div>
          ) : filteredUniverses.length === 0 ? (
            <div className="py-48 text-center space-y-6">
               <Globe className="w-16 h-16 text-white/5 mx-auto" />
               <p className="text-white/20 text-lg font-light italic">No universes discovered in this sector yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredUniverses.map((uni, idx) => (
                <UniverseCard key={uni.id} uni={uni} index={idx} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const UniverseCard = ({ uni, index }: { uni: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const manifest = uni.manifest ? (typeof uni.manifest === 'string' ? JSON.parse(uni.manifest) : uni.manifest) : {};
  const bgImage = manifest.sections?.[0]?.content?.backgroundImage || 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col gap-8"
    >
      <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden border border-white/[0.08] bg-white/[0.01]">
        <img 
          src={bgImage} 
          className={`w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-[3000ms] ${isHovered ? 'scale-110' : 'scale-100'}`}
          alt={uni.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent opacity-90" />
        
        {/* Card Header */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
           <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
                {manifest.emotionalTone?.vibe || 'Cinematic'}
              </span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full text-white/60">
              <Heart size={12} className={uni.reactions > 0 ? 'fill-pink-500 text-pink-500' : ''} />
              <span className="text-[10px] font-bold">{uni.reactions || 0}</span>
           </div>
        </div>

        {/* Center CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
           <Link 
             href={`https://${uni.subdomain}.ayragen.app`} 
             target="_blank"
             className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
            >
             <Play size={28} className="fill-black translate-x-1" />
           </Link>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-8 left-8 right-8 space-y-4">
           <div className="space-y-1">
              <h3 className="text-3xl font-bold font-display leading-tight">{uni.title}</h3>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">by {uni.project?.user?.name || 'Architect'}</p>
           </div>
        </div>
      </div>

      <div className="px-4 flex justify-between items-center">
         <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-[#020203] bg-white/5 flex items-center justify-center text-[8px] font-bold text-white/40">
                {String.fromCharCode(64 + i + index)}
              </div>
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-[#020203] bg-purple-500/20 flex items-center justify-center text-[8px] font-bold text-purple-400">
              +12
            </div>
         </div>
         <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">
            Share Vision
            <Share2 size={12} />
         </button>
      </div>
    </motion.div>
  );
};
