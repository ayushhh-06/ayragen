import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { motionPresets } from '@/animations/motionPresets';

interface SectionRendererProps {
  section: any;
  Component: React.ComponentType<{ section: any }>;
  index: number;
  animationConfig?: any;
}

export const SectionRenderer = memo(({ section, Component, index }: SectionRendererProps) => {
  return (
    <motion.div
      variants={motionPresets.editorialReveal}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      className="w-full relative overflow-hidden"
    >
      <Component section={section} />
    </motion.div>
  );
});

SectionRenderer.displayName = 'SectionRenderer';
