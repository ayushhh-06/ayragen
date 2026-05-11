'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Eye, Sparkles } from 'lucide-react';

import { FloatingNavbar } from '@/components/shared/FloatingNavbar';
import { AmbientBackground } from '@/components/shared/AmbientBackground';
import { GlassCard } from '@/components/shared/GlassCard';
import { EmotionBadge } from '@/components/shared/EmotionBadge';

const mockTemplates = [
  { id: 't1', name: 'Midnight Confession', category: 'Romantic', mood: 'Melancholic', aesthetic: 'Retro Film', gradient: 'from-purple-900/60 to-slate-900/60' },
  { id: 't2', name: 'Sunset Vows', category: 'Wedding', mood: 'Euphoric', aesthetic: 'Sunset Glow', gradient: 'from-orange-900/60 to-rose-900/60' },
  { id: 't3', name: 'Seoul Aesthetic', category: 'Travel', mood: 'Dreamy', aesthetic: 'Korean Aesthetic', gradient: 'from-indigo-900/60 to-blue-900/60' },
  { id: 't4', name: 'The Apology', category: 'Relationship', mood: 'Melancholic', aesthetic: 'Dark Love', gradient: 'from-red-900/60 to-black/60' },
  { id: 't5', name: 'Vintage Memories', category: 'Anniversary', mood: 'Romantic', aesthetic: 'Soft Minimal', gradient: 'from-amber-900/60 to-stone-900/60' },
  { id: 't6', name: 'Luxe Portfolio', category: 'Personal', mood: 'Cinematic', aesthetic: 'Luxury Black', gradient: 'from-zinc-800/60 to-black/60' },
];

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-white pb-20">
      <FloatingNavbar />
      <AmbientBackground />
      <div className="noise" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Inspiration</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black mb-6 glow-text">Cinematic Templates</h1>
            <p className="text-white/40 text-xl leading-relaxed">
              Start your emotional journey with our handcrafted atmospheric templates. 
              Each is a starting point for your AI intelligence engine.
            </p>
          </motion.div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['All Aesthetics', 'Romantic', 'Melancholic', 'Dreamy', 'Minimal', 'Dark'].map((cat, i) => (
            <button key={cat} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-white text-black' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTemplates.map((template, i) => (
            <motion.div key={template.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <GlassCard className="h-[450px] flex flex-col overflow-hidden group border border-white/10" hover>
                
                {/* Visual Preview */}
                <div className={`flex-1 bg-gradient-to-br ${template.gradient} relative overflow-hidden flex items-center justify-center p-8`}>
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                  
                  {/* Floating Elements Mockup */}
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }} 
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-full h-full border border-white/20 rounded-2xl bg-black/20 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/10 to-transparent" />
                    <h3 className="font-display text-3xl font-bold mb-3 italic">{template.name}</h3>
                    <div className="w-12 h-px bg-white/30" />
                  </motion.div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform">
                      <Play className="w-4 h-4" /> Use Template
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-colors">
                      <Eye className="w-4 h-4" /> Live Preview
                    </button>
                  </div>
                </div>

                {/* Meta */}
                <div className="p-6 bg-black/40 border-t border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">{template.name}</h3>
                    <span className="text-xs text-white/40">{template.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <EmotionBadge label={template.mood} color="purple" />
                    <EmotionBadge label={template.aesthetic} color="rose" />
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
