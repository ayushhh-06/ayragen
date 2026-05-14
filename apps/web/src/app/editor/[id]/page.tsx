'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditorHeader } from '@/frontend/interface/studio/EditorHeader';
import { SceneSidebar } from '@/frontend/interface/studio/SceneSidebar';
import { PropertiesInspector } from '@/frontend/interface/studio/PropertiesInspector';
import { Artboard } from '@/frontend/interface/studio/Artboard';
import { AuraCopilot } from '@/frontend/interface/studio/AuraCopilot';
import { AuraWorkspace } from '@/frontend/interface/studio/AuraWorkspace';
import { useGenerationStore } from '@/database/state/useGenerationStore';
import { Loader2, Sparkles } from 'lucide-react';

export default function EditorPageV2({ params }: { params: { id: string } }) {
  const { manifest, isGenerating } = useGenerationStore();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        // Undo/Redo logic handled in store, but could trigger here
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!manifest && !isGenerating) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center text-center p-12">
         <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
            <Sparkles className="text-primary w-10 h-10 animate-pulse" />
         </div>
         <h1 className="text-3xl font-black text-white mb-4 uppercase tracking-widest">No Active Universe</h1>
         <p className="text-white/40 max-w-md mx-auto leading-relaxed italic mb-8">
           It seems you haven't ignited an AI generation yet, or the session has expired. Return to the builder to create something magical.
         </p>
         <button 
           onClick={() => window.location.href = '/builder'}
           className="px-8 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
           Back to Builder
         </button>
      </div>
    );
  }

  return (
    <AuraWorkspace>
      <div className="h-screen w-full overflow-hidden selection:bg-primary/30 selection:text-white">
        {/* Cinematic Overlays */}
        <div className="fixed inset-0 pointer-events-none z-[9999] border-[16px] border-[#050505]" />
      <div className="fixed inset-0 pointer-events-none z-[1000] bg-[url('/grain.png')] opacity-[0.03] mix-blend-overlay" />

      {/* Editor Components */}
      <EditorHeader />
      
      <div className="flex h-full pt-16">
        <SceneSidebar />
        
        <div className="flex-1 relative">
          <Artboard />
          <AuraCopilot />
        </div>

        <PropertiesInspector />
      </div>

      {/* Fullscreen Loading State for AI Generation within Editor */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl z-[10000] flex flex-col items-center justify-center text-center"
          >
             <div className="relative">
                <Loader2 className="w-24 h-24 text-primary animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-8 h-8 animate-pulse" />
             </div>
             <h2 className="mt-8 text-2xl font-black text-white uppercase tracking-[0.3em]">Igniting Vision</h2>
             <p className="mt-4 text-primary/60 font-bold uppercase tracking-widest italic animate-bounce">Neural Architecture in Progress...</p>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </AuraWorkspace>
  );
}
