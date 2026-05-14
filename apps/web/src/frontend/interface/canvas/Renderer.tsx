'use client';

import React from 'react';
import { WebsiteManifest, Section } from '@auragen/schema';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { GallerySection } from './GallerySection';
import { CTASection } from './CTASection';
import { FooterSection } from './FooterSection';
import { ShayariSection } from './ShayariSection';
import { TimelineSection } from './TimelineSection';
import { PricingSection } from './PricingSection';
import { motion, AnimatePresence } from 'framer-motion';

const SECTION_COMPONENTS: Record<string, any> = {
  hero: HeroSection,
  features: FeaturesSection,
  gallery: GallerySection,
  cta: CTASection,
  footer: FooterSection,
  shayari: ShayariSection,
  timeline: TimelineSection,
  pricing: PricingSection,
};

export const Renderer = ({ manifest }: { manifest: WebsiteManifest }) => {
  if (!manifest || !manifest.sections) return null;

  return (
    <div className="relative w-full bg-[#050505] selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {manifest.sections.sort((a, b) => a.order - b.order).map((section: Section) => {
          const Component = SECTION_COMPONENTS[section.type.toLowerCase()];
          if (!Component) {
            console.warn(`[RENDERER] Unknown section type: ${section.type}`);
            return null;
          }

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
            >
              <Component section={section} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
