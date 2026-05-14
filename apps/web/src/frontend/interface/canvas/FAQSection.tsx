'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';

export const FAQSection = ({ section }: { section: any }) => {
  const { title, items = [] } = section.content || {};
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-16 text-center">{title || 'Frequently Asked Questions'}</h2>
        
        <div className="space-y-4">
          {items.map((item: any, idx: number) => (
            <div 
              key={idx}
              className="rounded-3xl border border-white/5 bg-white/[0.01] overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-lg font-medium">{item.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 45 : 0 }}
                  className="p-2 rounded-full bg-white/5"
                >
                  <Plus className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-white/40 font-light leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
