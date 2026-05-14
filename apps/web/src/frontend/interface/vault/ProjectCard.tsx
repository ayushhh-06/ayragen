'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Edit3, Trash2, Globe } from 'lucide-react';

export const ProjectCard = ({ project }: { project: any }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors"
    >
      {/* Cinematic Preview Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
            <Edit3 size={20} />
          </button>
          <button className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform">
            <ExternalLink size={20} />
          </button>
        </div>
        <div className="p-6 h-full flex flex-col justify-end">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold border border-white/10 w-fit mb-2">
            <Globe size={10} className="text-primary" />
            {project.status || 'Published'}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-white/40 text-sm mt-1">{project.vibe} • Created {project.date}</p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-white/20">{project.views || 0} views</span>
          <button className="text-white/20 hover:text-red-400 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
