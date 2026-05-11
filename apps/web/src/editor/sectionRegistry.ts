import dynamic from 'next/dynamic';
import React from 'react';

// Using dynamic imports for lazy loading sections to ensure performance
const HeroSection = dynamic(() => import('../components/sections/HeroSection').then(mod => mod.HeroSection), { ssr: false });
const GallerySection = dynamic(() => import('../components/sections/GallerySection').then(mod => mod.GallerySection), { ssr: false });
const ShayariSection = dynamic(() => import('../components/sections/ShayariSection').then(mod => mod.ShayariSection), { ssr: false });
const TimelineSection = dynamic(() => import('../components/sections/TimelineSection').then(mod => mod.TimelineSection), { ssr: false });
const CountdownSection = dynamic(() => import('../components/sections/CountdownSection').then(mod => mod.CountdownSection), { ssr: false });
const VideoSection = dynamic(() => import('../components/sections/HeroSection').then(mod => mod.HeroSection), { ssr: false }); // Fallback to Hero for now
const MusicPlayerSection = dynamic(() => import('../components/sections/MusicPlayer').then(mod => mod.MusicPlayer), { ssr: false });
const EndingRevealSection = dynamic(() => import('../components/sections/EndingReveal').then(mod => mod.EndingReveal), { ssr: false });

export const SectionRegistry: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  gallery: GallerySection,
  shayari: ShayariSection,
  timeline: TimelineSection,
  countdown: CountdownSection,
  video: VideoSection,
  music: MusicPlayerSection,
  scrapbook: GallerySection, // Fallback
  ending: EndingRevealSection,
  'cinematic-reveal': EndingRevealSection,
  'story-timeline': TimelineSection
};

export const getSectionComponent = (type: string) => {
  const Component = SectionRegistry[type.toLowerCase()];
  if (!Component) {
    console.warn(`Section type "${type}" not found in registry. Falling back to Hero.`);
    return SectionRegistry['hero'];
  }
  return Component;
};
