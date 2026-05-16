'use client';

import React from 'react';
import { WebsiteManifest, Section } from '@ayragen/schema';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { GallerySection } from './GallerySection';
import { CTASection } from './CTASection';
import { FooterSection } from './FooterSection';
import { ShayariSection } from './ShayariSection';
import { TimelineSection } from './TimelineSection';
import { PricingSection } from './PricingSection';
import { GlobalAtmosphere } from './GlobalAtmosphere';
import { CinematicCursor } from './CinematicCursor';
import { CinematicGate } from './CinematicGate';
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
    <>
      <AnimatePresence>
        {!hasEntered && (
          <CinematicGate onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      <div 
        className="relative w-full bg-[#020203] selection:bg-primary/30 overflow-x-hidden"
        style={{
          // Dynamic Design Tokens
          '--radius-factor': manifest.theme.borderRadius === 'rounded' ? '9999px' : manifest.theme.borderRadius === 'soft' ? '24px' : '0px',
          '--primary-glow': manifest.theme.colors.primary + '33',
          '--font-heading': manifest.theme.typography.heading,
          '--font-body': manifest.theme.typography.body,
        } as React.CSSProperties}
      >
        <GlobalAtmosphere manifest={manifest} />
        <CinematicCursor />

        <AnimatePresence mode="wait">
          {hasEntered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="relative z-10"
            >
              {manifest.sections.sort((a, b) => a.order - b.order).map((section: Section, idx: number) => {
                const Component = SECTION_COMPONENTS[section.type.toLowerCase()];
                if (!Component) return null;

                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 100, skewY: 2, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, skewY: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ 
                      duration: 1.2, 
                      ease: [0.22, 1, 0.36, 1], 
                      delay: 0.1 
                    }}
                  >
                    <Component section={section} />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
