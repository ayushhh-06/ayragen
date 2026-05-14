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
import { apiClient } from '@/lib/api-client';

export default function EditorPageV2({ params }: { params: { id: string } }) {
  const { manifest, setManifest, isGenerating } = useGenerationStore();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const fetchManifest = async () => {
      if (manifest?.id === params.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.get(`/websites/${params.id}`);
        setManifest(res.data.manifest);
      } catch (err) {
        console.error('Failed to load universe:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchManifest();
  }, [params.id, setManifest]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#020203] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 animate-pulse">Reconstructing Universe...</span>
      </div>
    );
  }

  if (error || (!manifest && !isGenerating)) {
    return (
      <div className="h-screen w-full bg-[#020203] flex flex-col items-center justify-center text-center p-12">
         <div className="w-20 h-20 rounded-[32px] bg-white/[0.02] border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
            <Sparkles className="text-purple-500 w-10 h-10 animate-pulse" />
         </div>
         <h1 className="text-3xl font-bold text-white mb-4 font-display">Universe Out of Reach</h1>
         <p className="text-white/40 max-w-sm mx-auto leading-relaxed italic mb-10 text-sm">
           This cinematic vision has faded or you do not have the proper encryption keys to access it.
         </p>
         <button 
           onClick={() => window.location.href = '/dashboard'}
           className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-[11px] rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
           Back to Sanctuary
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
