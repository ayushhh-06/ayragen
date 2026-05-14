'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@ayragen/schema';

export const GallerySection = ({ section }: { section: Section }) => {
  const { title, subtitle, images } = section.content;

  const displayImages = images || [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070',
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070',
    'https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2071'
  ];

  return (
    <section className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-4 mb-2"
          >
             <div className="h-[1px] w-8 bg-primary/40" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">Museum of Moments</span>
             <div className="h-[1px] w-8 bg-primary/40" />
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">{title}</h2>
          <p className="text-white/40 text-sm font-medium tracking-widest uppercase italic">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[1200px] md:h-[800px]">
          {displayImages.slice(0, 6).map((img: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-3xl group cursor-pointer border border-white/5 ${
                i === 0 ? 'md:col-span-8 md:row-span-2' : 
                i === 1 ? 'md:col-span-4 md:row-span-1' :
                i === 2 ? 'md:col-span-4 md:row-span-1' :
                i === 3 ? 'md:col-span-4 md:row-span-1' :
                i === 4 ? 'md:col-span-4 md:row-span-1' :
                'md:col-span-4 md:row-span-1'
              }`}
            >
              <img 
                src={img} 
                className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 brightness-75 group-hover:brightness-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Moment {i + 1}</p>
                    <p className="text-xs font-medium text-white/60 italic">Cinematic Capture</p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
