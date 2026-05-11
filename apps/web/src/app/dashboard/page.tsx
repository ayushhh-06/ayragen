'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Sparkles, Clock, Globe, MoreVertical } from 'lucide-react';

import { FloatingNavbar } from '@/components/shared/FloatingNavbar';
import { AmbientBackground } from '@/components/shared/AmbientBackground';
import { GlassCard } from '@/components/shared/GlassCard';
import { EmotionBadge } from '@/components/shared/EmotionBadge';

const mockProjects = [
  { id: '1', title: 'The Paris Apology', mood: 'Melancholic', aesthetic: 'Retro Film', date: '2 hours ago', status: 'published', image: 'bg-gradient-to-br from-indigo-900/40 to-slate-900/40' },
  { id: '2', title: 'Our 5th Anniversary', mood: 'Romantic', aesthetic: 'Sunset Glow', date: 'Yesterday', status: 'draft', image: 'bg-gradient-to-br from-rose-900/40 to-orange-900/40' },
  { id: '3', title: 'Midnight Confession', mood: 'Dreamy', aesthetic: 'Midnight Stars', date: 'Oct 12, 2026', status: 'published', image: 'bg-gradient-to-br from-purple-900/40 to-indigo-900/40' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-white pb-20">
      <FloatingNavbar />
      <AmbientBackground />
      <div className="noise" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-2 glow-text">Your Memories</h1>
            <p className="text-white/40 text-lg">Your cinematic universes, preserved forever.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/builder" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold tracking-wide hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <Plus className="w-5 h-5" />
              New Memory
            </Link>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
          {['All Universes', 'Drafts', 'Published', 'Favorites'].map((filter, i) => (
            <button key={filter} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-primary/20 text-white border border-primary/50 shadow-[0_0_15px_rgba(192,132,252,0.2)]' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white'}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Create New Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/builder">
              <GlassCard className="h-[400px] flex flex-col items-center justify-center group cursor-pointer border-dashed border-white/20 hover:border-primary/50 hover:bg-white/[0.04]">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all border border-white/10 group-hover:border-primary/40">
                  <Sparkles className="w-8 h-8 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Create Universe</h3>
                <p className="text-white/40 text-sm text-center px-8">Start a new emotional journey from a single prompt.</p>
              </GlassCard>
            </Link>
          </motion.div>

          {/* Project Cards */}
          {mockProjects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}>
              <GlassCard className="h-[400px] flex flex-col overflow-hidden group cursor-pointer relative" hover glow>
                {/* Image / Atmosphere Preview */}
                <div className={`h-[240px] ${project.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    {project.status === 'published' ? (
                      <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
                        <Globe className="w-3 h-3 text-green-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Live</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Draft</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Menu */}
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                    <Link href={`/editor/${project.id}`} className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                      Open Editor
                    </Link>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 p-6 bg-black/20 flex flex-col border-t border-white/5">
                  <div className="flex justify-between items-start mb-auto">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-primary transition-colors truncate pr-2">{project.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <EmotionBadge label={project.mood} color="purple" />
                    <span className="text-white/20 text-xs">•</span>
                    <span className="text-xs font-label uppercase tracking-widest text-white/50">{project.aesthetic}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>Edited {project.date}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
