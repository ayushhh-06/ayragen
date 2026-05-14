'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, SkipForward, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useGenerationStore } from '@/database/state/useGenerationStore';

interface Soundtrack {
  id: string;
  name: string;
  artist: string;
  url: string;
  mood: string;
}

const SOUNDTRACKS: Soundtrack[] = [
  { id: '1', name: 'Stardust Dreams', artist: 'AuraGen Ambient', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', mood: 'Dreamy' },
  { id: '2', name: 'Eternal Bond', artist: 'Cinematic Soul', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', mood: 'Romantic' },
  { id: '3', name: 'Nostalgic Echo', artist: 'Memory Lane', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', mood: 'Nostalgic' },
];

export const MusicPlayer = ({ autoPlay = false }: { autoPlay?: boolean }) => {
  const { manifest } = useGenerationStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(SOUNDTRACKS[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (manifest?.soundtrack) {
      setCurrentTrack(manifest.soundtrack as any);
    }
  }, [manifest?.soundtrack]);

  useEffect(() => {
    if ((autoPlay || manifest?.soundtrack) && audioRef.current) {
      audioRef.current.play().catch(() => {
        console.warn('Autoplay blocked by browser. User interaction required.');
      });
    }
  }, [autoPlay, manifest?.soundtrack, currentTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const nextIdx = (SOUNDTRACKS.findIndex(t => t.id === currentTrack.id) + 1) % SOUNDTRACKS.length;
    setCurrentTrack(SOUNDTRACKS[nextIdx]);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[500]">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="flex items-center gap-4 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full pl-6 pr-3 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Track Info */}
            <div className="flex items-center gap-4 border-r border-white/10 pr-6">
              <div className="relative group">
                 <div className={`w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    <Music className="text-primary" size={16} />
                 </div>
                 {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center gap-0.5">
                       {[0.4, 0.7, 0.3, 0.8].map((h, i) => (
                         <motion.div 
                           key={i}
                           animate={{ height: ['20%', '60%', '20%'] }}
                           transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                           className="w-0.5 bg-primary rounded-full"
                         />
                       ))}
                    </div>
                 )}
              </div>
              <div className="flex flex-col min-w-[120px]">
                 <span className="text-[10px] font-black text-white uppercase tracking-wider truncate">{currentTrack.name}</span>
                 <span className="text-[9px] text-white/30 font-medium tracking-widest uppercase">{currentTrack.artist}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
              >
                {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-1" />}
              </button>
              <button 
                onClick={nextTrack}
                className="p-2.5 text-white/30 hover:text-white transition-all"
              >
                <SkipForward size={16} />
              </button>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 text-white/30 hover:text-white transition-all"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* AI Mood Insight */}
            <div className="absolute -top-12 right-0 px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-2xl flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
               <Sparkles size={10} className="text-primary animate-pulse" />
               <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">
                 Atmosphere: {currentTrack.mood || manifest?.emotionalTone?.vibe || 'Cinematic'}
               </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef}
        src={currentTrack.url}
        muted={isMuted}
        onEnded={nextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};
