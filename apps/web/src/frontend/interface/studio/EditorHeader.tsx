'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Monitor, Smartphone, Tablet, 
  Undo2, Redo2, Eye, Share2, Rocket, Search, Plus, Play, Download, ShieldCheck
} from 'lucide-react';
import { useGenerationStore } from '@/database/state/useGenerationStore';
import Link from 'next/link';
import { PublishModal } from './PublishModal';
import { ExportModal } from './ExportModal';
import { useRouter } from 'next/navigation';

export const EditorHeader = () => {
  const { viewMode, setViewMode, undo, redo, undoStack, redoStack, manifest } = useGenerationStore();
  const [isPublishOpen, setIsPublishOpen] = React.useState(false);
  const [isExportOpen, setIsExportOpen] = React.useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-[#050505]/40 backdrop-blur-3xl border-b border-white/[0.05] flex items-center justify-between px-8 z-[100] transition-aura">
      {/* Left: Universe Context */}
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="p-2 text-white/20 hover:text-white transition-aura">
           <ChevronLeft size={20} />
        </Link>
        <div className="flex flex-col">
           <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-0.5">Cinematic Studio</span>
           <span className="text-xs font-bold text-white tracking-tight truncate max-w-[150px]">{manifest?.title || 'Untitled Vision'}</span>
        </div>
      </div>

      {/* Center: Essential Rhythm */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 bg-white/[0.02] border border-white/5 rounded-full">
         <button 
           onClick={() => setViewMode('desktop')}
           className={`p-2.5 rounded-full transition-aura ${viewMode === 'desktop' ? 'bg-white text-black shadow-2xl' : 'text-white/20 hover:text-white'}`}
         >
            <Monitor size={14} />
         </button>
         <button 
           onClick={() => setViewMode('mobile')}
           className={`p-2.5 rounded-full transition-aura ${viewMode === 'mobile' ? 'bg-white text-black shadow-2xl' : 'text-white/20 hover:text-white'}`}
         >
            <Smartphone size={14} />
         </button>
         <div className="w-px h-3 bg-white/10 mx-1" />
         <button onClick={undo} disabled={undoStack.length === 0} className="p-2 text-white/20 hover:text-white disabled:opacity-10 transition-aura"><Undo2 size={14} /></button>
         <button onClick={redo} disabled={redoStack.length === 0} className="p-2 text-white/20 hover:text-white disabled:opacity-10 transition-aura"><Redo2 size={14} /></button>
      </div>

      {/* Right: Masterpiece Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.push(`/presentation/${manifest?.id}`)}
          className="px-6 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-aura flex items-center gap-2"
        >
          <Play size={10} fill="black" />
          Premiere
        </button>
        
        <button 
          onClick={() => setIsExportOpen(true)}
          className="p-3 bg-white/[0.03] border border-white/5 text-white/30 hover:text-white rounded-full transition-aura"
        >
          <Download size={14} />
        </button>

        <button 
          onClick={() => setIsPublishOpen(true)}
          className="px-8 py-3 bg-primary text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-aura flex items-center gap-3 group"
        >
          <ShieldCheck size={14} className="group-hover:scale-110 transition-all" />
          Seal Legacy
        </button>

        <PublishModal 
          isOpen={isPublishOpen}
          onClose={() => setIsPublishOpen(false)}
          websiteId={manifest?.id || ''}
          currentSubdomain={manifest?.metadata?.subdomain}
        />

        <ExportModal 
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          websiteId={manifest?.id || ''}
        />
      </div>
    </header>
  );
};
