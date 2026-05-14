'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, FileJson, Code2, Layout, 
  FileArchive, Loader2, Sparkles, CheckCircle2,
  ChevronRight, Box, Terminal, ExternalLink,
  Clapperboard, PlayCircle, Film, Music
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export const ExportModal = ({ isOpen, onClose, websiteId }: { 
  isOpen: boolean, 
  onClose: () => void, 
  websiteId: string 
}) => {
  const [activeTab, setActiveTab] = useState<'source' | 'video'>('source');
  const [exportType, setExportType] = useState<'nextjs' | 'react' | 'static'>('nextjs');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [renderProgress, setRenderProgress] = useState(0);

  const handleSourceExport = async () => {
    setIsExporting(true);
    try {
      const { data } = await apiClient.post(`/websites/${websiteId}/export`, { type: exportType });
      setDownloadUrl(data.downloadUrl);
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleVideoExport = async () => {
    setIsExporting(true);
    setRenderProgress(10);
    try {
      // Phase 1: Warming up Engine
      const progressTimer = setInterval(() => {
        setRenderProgress(prev => (prev < 90 ? prev + 2 : prev));
      }, 500);

      const { data } = await apiClient.post(`/websites/${websiteId}/export-video`, {});
      
      clearInterval(progressTimer);
      setRenderProgress(100);
      setDownloadUrl(`http://localhost:3007/exports/${data}`); // Matches backend output
    } catch (err) {
      console.error('Video Export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,1)]"
          >
            <div className="flex h-[600px]">
              {/* Left Sidebar: Modes */}
              <div className="w-20 border-r border-white/5 flex flex-col items-center py-10 gap-8 bg-white/[0.01]">
                 <button 
                   onClick={() => { setActiveTab('source'); setDownloadUrl(null); }}
                   className={`p-4 rounded-2xl transition-all ${activeTab === 'source' ? 'bg-primary text-white' : 'text-white/20 hover:text-white'}`}
                 >
                    <Code2 size={20} />
                 </button>
                 <button 
                   onClick={() => { setActiveTab('video'); setDownloadUrl(null); }}
                   className={`p-4 rounded-2xl transition-all ${activeTab === 'video' ? 'bg-primary text-white shadow-[0_0_20px_rgba(192,132,252,0.4)]' : 'text-white/20 hover:text-white'}`}
                 >
                    <Clapperboard size={20} />
                 </button>
              </div>

              {/* Middle: Options */}
              <div className="w-[350px] p-10 border-r border-white/5 space-y-8 bg-white/[0.01]">
                {activeTab === 'source' ? (
                  <>
                    <div>
                      <div className="flex items-center gap-3 text-primary mb-2">
                         <Download size={18} />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em]">Package Engine</span>
                      </div>
                      <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Export Source</h2>
                    </div>
                    <div className="space-y-3">
                      {[
                        { id: 'nextjs', name: 'Next.js Project', icon: Layout, desc: 'Production App Router template' },
                        { id: 'react', name: 'React Components', icon: Code2, desc: 'Reusable Tailwind modules' },
                        { id: 'static', name: 'Static HTML/CSS', icon: FileArchive, desc: 'Pure code, no framework' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setExportType(type.id as any)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all group ${
                            exportType === type.id 
                            ? 'bg-primary/10 border-primary/40' 
                            : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${exportType === type.id ? 'bg-primary text-white' : 'bg-white/5 text-white/30'}`}>
                              <type.icon size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-white uppercase tracking-wider">{type.name}</p>
                              <p className="text-[10px] text-white/30 font-medium italic">{type.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex items-center gap-3 text-primary mb-2">
                         <Film size={18} />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cinematic Engine</span>
                      </div>
                      <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Generate Movie</h2>
                    </div>
                    <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
                       <div className="flex items-center gap-3 text-primary">
                          <Music size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">AI Mood Sync</span>
                       </div>
                       <p className="text-[10px] text-white/40 leading-relaxed font-medium italic">
                         "We'll render your vision into a 4K cinematic trailer with automated transitions and the AI-selected soundtrack."
                       </p>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-white/20">
                          <span>Resolution</span>
                          <span className="text-white/60">1080p Cinematic</span>
                       </div>
                       <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-white/20">
                          <span>Framerate</span>
                          <span className="text-white/60">30 FPS</span>
                       </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right: Summary & Action */}
              <div className="flex-1 p-10 flex flex-col justify-between">
                {!downloadUrl ? (
                  <>
                    <div className="space-y-8">
                      <div className="flex items-center gap-2 text-white/40 mb-4">
                         <ChevronRight size={14} />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Compiler Details</span>
                      </div>
                      
                      <div className="space-y-4">
                         {[
                           { label: 'Version', value: 'v2.0.0-platinum' },
                           { label: 'Mode', value: activeTab.toUpperCase() },
                           { label: 'Optimization', value: 'High-Fidelity' },
                           { label: 'Cloud Status', value: 'Ready' }
                         ].map(stat => (
                           <div key={stat.label} className="flex justify-between items-center text-[10px]">
                              <span className="font-bold uppercase tracking-widest text-white/20">{stat.label}</span>
                              <span className="font-mono text-white/60">{stat.value}</span>
                           </div>
                         ))}
                      </div>

                      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                         <div className="flex items-center gap-2 text-primary/60">
                            <Box size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Package Contents</span>
                         </div>
                         <p className="text-[10px] text-white/30 leading-relaxed font-medium">
                           {activeTab === 'source' 
                             ? 'Full component library, AI-generated copy, optimized Unsplash assets, and Cinematic Motion presets.'
                             : 'Cinematic MP4 file with background music, cross-fade transitions, and high-fidelity rendering.'}
                         </p>
                      </div>

                      {isExporting && activeTab === 'video' && (
                        <div className="space-y-3">
                           <div className="flex justify-between text-[9px] font-black text-primary uppercase tracking-[0.3em]">
                              <span>Rendering Universe</span>
                              <span>{Math.round(renderProgress)}%</span>
                           </div>
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${renderProgress}%` }}
                              />
                           </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={activeTab === 'source' ? handleSourceExport : handleVideoExport}
                      disabled={isExporting}
                      className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-3xl shadow-[0_30px_70px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isExporting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          {activeTab === 'source' ? 'Bundling Source...' : 'Encoding Cinematic...'}
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          {activeTab === 'source' ? 'Generate ZIP Package' : 'Generate Movie Trailer'}
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-10"
                  >
                    <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.2)]">
                       <CheckCircle2 size={48} className="text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Masterpiece Sealed</h3>
                      <p className="text-xs text-white/30 italic">Your cinematic {activeTab === 'source' ? 'source code' : 'movie'} is ready.</p>
                    </div>

                    <div className="w-full space-y-4">
                      <a 
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-6 bg-emerald-500 text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-3xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all"
                      >
                        <Download size={18} />
                        Download {activeTab === 'source' ? 'ZIP' : 'MP4'}
                      </a>
                      <button 
                        onClick={() => setDownloadUrl(null)}
                        className="w-full py-4 text-white/30 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        New Transformation
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Modal Bottom Bar */}
            <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between px-10">
               <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                     <Terminal size={10} />
                     <span>Engine: 4.0 Cinematic-Scale</span>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                     <PlayCircle size={10} />
                     <span>H.264 Optimized</span>
                  </div>
               </div>
               <button onClick={onClose} className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-[0.3em] transition-all">Dismiss</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
