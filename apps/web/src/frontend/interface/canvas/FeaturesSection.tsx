'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Layout, Smartphone, Globe } from 'lucide-react';

export const FeaturesSection = ({ section }: { section: any }) => {
  const { title, subtitle, items = [] } = section.content || {};

  const getIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'performance': return <Zap className="w-5 h-5" />;
      case 'design': return <Layout className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'global': return <Globe className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-display mb-6 tracking-tight"
          >
            {title || 'Experience Perfection'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/40 max-w-2xl mx-auto font-light"
          >
            {subtitle || 'Discover the features that make our platform the leader in cinematic experiences.'}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-[32px] bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {getIcon(item.iconType)}
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-sm text-white/40 font-light leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
