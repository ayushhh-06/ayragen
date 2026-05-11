import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding AuraGen Database...');

  // 1. Create Default Themes
  const themes = [
    {
      name: 'Cinematic Noir',
      config: JSON.stringify({
        colors: { primary: '#E50914', background: '#080808', text: '#FFFFFF' },
        typography: { heading: 'Playfair Display', body: 'Inter' },
        effects: { glow: true, glassmorphism: true }
      })
    },
    {
      name: 'Ethereal Pastels',
      config: JSON.stringify({
        colors: { primary: '#FFD1DC', background: '#FAFAFA', text: '#2C3E50' },
        typography: { heading: 'Quicksand', body: 'Lora' },
        effects: { glow: false, glassmorphism: true }
      })
    }
  ];

  for (const theme of themes) {
    await prisma.theme.upsert({
      where: { id: theme.name.toLowerCase().replace(/ /g, '-') },
      update: {},
      create: {
        id: theme.name.toLowerCase().replace(/ /g, '-') ,
        ...theme
      }
    });
  }

  // 2. Create Default Templates
  const templates = [
    {
      name: 'Cinematic Reveal',
      description: 'A grand emotional reveal with slow-build animations.',
      baseConfig: JSON.stringify({
        sections: ['HeroSection', 'GallerySection', 'EndingReveal']
      })
    }
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: template.name.toLowerCase().replace(/ /g, '-') },
      update: {},
      create: {
        id: template.name.toLowerCase().replace(/ /g, '-') ,
        ...template
      }
    });
  }

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
