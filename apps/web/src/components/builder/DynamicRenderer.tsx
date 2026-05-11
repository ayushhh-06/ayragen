'use client';

import { WebsiteManifest, Component } from '@auragen/schema';
import { motion } from 'framer-motion';

export const DynamicRenderer = ({ manifest }: { manifest: WebsiteManifest }) => {
  if (!manifest) return null;

  const { theme, sections } = manifest;

  return (
    <div 
      className="w-full min-h-full transition-all duration-1000"
      style={{ 
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.typography.body,
      }}
    >
      <style jsx global>{`
        h1, h2, h3, h4, h5, h6 {
          font-family: ${theme.typography.heading}, sans-serif;
        }
      `}</style>

      {sections.map((section, index) => (
        <RenderSection key={section.id} section={section} theme={theme} />
      ))}
    </div>
  );
};

const RenderSection = ({ section, theme }: { section: Component; theme: any }) => {
  // Mapping section types to visual blocks
  switch (section.type) {
    case 'hero':
      return (
        <section className="py-24 px-8 text-center border-b border-white/5">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-6"
            style={{ color: theme.colors.text }}
          >
            {section.title}
          </motion.h1>
          <p className="max-w-2xl mx-auto text-xl opacity-60">
            {section.content.subtitle || section.content.description}
          </p>
          <div className="mt-10 flex justify-center gap-4">
             <button className="px-8 py-3 rounded-full font-bold" style={{ backgroundColor: theme.colors.primary, color: 'white' }}>
               Get Started
             </button>
          </div>
        </section>
      );
    case 'features':
      return (
        <section className="py-20 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {(section.content.items || [1, 2, 3]).map((item: any, i: number) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-xl font-bold mb-4">{item.title || `Feature ${i+1}`}</h3>
              <p className="opacity-60">{item.description || 'Intelligently generated content for this feature block.'}</p>
            </div>
          ))}
        </section>
      );
    default:
      return (
        <div className="py-20 text-center opacity-20 border-b border-white/5 italic">
          [{section.type} block: {section.title}]
        </div>
      );
  }
};
