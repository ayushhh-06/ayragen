'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, X } from 'lucide-react';
import { Section } from '@ayragen/schema';

export const PopupNotes = ({ section }: { section: Section }) => {
  const { notes } = section.content;
  const [activeNote, setActiveNote] = useState<number | null>(null);

  return (
    <section className="p-12 section-gap flex flex-wrap justify-center gap-6">
      {notes?.map((note: any, i: number) => (
        <div key={i} className="relative">
          <motion.button
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
            onClick={() => setActiveNote(i)}
            className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center text-accent border border-accent/30 hover:bg-accent/40 transition-colors"
          >
            <StickyNote size={32} />
          </motion.button>

          <AnimatePresence>
            {activeNote === i && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0, y: 50 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 w-64 glass p-6 rounded-3xl z-40 shadow-2xl border-accent/20"
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveNote(null); }}
                  className="absolute top-4 right-4 opacity-40 hover:opacity-100"
                >
                  <X size={16} />
                </button>
                <p className="text-sm italic leading-relaxed pt-2">"{note.text}"</p>
                <div className="mt-4 flex justify-end">
                  <span className="text-[10px] uppercase tracking-tighter opacity-40">{note.context}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
};
