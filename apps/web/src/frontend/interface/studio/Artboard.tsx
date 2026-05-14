'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGenerationStore } from '@/database/state/useGenerationStore';
import { Renderer } from '@/components/engine/Renderer';

export const Artboard = () => {
  const { viewMode, zoom, manifest, selectedSectionId, setSelectedSection } = useGenerationStore();

  const getWidth = () => {
    switch (viewMode) {
      case 'tablet': return '768px';
      case 'mobile': return '390px';
      default: return '100%';
    }
  };

  if (!manifest) return null;

  return (
    <main className="fixed inset-0 pt-16 pl-80 pr-80 bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(192,132,252,0.03),_transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

      {/* Viewport Wrapper */}
      <motion.div 
        layout
        className="relative h-[calc(100%-4rem)] w-full flex items-center justify-center p-8 overflow-y-auto custom-scrollbar"
        onClick={() => setSelectedSection(null)}
      >
        <motion.div
          animate={{ width: getWidth(), scale: zoom }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative bg-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] rounded-[2rem] border border-white/10 overflow-hidden min-h-[800px] origin-top"
          onClick={(e) => e.stopPropagation()}
        >
          {/* macOS Style Header for Desktop */}
          {viewMode === 'desktop' && (
            <div className="h-8 bg-white/[0.03] border-b border-white/5 flex items-center px-4 gap-1.5 sticky top-0 z-[60] backdrop-blur-md">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
            </div>
          )}

          {/* Real Website Content */}
          <div className="relative">
            <Renderer manifest={manifest} />
            
            {/* Selection Overlays */}
            {manifest.sections.map((section) => (
              <SectionOverlay 
                key={section.id} 
                sectionId={section.id} 
                isSelected={selectedSectionId === section.id}
                onSelect={() => setSelectedSection(section.id)}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

const SectionOverlay = ({ sectionId, isSelected, onSelect }: { sectionId: string, isSelected: boolean, onSelect: () => void }) => {
  return (
    <div 
      onClick={onSelect}
      className={`absolute inset-0 z-50 cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary ring-inset bg-primary/5' : 'hover:bg-white/[0.02]'}`}
      style={{ pointerEvents: isSelected ? 'none' : 'auto' }} // Allow interaction with content if selected? Maybe not for now.
    />
  );
};
