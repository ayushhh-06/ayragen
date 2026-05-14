'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  Layers, Palette, Image as ImageIcon, Box, 
  GripVertical, Copy, Trash2, EyeOff, Plus, Sparkles
} from 'lucide-react';
import { useGenerationStore } from '@/database/state/useGenerationStore';

export const SceneSidebar = () => {
  const [activeTab, setActiveTab] = useState<'layers' | 'themes' | 'assets'>('layers');
  const { manifest, updateManifest, setSelectedSection, selectedSectionId } = useGenerationStore();

  const handleReorder = (newSections: any[]) => {
    updateManifest(prev => ({ ...prev, sections: newSections }));
  };

  const deleteSection = (id: string) => {
    updateManifest(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== id)
    }));
  };

  const duplicateSection = (section: any) => {
    const newSection = {
      ...section,
      id: `section-${Date.now()}`,
      order: section.order + 1
    };
    updateManifest(prev => {
      const idx = prev.sections.findIndex(s => s.id === section.id);
      const newSections = [...prev.sections];
      newSections.splice(idx + 1, 0, newSection);
      return { ...prev, sections: newSections };
    });
  };

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-80 bg-[#050505]/60 backdrop-blur-3xl border-r border-white/[0.08] flex flex-col z-50">
      {/* Tab Switcher */}
      <div className="flex border-b border-white/5">
        {[
          { id: 'layers', icon: Layers, label: 'Layers' },
          { id: 'themes', icon: Palette, label: 'Atmosphere' },
          { id: 'assets', icon: ImageIcon, label: 'Library' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex flex-col items-center py-4 gap-1.5 transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
          >
            <tab.icon size={18} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="sidebarTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'layers' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Scene Hierarchy</h3>
                <button className="p-1.5 rounded-md hover:bg-white/5 text-primary/80 hover:text-primary transition-all">
                  <Plus size={16} />
                </button>
              </div>

              <Reorder.Group axis="y" values={manifest?.sections || []} onReorder={handleReorder} className="space-y-2">
                {manifest?.sections.map((section) => (
                  <Reorder.Item 
                    key={section.id} 
                    value={section}
                    className={`group p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedSectionId === section.id 
                      ? 'bg-primary/10 border-primary/30 shadow-[0_0_20px_rgba(192,132,252,0.1)]' 
                      : 'bg-white/[0.03] border-white/5 hover:border-white/10 hover:bg-white/[0.05]'
                    }`}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GripVertical size={14} className="text-white/10 group-hover:text-white/30 cursor-grab active:cursor-grabbing" />
                        <div>
                          <p className="text-xs font-bold text-white/90 capitalize">{section.type.replace('-', ' ')}</p>
                          <p className="text-[10px] font-medium text-white/30 truncate max-w-[120px]">{section.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={(e) => { e.stopPropagation(); duplicateSection(section); }}
                          className="p-1.5 text-white/30 hover:text-white hover:bg-white/10 rounded-md"
                        >
                          <Copy size={12} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }}
                          className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-md"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </motion.div>
          )}

          {activeTab === 'themes' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Global Presets</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Noir', 'Ethereal', 'Dreamy', 'Luxury', 'Minimal', 'Dynamic'].map((theme) => (
                    <button 
                      key={theme}
                      className="group flex flex-col gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all"
                    >
                      <div className="h-16 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/5 overflow-hidden relative">
                         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
                      </div>
                      <span className="text-[10px] font-bold text-white/60 group-hover:text-primary transition-all uppercase tracking-wider">{theme}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/20 space-y-3 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">AI Mood Swap</span>
                  </div>
                  <p className="text-xs font-medium text-white/70 leading-relaxed">Let AuraGen reimagine the entire visual atmosphere.</p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-all">
                  <Sparkles size={64} className="text-primary" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[10px] font-medium text-white/30 uppercase tracking-wider">Auto-saving</span>
        </div>
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider tracking-tighter">v1.2.0-cinematic</span>
      </div>
    </aside>
  );
};
