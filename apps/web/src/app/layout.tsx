import React from 'react';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AyraGen | Cinematic Storytelling Engine',
  description: 'Turn your memories into emotionally immersive cinematic universes.',
};

import { GlobalAtmosphere } from '@/frontend/interface/canvas/GlobalAtmosphere';
import { CinematicCursor } from '@/frontend/interface/canvas/CinematicCursor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white selection:bg-purple-500/30">
        <GlobalAtmosphere />
        <CinematicCursor />
        {children}
      </body>
    </html>
  );
}
