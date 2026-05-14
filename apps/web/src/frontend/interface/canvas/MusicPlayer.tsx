'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause, Play, Volume2 } from 'lucide-react';
import { Section } from '@auragen/schema';

export const MusicPlayer = ({ section }: { section: Section }) => {
  const { url, title, artist } = section.content;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // PRODUCTION FIX: Memory Leak Prevention
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.load();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 glass p-4 rounded-2xl flex items-center gap-4 z-50 shadow-2xl"
    >
      <div className="bg-primary/20 p-3 rounded-xl text-primary">
        <Music size={24} className={isPlaying ? "animate-pulse" : ""} />
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm font-bold truncate max-w-[150px]">{title || 'Background Music'}</span>
        <span className="text-xs opacity-60">{artist || 'AuraGen AI'}</span>
      </div>

      <button
        onClick={togglePlay}
        className="bg-primary text-white p-2 rounded-full hover:scale-110 transition-transform"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      <audio ref={audioRef} src={url} loop />
    </motion.div>
  );
};
