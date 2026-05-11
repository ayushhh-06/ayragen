'use client';

import { useGenerationStore } from '@/store/useGenerationStore';
import { useGeneration } from '@/hooks/useGeneration';
import { PromptBar } from './PromptBar';
import { DynamicRenderer } from './DynamicRenderer';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Monitor, Tablet, Smartphone, Maximize, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const BuilderWorkspace = () => {
  const { isGenerating, step, message, manifest, startGeneration } = useGenerationStore();
  const { generate } = useGeneration();

  const handleGenerate = (prompt: string) => {
    generate(prompt);
  };

  return (
    <div className="flex flex-col h-screen bg-[#080808]">
      {/* Workspace Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold">A</div>
          <h2 className="text-sm font-medium text-white/80">
            {manifest ? manifest.title : 'New Project'}
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
          <Button variant="ghost" size="icon" className="w-8 h-8"><Monitor className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-white/40"><Tablet className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-white/40"><Smartphone className="w-4 h-4" /></Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="glass" size="sm">Preview</Button>
          <Button variant="premium" size="sm">Publish</Button>
        </div>
      </header>

      {/* Canvas Area */}
      <main className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,#111111_0%,#080808_100%)]">
        <AnimatePresence mode="wait">
          {!manifest && !isGenerating ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4"
            >
              <div className="text-center mb-12">
                <div className="w-20 h-20 rounded-3xl bg-red-600/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(229,9,20,0.1)]">
                  <Play className="w-8 h-8 text-red-500 fill-current" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">What should we build today?</h1>
                <p className="text-white/40 max-w-md mx-auto">
                  Describe your dream website and let AuraGen curate a cinematic experience for you.
                </p>
              </div>
              <PromptBar onGenerate={handleGenerate} />
            </motion.div>
          ) : isGenerating ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-red-600/20 blur-2xl animate-pulse" />
                <Loader2 className="w-12 h-12 text-red-500 animate-spin relative" />
              </div>
              <p className="mt-8 text-white font-medium tracking-widest uppercase text-xs">{step}</p>
              <p className="mt-2 text-white/40 text-sm">{message}</p>
            </motion.div>
          ) : (
            <motion.div 
              key="manifest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full overflow-hidden"
            >
              <div className="w-full h-full p-8 md:p-12 overflow-auto bg-[#0a0a0a]">
                <div className="max-w-[1440px] mx-auto border border-white/10 rounded-2xl bg-white/[0.02] shadow-2xl overflow-hidden min-h-full">
                  <DynamicRenderer manifest={manifest!} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Quick Access Sidebar */}
      <aside className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl">
        {['Layers', 'Assets', 'Themes', 'History'].map((item) => (
          <Button key={item} variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-white/5 group relative">
            <div className="w-5 h-5 bg-white/20 rounded group-hover:bg-red-500/50 transition-colors" />
            <span className="absolute left-14 px-2 py-1 rounded bg-black text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
              {item}
            </span>
          </Button>
        ))}
      </aside>
    </div>
  );
};
