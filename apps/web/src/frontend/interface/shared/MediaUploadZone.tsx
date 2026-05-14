'use client';

import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, Video, X, Music, Mic } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface MediaUploadZoneProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

export const MediaUploadZone: React.FC<MediaUploadZoneProps> = ({ onFilesChange, maxFiles = 10 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const totalFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(totalFiles);
      onFilesChange(totalFiles);
    }
  }, [files, maxFiles, onFilesChange]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(totalFiles);
      onFilesChange(totalFiles);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange(updated);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
    if (type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    return <ImageIcon className="w-4 h-4" />;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="label text-white/50">Media & Assets</span>
        <span className="text-xs text-white/30">{files.length} / {maxFiles}</span>
      </div>

      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging ? 'rgba(192, 132, 252, 0.8)' : 'rgba(255, 255, 255, 0.1)',
          backgroundColor: isDragging ? 'rgba(192, 132, 252, 0.05)' : 'rgba(255, 255, 255, 0.02)',
        }}
        className="relative flex flex-col items-center justify-center p-8 border border-dashed rounded-[2rem] transition-colors overflow-hidden group cursor-pointer"
        onClick={() => document.getElementById('media-upload')?.click()}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        <motion.div
          animate={{ scale: isDragging ? 1.1 : 1, y: isDragging ? -5 : 0 }}
          className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:border-primary/30 transition-colors"
        >
          <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-white/40'} group-hover:text-primary transition-colors`} />
        </motion.div>
        
        <p className="font-display text-xl text-white mb-2">Drop your memories here</p>
        <p className="text-white/40 text-sm font-light">Photos, videos, music, or voice notes.</p>
        
        <input 
          id="media-upload"
          type="file" 
          multiple 
          accept="image/*,video/*,audio/*"
          className="hidden" 
          onChange={handleFileInput}
        />
      </motion.div>

      {/* Gallery Preview */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-4"
          >
            {files.map((file, i) => (
              <motion.div
                key={`${file.name}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10 bg-black/40"
              >
                {file.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/30">
                    {getFileIcon(file.type)}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/80 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
