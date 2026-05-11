'use client';

import React from 'react';
import { GripVertical, Trash2, Plus, LayoutList } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';

interface SectionEditorProps {
  manifest: any;
  onUpdate: (manifest: any) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({ manifest, onUpdate }) => {
  const sections = manifest?.sections || [];

  const handleReorder = (newOrder: any[]) => {
    // Update the 'order' field in each section based on the new array
    const reordered = newOrder.map((section, index) => ({ ...section, order: index }));
    onUpdate({ ...manifest, sections: reordered });
  };

  const removeSection = (id: string) => {
    const filtered = sections.filter((s: any) => s.id !== id);
    onUpdate({ ...manifest, sections: filtered });
  };

  const addSection = (type: string) => {
    const newSection = {
      id: `s-${Date.now()}`,
      type,
      title: `New ${type}`,
      order: sections.length,
      content: {}
    };
    onUpdate({ ...manifest, sections: [...sections, newSection] });
  };

  return (
    <div className="space-y-8 pb-10">
      
      <section>
        <div className="flex items-center gap-2 mb-4">
          <LayoutList className="w-4 h-4 text-rose" />
          <h3 className="text-sm font-label uppercase tracking-widest text-white/70">Current Narrative</h3>
        </div>

        <Reorder.Group axis="y" values={sections} onReorder={handleReorder} className="space-y-3">
          {sections.map((section: any) => (
            <Reorder.Item 
              key={section.id} 
              value={section}
              className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] cursor-grab active:cursor-grabbing hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-white/20" />
                <div>
                  <span className="text-sm font-bold block">{section.title || section.type}</span>
                  <span className="text-xs text-white/40 font-mono capitalize">{section.type}</span>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Plus className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-label uppercase tracking-widest text-white/70">Add Sections</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { type: 'gallery', label: 'Gallery' },
            { type: 'story-timeline', label: 'Timeline' },
            { type: 'shayari', label: 'Shayari' },
            { type: 'countdown', label: 'Countdown' },
            { type: 'cinematic-reveal', label: 'Reveal' }
          ].map((s) => (
            <button
              key={s.type}
              onClick={() => addSection(s.type)}
              className="p-3 rounded-xl border border-dashed border-white/10 text-white/50 text-xs font-bold hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all text-left flex items-center gap-2 group"
            >
              <Plus className="w-3 h-3 group-hover:text-primary transition-colors" />
              {s.label}
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
