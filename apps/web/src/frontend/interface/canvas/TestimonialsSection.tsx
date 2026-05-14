'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';

export const TestimonialsSection = ({ section }: { section: any }) => {
  const { title, items = [] } = section.content || {};

  return (
    <section className="py-24 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-20 text-center">{title || 'Trusted by Creators'}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 relative flex flex-col justify-between"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-white/[0.03] rotate-12" />
              
              <p className="text-lg text-white/70 italic font-light leading-relaxed mb-8 relative z-10">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <Image src={item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80'} width={48} height={48} alt={item.author} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{item.author}</h4>
                  <p className="text-[11px] text-white/30 uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
