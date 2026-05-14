'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WebsiteManifest } from '@ayragen/schema';
import { apiClient } from '@/lib/api-client';
import { Renderer } from '@/frontend/interface/canvas/Renderer';
import { MusicPlayer } from '@/frontend/experience/cinematic/MusicPlayer';
import { 
  Play, Pause, SkipForward, Maximize2, Minimize2, 
  Sparkles, Loader2, Volume2, ArrowLeft, Clapperboard
} from 'lucide-react';

export default function PresentationPage({ params }: { params: { id: string } }) {
  const [manifest, setManifest] = useState<WebsiteManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchManifest = async () => {
      try {
        const { data } = await apiClient.get(`/websites/${params.id}`);
        setManifest(data.manifest);
      } catch (err) {
        console.error('Failed to fetch universe for presentation', err);
      } finally {
        setLoading(false);
      }
    };
    fetchManifest();
  }, [params.id]);

  // Autoplay Logic: Paced like a film, not an app
  useEffect(() => {
    if (isAutoplay && manifest) {
      const currentSection = manifest.sections[currentSectionIdx];
      
      // Determine pacing based on emotional weight
      const pacingMap: Record<string, number> = {
        'hero': 10000,      // 10s for the reveal
        'gallery': 15000,   // 15s to absorb memories
        'text-block': 12000, // 12s to read emotions
        'footer': 8000      // 8s for the silent exit
      };

      const duration = pacingMap[currentSection.type] || 10000;

      const interval = setTimeout(() => {
        setCurrentSectionIdx((prev) => (prev + 1) % manifest.sections.length);
      }, duration);
      
      return () => clearTimeout(interval);
    }
  }, [isAutoplay, manifest, currentSectionIdx]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
         <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
         <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Initializing Premiere</span>
      </div>
    );
  }

  if (!manifest) return null;

  return (
    <div className="h-screen w-full bg-black overflow-hidden relative cursor-none group">
      {/* Invisible Interface: Cinematic Overscan */}
      <div className="fixed inset-0 pointer-events-none z-[1000] border-[60px] border-black transition-all duration-[2000ms] group-hover:border-[40px]" />
      <div className="fixed inset-0 pointer-events-none z-[500] bg-[url('/grain.png')] opacity-[0.03] mix-blend-overlay" />
      
      {/* The Soul Canvas */}
      <div ref={containerRef} className="h-full w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSectionIdx}
            initial={{ opacity: 0, filter: 'blur(15px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(30px)' }}
            transition={{ duration: 3, ease: "var(--ease-film)" }}
            className="h-full w-full"
          >
             <Renderer manifest={{ ...manifest, sections: [manifest.sections[currentSectionIdx]] }} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Invisible Controls: Only show on deliberate mouse move */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[1000] opacity-0 group-hover:opacity-100 transition-all duration-[1500ms] ease-aura flex items-center gap-8 px-10 py-5 bg-black/20 backdrop-blur-3xl border border-white/5 rounded-full cursor-auto">
         <button 
           onClick={() => window.history.back()}
           className="p-2 text-white/30 hover:text-white transition-all"
         >
            <ArrowLeft size={18} />
         </button>
         <div className="h-4 w-px bg-white/10 mx-2" />
         
         <div className="flex flex-col min-w-[150px]">
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-1 flex items-center gap-2">
               <Clapperboard size={10} />
               Now Playing
            </span>
            <span className="text-xs font-bold text-white truncate capitalize">{manifest.sections[currentSectionIdx].type.replace('-', ' ')}</span>
         </div>

         <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
            >
               {isAutoplay ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" className="ml-1" />}
            </button>
            <button 
              onClick={() => setCurrentSectionIdx((prev) => (prev + 1) % manifest.sections.length)}
              className="p-3 text-white/30 hover:text-white transition-all"
            >
               <SkipForward size={18} />
            </button>
         </div>

         <div className="h-4 w-px bg-white/10 mx-2" />
         
         <div className="flex items-center gap-3">
            <div className="flex gap-1">
               {manifest.sections.map((_, i) => (
                 <div 
                   key={i} 
                   className={`h-1 rounded-full transition-all duration-500 ${i === currentSectionIdx ? 'w-8 bg-primary shadow-[0_0_10px_rgba(192,132,252,0.8)]' : 'w-1 bg-white/10'}`} 
                 />
               ))}
            </div>
         </div>
      </div>

      {/* Emotional Soundtrack Integration */}
      <MusicPlayer autoPlay />

      {/* Cinematic Metadata Overlay */}
      <div className="fixed top-12 left-12 z-[1000] flex flex-col opacity-20">
         <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-1">AyraGen Premiere</span>
         <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">{manifest.id} // SCALE: 2.0.0</span>
      </div>
    </div>
  );
}
