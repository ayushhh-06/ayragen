'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Wand2, Command } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const PromptBar = ({ onGenerate }: { onGenerate: (prompt: string) => void }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl group focus-within:border-red-500/50 transition-all"
      >
        <div className="flex-1 relative flex items-center">
          <Wand2 className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-red-500 transition-colors" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your vision (e.g. 'A cinematic noir portfolio for a street photographer')..."
            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/20 py-4 pl-12 pr-4 text-lg"
          />
        </div>

        <div className="flex items-center gap-2 pr-2">
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/40 font-mono">
            <Command className="w-3 h-3" />
            <span>ENTER</span>
          </div>
          <Button 
            type="submit" 
            variant="premium" 
            size="icon" 
            className="rounded-xl"
            disabled={!prompt.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
      
      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {['SaaS Platform', 'Personal Portfolio', 'Photography Gallery'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setPrompt(suggestion)}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/40 hover:bg-white/10 hover:text-white/60 transition-all"
          >
            + {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
