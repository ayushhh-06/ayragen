'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X, Globe, Copy, Check, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export const PublishModal = ({ isOpen, onClose, websiteId, currentSubdomain }: { 
  isOpen: boolean, 
  onClose: () => void, 
  websiteId: string,
  currentSubdomain?: string 
}) => {
  const [subdomain, setSubdomain] = useState(currentSubdomain || '');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePublish = async () => {
    if (!subdomain) return;
    setIsPublishing(true);
    setError(null);
    try {
      await apiClient.post(`/websites/${websiteId}/publish`, { subdomain });
      const url = `${window.location.origin}/p/${subdomain}`;
      setPublishedUrl(url);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to publish universe.');
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = () => {
    if (publishedUrl) {
      navigator.clipboard.writeText(publishedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
          >
            <div className="p-8 border-b border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 text-primary">
                  <Rocket size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Deployment Studio</span>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all">
                  <X size={20} className="text-white/20" />
                </button>
              </div>

              {!publishedUrl ? (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Launch your Universe</h2>
                    <p className="text-sm text-white/40 leading-relaxed italic">Choose a unique subdomain to make your cinematic experience live for the world.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                         <Globe size={18} />
                      </div>
                      <input 
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        placeholder="your-universe-name"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-32 text-white font-medium focus:border-primary/50 transition-all outline-none"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        .auragen.app
                      </div>
                    </div>
                    {error && <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest px-2 italic">{error}</p>}
                  </div>

                  <button
                    onClick={handlePublish}
                    disabled={!subdomain || isPublishing}
                    className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
                  >
                    {isPublishing ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Igniting Neural Links...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Go Live Now
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-8 text-center py-4">
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="text-emerald-500" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Universe is Live!</h2>
                    <p className="text-sm text-white/40 leading-relaxed italic">Your cinematic masterpiece is now pulsing through the digital void.</p>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 bg-white/[0.03] border border-white/5 rounded-2xl">
                    <div className="flex-1 px-4 text-sm text-white/60 truncate font-mono">{publishedUrl}</div>
                    <button 
                      onClick={copyToClipboard}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                    >
                      {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-white/40" />}
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={onClose}
                      className="flex-1 py-4 bg-white/5 text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/10 transition-all"
                    >
                      Close Studio
                    </button>
                    <a 
                      href={publishedUrl} 
                      target="_blank" 
                      className="flex-1 py-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
                    >
                      Open Site
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
