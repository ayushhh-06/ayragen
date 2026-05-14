'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@ayragen/schema';

export const ShayariSection = ({ section }: { section: Section }) => {
  const { lines, author } = section.content;

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center bg-black/20 backdrop-blur-sm rounded-3xl mx-4 section-gap border border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, staggerChildren: 0.3 }}
        className="max-w-2xl"
      >
        {lines?.map((line: string, i: number) => (
          <motion.p
            key={i}
            className="text-2xl md:text-3xl italic mb-4 leading-relaxed text-glow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {line}
          </motion.p>
        ))}
        {author && (
          <motion.footer
            className="mt-8 text-lg opacity-60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            — {author}
          </motion.footer>
        )}
      </motion.div>
    </section>
  );
};
