'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@auragen/schema';

export const TimelineSection = ({ section }: { section: Section }) => {
  const { events } = section.content;

  return (
    <section className="p-12 md:p-24 section-gap relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 -translate-x-1/2 hidden md:block" />
      
      <div className="space-y-12 md:space-y-24">
        {events?.map((event: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="flex-1 text-center md:text-right">
              <span className="text-primary font-bold text-xl">{event.date}</span>
              <h3 className="text-2xl font-bold mt-2">{event.title}</h3>
              <p className="mt-4 opacity-70 leading-relaxed">{event.description}</p>
            </div>
            
            <div className="relative z-10 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_var(--primary)]" />
            
            <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden glass">
              {event.image && (
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
