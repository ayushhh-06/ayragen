import { Injectable } from '@nestjs/common';
import { Template, WebsiteManifest, Section } from '@ayragen/schema';

@Injectable()
export class TemplateEngineService {
  /**
   * Assembles a full WebsiteManifest by combining a structural template 
   * with AI-synthesized content and theme data.
   */
  assemble(
    template: Template, 
    aiContent: Record<string, any>, 
    aiTheme: any
  ): WebsiteManifest {
    
    // Map template sections to actual Section objects with AI-injected content
    const sections: Section[] = template.sections.map((tSection, index) => ({
      id: `section-${index}`,
      type: tSection.type,
      title: aiContent[tSection.type]?.title || tSection.type,
      content: {
        ...tSection.defaultContent,
        ...aiContent[tSection.type],
      },
    }));

    return {
      id: Math.random().toString(36).substring(7),
      title: aiContent.globalTitle || 'Your AI Website',
      description: aiContent.globalDescription || 'Generated with AyraGen',
      templateId: template.id,
      emotionalTone: aiContent.emotionalTone,
      theme: {
        ...aiTheme,
        ...(template.themeOverride || {}),
      },
      sections,
      metadata: {
        musicMood: aiContent.musicMood,
        fontPairing: aiTheme.typography.heading + ' & ' + aiTheme.typography.body,
      },
    };
  }

  /**
   * Returns predefined cinematic templates for all major categories.
   */
  getAvailableTemplates(): Template[] {
    return [
      {
        id: 'birthday',
        name: 'Grand Celebration',
        description: 'Vibrant, energetic layout with a dramatic grand reveal.',
        sections: [
          { type: 'HeroSection', defaultContent: { title: 'The Big Day' } },
          { type: 'CountdownSection', defaultContent: {} },
          { type: 'GallerySection', defaultContent: {} },
          { type: 'ShayariSection', defaultContent: {} },
          { type: 'EndingReveal', defaultContent: {} },
        ],
      },
      {
        id: 'apology',
        name: 'Sincere Reflection',
        description: 'Soft, minimalist layout focused on words and shared memories.',
        sections: [
          { type: 'HeroSection', defaultContent: { title: 'From the Heart' } },
          { type: 'ShayariSection', defaultContent: {} },
          { type: 'PopupNotes', defaultContent: {} },
          { type: 'TimelineSection', defaultContent: {} },
        ],
      },
      {
        id: 'confession',
        name: 'The Secret Note',
        description: 'Intimate, ethereal layout for deep emotional confessions.',
        sections: [
          { type: 'HeroSection', defaultContent: { title: 'A Secret to Tell' } },
          { type: 'PopupNotes', defaultContent: {} },
          { type: 'ShayariSection', defaultContent: {} },
          { type: 'MusicPlayer', defaultContent: {} },
          { type: 'EndingReveal', defaultContent: {} },
        ],
      },
      {
        id: 'anniversary',
        name: 'Our Journey',
        description: 'Chronological storytelling focused on growth and shared history.',
        sections: [
          { type: 'HeroSection', defaultContent: { title: 'Happy Anniversary' } },
          { type: 'TimelineSection', defaultContent: {} },
          { type: 'GallerySection', defaultContent: {} },
          { type: 'MusicPlayer', defaultContent: {} },
        ],
      },
      {
        id: 'proposal',
        name: 'The Forever Moment',
        description: 'Dramatic, cinematic layout leading to a life-changing question.',
        sections: [
          { type: 'HeroSection', defaultContent: { title: 'A New Beginning' } },
          { type: 'TimelineSection', defaultContent: {} },
          { type: 'GallerySection', defaultContent: {} },
          { type: 'EndingReveal', defaultContent: { triggerLabel: 'Will You?' } },
        ],
      },
      {
        id: 'friendship',
        name: 'Partners in Crime',
        description: 'Fun, energetic layout celebrating shared chaos and joy.',
        sections: [
          { type: 'HeroSection', defaultContent: { title: 'Best Friends Forever' } },
          { type: 'GallerySection', defaultContent: {} },
          { type: 'PopupNotes', defaultContent: {} },
          { type: 'ShayariSection', defaultContent: { author: 'Your Bestie' } },
        ],
      },
    ];
  }
}
