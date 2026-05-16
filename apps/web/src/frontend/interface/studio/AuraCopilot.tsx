'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Command, X, MessageSquare, Zap, Minimize2, Maximize2, Clapperboard } from 'lucide-react';

export const AuraCopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const { manifest, setManifest } = useGenerationStore();

  const handleSendMessage = async () => {
    if (!prompt.trim() || !manifest) return;
    
    setLoading(true);
    try {
      const response = await apiClient.post(`/websites/${manifest.id}/ai-edit`, {
        instruction: prompt
      });
      
      // Update local state with AI changes
      setManifest(response.data.manifest);
      setPrompt('');
    } catch (err) {
      console.error('AI Edit failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '80px' : 'auto',
              width: isMinimized ? '300px' : '500px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                   <Sparkles className={`text-primary w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </div>
                <div>
                   <h3 className="text-xs font-black text-white uppercase tracking-widest">AyraGen AI</h3>
                   {!isMinimized && <p className="text-[10px] text-white/30 font-bold uppercase tracking-tighter italic">{loading ? 'Synthesizing Vision...' : 'Neural Architecture Active'}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-white/30 hover:text-white transition-all"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-white/30 hover:text-white transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            {!isMinimized && (
              <div className="p-6 h-[300px] overflow-y-auto custom-scrollbar space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                    <Zap className="text-primary/50 w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 max-w-[80%]">
                    <p className="text-sm text-white/70 leading-relaxed italic">
                      "I've analyzed your cinematic vision. How would you like to evolve this universe? I can change the entire atmosphere, rewrite sections for deeper emotion, or add new structural elements."
                    </p>
                  </div>
                </div>
                {loading && (
                   <div className="flex gap-4 justify-end">
                      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 max-w-[80%]">
                         <p className="text-sm text-primary/80 animate-pulse font-bold italic italic">Refining Manifest...</p>
                      </div>
                   </div>
                )}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-4 bg-white/[0.02]">
              <div className="relative">
                <input 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask AI to redesign, rewrite, or expand..."
                  className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-3.5 pl-5 pr-12 text-sm text-white placeholder:text-white/20 outline-none focus:border-primary/50 transition-all"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary text-white shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                   {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
              {!isMinimized && (
                <div className="mt-3 flex items-center justify-center gap-4">
                   <div className="flex items-center gap-1.5 text-[10px] text-white/20 font-bold uppercase tracking-widest">
                     <Command size={10} />
                     <span>Enter to Send</span>
                   </div>
                   <div className="w-1 h-1 rounded-full bg-white/10" />
                   <div className="flex items-center gap-1.5 text-[10px] text-white/20 font-bold uppercase tracking-widest text-primary/40">
                     <MessageSquare size={10} />
                     <span>Explain Section</span>
                   </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 px-6 py-4 bg-primary rounded-full text-white shadow-[0_20px_50px_rgba(192,132,252,0.4)] hover:shadow-[0_20px_60px_rgba(192,132,252,0.6)] hover:scale-105 transition-all active:scale-95"
          >
            <Sparkles size={20} className="group-hover:rotate-12 transition-all" />
            <span className="text-sm font-black uppercase tracking-[0.2em]">Open Copilot</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
