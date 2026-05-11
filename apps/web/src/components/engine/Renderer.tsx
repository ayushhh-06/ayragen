'use client';

import React from 'react';
import { SectionRenderer } from './SectionRenderer';
import { ThemeProvider } from './ThemeProvider';
import { FinalReveal } from './FinalReveal';
import { getSectionComponent } from '@/editor/sectionRegistry';

export const Renderer = ({ manifest }: { manifest: any }) => {
  if (!manifest) return null;

  return (
    <ThemeProvider theme={manifest.theme}>
      <FinalReveal>
        <div className="relative overflow-x-hidden">
          {manifest.sections?.map((section: any, index: number) => {
            const Component = getSectionComponent(section.type);
            
            return (
              <SectionRenderer
                key={section.id}
                index={index}
                section={section}
                Component={Component}
              />
            );
          })}
        </div>
      </FinalReveal>
    </ThemeProvider>
  );
};
