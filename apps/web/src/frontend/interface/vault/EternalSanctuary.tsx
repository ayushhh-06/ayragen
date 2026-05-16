'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Heart, ShieldCheck, Plus, ArrowRight, Play, 
  Loader2, Trash2, Globe, Zap, Settings, MoreHorizontal,
  Layout, Activity, CreditCard
} from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { GlobalAtmosphere } from '@/frontend/interface/canvas/GlobalAtmosphere';
import { CinematicCursor } from '@/frontend/interface/canvas/CinematicCursor';
import { useAuth } from '@/hooks/useAuth';

export const EternalSanctuary = () => {
  const [legacies, setLegacies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchLegacies = async () => {
    try {
      const res = await apiClient.get('/websites');
      setLegacies(res.data);
    } catch (err) {
      console.error('Failed to fetch legacies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLegacies();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this legacy? This action is irreversible.')) return;
    
    setDeletingId(id);
    try {
      // Assuming a delete endpoint exists or we use save with a status
      await apiClient.delete(`/websites/${id}`);
      setLegacies(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error('Deletion failed:', err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020203] text-white font-body selection:bg-purple-500/30 overflow-x-hidden pb-32">
      
      {/* Cinematic Overlays */}
      {/* We pass a mock manifest for GlobalAtmosphere if needed, or update it to be standalone */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>
      
      <CinematicCursor />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 space-y-20">
        
        {/* Top Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            icon={<Layout size={18} />} 
            label="Total Legacies" 
            value={legacies.length.toString()} 
            subValue="Across all projects"
          />
          <StatCard 
            icon={<Activity size={18} />} 
            label="Credits Active" 
            value="720" 
            subValue="Neural processing power"
            color="text-pink-400"
          />
          <StatCard 
            icon={<CreditCard size={18} />} 
            label="Studio Tier" 
            value={user?.subscription?.planId || 'Genesis'} 
            subValue="Current plan"
            color="text-purple-400"
          />
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 border-b border-white/[0.03] pb-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] text-purple-400 font-bold uppercase tracking-widest">
               <ShieldCheck size={12} />
               Secure Neural Vault
            </div>
            <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter leading-none">
               My <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Legacies</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-end gap-6">
             <Link href="/builder" className="group px-8 py-4 bg-white text-black font-bold rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                <Plus size={18} />
                Architect New Universe
             </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        <section className="space-y-12">
          {loading ? (
            <div className="py-32 flex flex-col items-center justify-center gap-6">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                <div className="absolute inset-0 blur-xl bg-purple-500/20 animate-pulse" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 animate-pulse">Syncing with Cloud...</span>
            </div>
          ) : legacies.length === 0 ? (
            <div className="space-y-16 py-12">
              <div className="text-center space-y-4">
                 <h3 className="text-3xl md:text-5xl font-display font-bold text-white/40">The vault is silent.</h3>
                 <p className="text-white/20 text-lg font-light italic">"Awaiting your first digital legacy."</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-20 pointer-events-none">
                 <GhostCard title="Cinematic Story" type="Romantic" />
                 <GhostCard title="Ethereal Portfolio" type="Ethereal" />
                 <GhostCard title="Luxury Presence" type="Modern" />
              </div>

              <div className="flex justify-center pt-8">
                 <Link href="/builder" className="group px-12 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
                    <Zap size={16} className="fill-black" />
                    Ignite Your First Vision
                 </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
              {legacies.map((legacy, idx) => (
                <LegacyCard 
                  key={legacy.id} 
                  legacy={legacy} 
                  onDelete={() => handleDelete(legacy.id)}
                  isDeleting={deletingId === legacy.id}
                />
              ))}

              {/* Create New Placeholder */}
              <Link href="/builder" className="relative aspect-video rounded-[32px] border-2 border-dashed border-white/[0.05] hover:border-purple-500/30 transition-all flex flex-col items-center justify-center gap-4 group bg-white/[0.01]">
                <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group-hover:scale-110 transition-all">
                   <Plus size={32} className="text-white/20 group-hover:text-purple-400" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/10 group-hover:text-white/40">Architect a New Universe</span>
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, subValue, color = "text-white/40" }: any) => (
  <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 space-y-4 hover:bg-white/[0.04] transition-all group">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-xl bg-white/[0.03] border border-white/5 ${color} group-hover:scale-110 transition-all`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{label}</span>
    </div>
    <div className="space-y-1">
      <div className="text-3xl font-display font-bold tracking-tight">{value}</div>
      <div className="text-[10px] text-white/20 uppercase tracking-widest font-medium">{subValue}</div>
    </div>
  </div>
);

const GhostCard = ({ title, type }: any) => (
  <div className="aspect-video rounded-[32px] border border-white/[0.05] bg-white/[0.01] overflow-hidden flex flex-col justify-end p-8">
     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
     <div className="relative space-y-2">
        <div className="w-12 h-1 bg-white/10 rounded-full" />
        <h4 className="text-xl font-bold font-display text-white/20">{title}</h4>
        <span className="text-[9px] font-black uppercase tracking-widest text-white/10">{type}</span>
     </div>
  </div>
);

const LegacyCard = ({ legacy, onDelete, isDeleting }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const bgImage = legacy.manifest?.sections?.find((s: any) => s.type === 'hero')?.content?.backgroundImage || 
                  'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group space-y-8"
    >
      <div className="relative aspect-video rounded-[32px] overflow-hidden border border-white/[0.08] bg-[#0a0a0a]">
        <img 
          src={bgImage} 
          className={`w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-[3000ms] ${isHovered ? 'scale-110' : 'scale-100'}`}
          alt={legacy.title}
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-[#020203]/20 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
              legacy.plan === 'ARCHITECT' 
                ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
                : 'bg-white/5 border-white/10 text-white/40'
            }`}>
              {legacy.plan || 'Genesis'}
            </span>
            {legacy.isPublished && (
              <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Globe size={10} />
                Live
              </span>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            disabled={isDeleting}
            className="w-10 h-10 rounded-2xl bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
          </button>
        </div>

        {/* Action Center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
          <div className="flex gap-4">
            <Link href={`/editor/${legacy.id}`} className="px-6 py-3 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
              <Settings size={14} />
              Customize
            </Link>
            <Link href={`/presentation/${legacy.id}`} className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
              <Play size={20} className="fill-white translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="px-4 flex justify-between items-end">
        <div className="space-y-2">
           <h4 className="text-3xl font-bold font-display tracking-tight">{legacy.title}</h4>
           <div className="flex items-center gap-3">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                {legacy.subdomain ? `${legacy.subdomain}.ayragen.ai` : 'Not Published'}
              </p>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                {new Date(legacy.createdAt).toLocaleDateString()}
              </p>
           </div>
        </div>
        <Link href={`/editor/${legacy.id}`} className="p-3 rounded-2xl border border-white/[0.05] text-white/20 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-all">
           <ArrowRight size={20} />
        </Link>
      </div>
    </motion.div>
  );
};
