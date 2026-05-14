'use client';

import React, { useEffect, useState } from 'react';
import { WebsiteManifest } from '@ayragen/schema';
import { Renderer } from '@/frontend/interface/canvas/Renderer';
import { apiClient } from '@/lib/api-client';
import { Loader2, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicPlayer } from '@/frontend/experience/cinematic/MusicPlayer';
import Link from 'next/link';

export default function PublicWebsitePage({ params }: { params: { subdomain: string } }) {
  const [manifest, setManifest] = useState<WebsiteManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManifest = async () => {
      try {
        const { data } = await apiClient.get(`/websites/public/${params.subdomain}`);
        setManifest(data.manifest);
      } catch (err) {
        setError('Universe not found or is currently private.');
      } finally {
        setLoading(false);
      }
    };
    fetchManifest();
  }, [params.subdomain]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center text-center p-12">
         <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative"
         >
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-6 h-6 animate-pulse" />
         </motion.div>
         <h2 className="mt-8 text-xl font-black text-white uppercase tracking-[0.3em]">Igniting Universe</h2>
         <p className="mt-2 text-white/20 font-bold uppercase tracking-widest text-[10px]">Neural Render in Progress...</p>
      </div>
    );
  }

  if (error || !manifest) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center text-center p-12">
         <AlertCircle className="w-16 h-16 text-red-500/20 mb-6" />
         <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">404: Void Detected</h1>
         <p className="text-white/40 max-w-md italic mb-8">
           This cinematic experience either does not exist or has returned to the digital shadows.
         </p>
         <button 
           onClick={() => window.location.href = '/'}
           className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
         >
           Return to Reality
         </button>
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen selection:bg-primary/30 selection:text-white">
      {/* Cinematic Overlays for Published View */}
      <div className="fixed inset-0 pointer-events-none z-[1000] bg-[url('/grain.png')] opacity-[0.03] mix-blend-overlay" />
      <Renderer manifest={manifest} />
      
      {/* Subtle Branding & Growth CTA */}
      <div className="fixed bottom-8 inset-x-8 z-[100] flex justify-between items-end pointer-events-none">
         <div className="pointer-events-auto">
            <div className="flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full group cursor-pointer hover:border-primary/40 transition-all">
               <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-primary transition-all">Made with AyraGen AI</span>
               <Sparkles size={12} className="text-primary animate-pulse" />
            </div>
         </div>

         <div className="pointer-events-auto">
            <Link href="/onboarding" className="flex flex-col items-end group">
               <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 group-hover:text-primary transition-all">Create your own universe</span>
               <div className="px-6 py-3 bg-white text-black rounded-full font-black uppercase tracking-widest text-[9px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                  Ignite Now
                  <ArrowRight size={10} />
               </div>
            </Link>
         </div>
      </div>

      <MusicPlayer autoPlay />
    </main>
  );
}
