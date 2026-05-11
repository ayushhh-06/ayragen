'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Upload, ArrowRight, X, Image as ImageIcon } from 'lucide-react';

interface GenerationFormProps {
  onGenerate: (prompt: string, assets: File[]) => void;
}

export const GenerationForm: React.FC<GenerationFormProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, files);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto px-6 relative z-10 -mt-20 pb-32"
    >
      <form onSubmit={handleSubmit} className="glass-card p-12 rounded-[40px] border border-white/10 space-y-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
        <div className="space-y-4">
          <label className="text-display uppercase tracking-[0.3em] text-[10px] text-white/40 block ml-2">
            The Narrative Seed
          </label>
          <div className="relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What story should we tell?"
              className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-xl md:text-2xl font-medium focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all min-h-[200px] placeholder:text-white/10 resize-none"
            />
            {/* Contextual Input Glow */}
            <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <ImageIcon size={18} />
            <span className="text-display">Add your memories</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((file, i) => (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-2 right-2 p-1 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 hover:border-primary/40 hover:bg-white/5 transition-all"
            >
              <Upload size={24} className="text-white/20" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Upload</span>
            </button>
          </div>
          <input
            type="file"
            multiple
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
          />
        </div>

        <motion.button
          disabled={!prompt.trim()}
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)' }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-8 rounded-[30px] bg-white text-black font-black text-2xl relative overflow-hidden group transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
        >
          {/* Cinematic Interior Glow */}
          <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl" />
          
          <div className="relative z-10 flex items-center justify-center gap-4">
            <span className="tracking-tighter">Generate Emotional Universe</span>
            <motion.div
              animate={{ 
                x: [0, 5, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRight size={28} />
            </motion.div>
          </div>

          {/* Luxury Bottom Border Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-[0_0_15px_var(--primary)]" />
        </motion.button>
      </form>
    </motion.div>
  );
};
