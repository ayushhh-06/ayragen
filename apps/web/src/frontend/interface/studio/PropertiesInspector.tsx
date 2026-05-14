'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Type, Palette, Sliders, Play, 
  Settings2, Sparkles, Wand2, Info, ChevronRight
} from 'lucide-react';
import { useGenerationStore } from '@/database/state/useGenerationStore';

export const PropertiesInspector = () => {
  const { manifest, selectedSectionId, updateManifest } = useGenerationStore();
  const selectedSection = manifest?.sections.find(s => s.id === selectedSectionId);

  if (!selectedSection) {
    return (
      <aside className="fixed top-16 right-0 bottom-0 w-80 bg-[#050505]/60 backdrop-blur-3xl border-l border-white/[0.08] z-50 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 shadow-2xl">
           <Info className="text-white/10" size={32} />
        </div>
        <h3 className="text-sm font-bold text-white/60 mb-2 uppercase tracking-widest">Inspector</h3>
        <p className="text-xs text-white/30 leading-relaxed font-medium">Select a section from the canvas to view and edit its cinematic properties.</p>
      </aside>
    );
  }

  const updateContent = (key: string, value: any) => {
    updateManifest(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === selectedSectionId 
        ? { ...s, content: { ...s.content, [key]: value } }
        : s
      )
    }));
  };

  return (
    <aside className="fixed top-16 right-0 bottom-0 w-80 bg-[#050505]/60 backdrop-blur-3xl border-l border-white/[0.08] z-50 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-2 text-primary mb-1">
          <Settings2 size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Properties</span>
        </div>
        <h2 className="text-lg font-bold text-white capitalize">{selectedSection.type.replace('-', ' ')}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Content Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-1 text-white/40">
             <Type size={14} />
             <span className="text-[10px] font-bold uppercase tracking-widest">Content</span>
          </div>
          
          <div className="space-y-4">
            {Object.keys(selectedSection.content).map(key => {
              const val = selectedSection.content[key];
              if (typeof val !== 'string' || val.length > 500) return null;
              
              return (
                <div key={key} className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">{key}</label>
                  <textarea
                    value={val}
                    onChange={(e) => updateContent(key, e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-3 text-sm text-white/80 focus:border-primary/50 outline-none transition-all resize-none min-h-[80px] leading-relaxed custom-scrollbar"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Style Section (Mock Controls) */}
        <div className="space-y-6">
           <div className="flex items-center gap-2 px-1 text-white/40">
             <Palette size={14} />
             <span className="text-[10px] font-bold uppercase tracking-widest">Cinematics</span>
          </div>

          <div className="space-y-4">
             {['Glass Blur', 'Gradient Glow', 'Grain Intensity', 'Motion Sensitivity'].map(label => (
               <div key={label} className="space-y-3">
                 <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{label}</label>
                    <span className="text-[10px] font-mono text-primary">85%</span>
                 </div>
                 <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden relative border border-white/[0.02]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                    />
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 relative group cursor-pointer overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Sparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Copilot Suggestions</span>
            </div>
            <div className="space-y-2">
               <button className="w-full p-2 text-left text-[11px] text-white/50 hover:text-white bg-white/5 rounded-lg border border-transparent hover:border-primary/30 transition-all flex items-center justify-between group/btn">
                 "Make copy more poetic"
                 <ChevronRight size={10} className="opacity-0 group-hover/btn:opacity-100 transition-all translate-x-[-4px] group-hover/btn:translate-x-0" />
               </button>
               <button className="w-full p-2 text-left text-[11px] text-white/50 hover:text-white bg-white/5 rounded-lg border border-transparent hover:border-primary/30 transition-all flex items-center justify-between group/btn">
                 "Regenerate visuals"
                 <ChevronRight size={10} className="opacity-0 group-hover/btn:opacity-100 transition-all translate-x-[-4px] group-hover/btn:translate-x-0" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
