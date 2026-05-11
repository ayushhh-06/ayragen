'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@auragen/schema';

export const GallerySection = ({ section }: { section: Section }) => {
  const { items } = section.content;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section className="p-8 md:p-24 section-gap">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">{section.title}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {items?.map((item: any, i: number) => (
          <motion.div
            key={i}
            variants={itemAnim}
            whileHover={{ scale: 1.05 }}
            className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer"
          >
            <img
              src={item.url}
              alt={item.caption}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <p className="text-white font-medium">{item.caption}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
