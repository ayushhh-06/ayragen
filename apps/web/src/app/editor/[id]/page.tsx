'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Monitor, Smartphone, Tablet, ChevronLeft, Save, Globe, Palette, LayoutTemplate } from 'lucide-react';

import { Renderer } from '@/components/engine/Renderer';
import { useGenerationStore } from '@/store/useGenerationStore';
import { GlowButton } from '@/components/shared/GlowButton';
import { GlassCard } from '@/components/shared/GlassCard';
import { ThemeCustomizer } from '@/components/editor/ThemeCustomizer';
import { SectionEditor } from '@/components/editor/SectionEditor';

type ViewMode = 'desktop' | 'tablet' | 'mobile';
type TabMode = 'theme' | 'sections';

export default function EditorPage({ params }: { params: { id: string } }) {
  const { manifest, setManifest } = useGenerationStore();
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [activeTab, setActiveTab] = useState<TabMode>('theme');

  // Fallback to demo manifest if accessed directly without Zustand state
  useEffect(() => {
    if (!manifest) {
      console.warn("No manifest in store. Falling back to local storage or demo data...");
      // In a real app, we would fetch the manifest by ID here
    }
  }, [manifest]);

  const handlePublish = () => {
    // Logic to save and publish
    alert('Publishing is not fully wired up yet, but this feels premium!');
  };

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      case 'desktop': return 'w-full';
    }
  };

  if (!manifest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <Sparkles className="w-8 h-8 animate-pulse text-primary mr-3" />
        <span className="font-display text-2xl">Loading memory...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-white overflow-hidden selection:bg-primary/30">
      
      {/* Editor Navbar */}
      <header className="h-16 flex-shrink-0 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-xs font-label uppercase tracking-widest">Dashboard</span>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary">Editing</span>
            <span className="text-sm font-medium truncate max-w-[200px] text-white/80">{manifest.title}</span>
          </div>
        </div>

        {/* Viewport Controls */}
        <div className="hidden md:flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10">
          {[
            { id: 'desktop', icon: Monitor },
            { id: 'tablet', icon: Tablet },
            { id: 'mobile', icon: Smartphone }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as ViewMode)}
              className={`p-2 rounded-full transition-all ${viewMode === mode.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              <mode.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <GlowButton variant="ghost" size="sm">
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </GlowButton>
          <GlowButton variant="primary" size="sm" onClick={handlePublish}>
            <Globe className="w-4 h-4 mr-2" /> Publish
          </GlowButton>
        </div>
      </header>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Controls */}
        <aside className="w-[340px] flex-shrink-0 border-r border-white/5 bg-black/20 flex flex-col z-40 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          
          <div className="flex p-4 gap-2">
            <button 
              onClick={() => setActiveTab('theme')}
              className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${activeTab === 'theme' ? 'bg-white/10 border-white/10' : 'bg-transparent hover:bg-white/5 border-transparent'} border`}
            >
              <Palette className={`w-5 h-5 ${activeTab === 'theme' ? 'text-primary' : 'text-white/40'}`} />
              <span className="text-xs font-label uppercase tracking-widest text-white/70">Theme</span>
            </button>
            <button 
              onClick={() => setActiveTab('sections')}
              className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${activeTab === 'sections' ? 'bg-white/10 border-white/10' : 'bg-transparent hover:bg-white/5 border-transparent'} border`}
            >
              <LayoutTemplate className={`w-5 h-5 ${activeTab === 'sections' ? 'text-rose' : 'text-white/40'}`} />
              <span className="text-xs font-label uppercase tracking-widest text-white/70">Sections</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'theme' ? (
                <motion.div key="theme" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                  <ThemeCustomizer manifest={manifest} onUpdate={setManifest} />
                </motion.div>
              ) : (
                <motion.div key="sections" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <SectionEditor manifest={manifest} onUpdate={setManifest} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* Right Canvas - Live Preview */}
        <main className="flex-1 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[#0a0a0f] relative flex items-center justify-center p-8 overflow-hidden">
          {/* Subtle grid background for the canvas */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          
          <motion.div 
            layout
            className={`${getPreviewWidth()} h-full max-h-[850px] relative transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col`}
          >
            <GlassCard className="w-full h-full overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] !rounded-[2.5rem] relative group" glow>
              
              {/* Preview Window Header (macOS style) */}
              <div className="h-8 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center px-4 gap-2 absolute top-0 inset-x-0 z-[100] opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="mx-auto text-[10px] font-mono text-white/30 truncate max-w-[200px]">
                  auragen.co/p/{manifest.id}
                </div>
              </div>

              {/* The actual website render */}
              <div className="absolute inset-0 bg-black overflow-y-auto overflow-x-hidden custom-scrollbar">
                <Renderer manifest={manifest} />
              </div>
            </GlassCard>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
