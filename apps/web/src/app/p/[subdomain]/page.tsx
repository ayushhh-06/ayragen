import React from 'react';
import { Metadata } from 'next';
import { PublicWebsiteView } from './PublicWebsiteView';

export async function generateMetadata({ params }: { params: { subdomain: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/websites/public/${params.subdomain}`, {
      next: { revalidate: 60 } // Cache for 1 minute
    });
    const data = await res.json();
    
    if (!data || !data.manifest) throw new Error('Not found');
    
    const manifest = data.manifest;

    return {
      title: `${manifest.title} | AyraGen Cinematic Universe`,
      description: manifest.metadata?.description || `Explore this cinematic digital world built with AyraGen AI.`,
      openGraph: {
        title: manifest.title,
        description: manifest.metadata?.description,
        images: [`${process.env.NEXT_PUBLIC_API_URL}/websites/${data.id}/og`],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: manifest.title,
        description: manifest.metadata?.description,
        images: [`${process.env.NEXT_PUBLIC_API_URL}/websites/${data.id}/og`],
      },
    };
  } catch (err) {
    return {
      title: 'AyraGen Universe',
      description: 'A cinematic digital experience powered by AyraGen AI.',
    };
  }
}

export default function PublicWebsitePage({ params }: { params: { subdomain: string } }) {
  return <PublicWebsiteView subdomain={params.subdomain} />;
}
