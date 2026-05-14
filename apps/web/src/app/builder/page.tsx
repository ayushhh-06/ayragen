'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, ArrowLeft, Loader2, Camera, Palette, Music, Globe, Database, BrainCircuit, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useGeneration } from '@/hooks/useGeneration';
import { useRouter } from 'next/navigation';

const MOODS = [
  { id: 'cinematic', label: 'Cinematic', icon: <Camera className="w-3 h-3" /> },
  { id: 'romantic', label: 'Romantic', icon: <Sparkles className="w-3 h-3" /> },
  { id: 'dark-premium', label: 'Dark Premium', icon: <Palette className="w-3 h-3" /> },
  { id: 'ethereal', label: 'Ethereal', icon: <Music className="w-3 h-3" /> },
];

export default function BuilderPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [selectedMood, setSelectedMood] = useState('cinematic');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { generate, status, currentStep, manifest, error } = useGeneration();

  const handleGenerate = () => {
    if (prompt.trim() && status !== 'processing') {
      const fullPrompt = `${prompt}. Mood: ${selectedMood}.`;
      generate(fullPrompt);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [prompt]);

  useEffect(() => {
    if (status === 'complete' && manifest?.id) {
      const timer = setTimeout(() => {
        router.push(`/editor/${manifest.id}`);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [status, manifest, router]);

  return (
    <main className="relative min-h-screen bg-[#020203] flex flex-col font-body text-white overflow-hidden selection:bg-purple-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Header */}
      <header className="relative z-50 w-full p-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Studio</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-display font-bold tracking-tight text-xl">AuraGen <span className="text-white/20 italic font-light">AI</span></span>
        </div>
      </header>

      {/* Central Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* INPUT STATE */}
          {status !== 'processing' && status !== 'complete' && (
            <motion.div 
              key="input-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-8">
                Neural Interface Active
              </div>

              <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 text-center leading-[1.05] tracking-tight">
                Design with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Pure Imagination.</span>
              </h1>
              
              <p className="text-white/40 mb-12 text-center max-w-md font-light text-lg">
                Describe your vision. Our AI will architect a unique cinematic universe in seconds.
              </p>

              {/* Input Box */}
              <div className="w-full relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-[40px] p-2 shadow-2xl flex flex-col transition-all duration-500 focus-within:border-purple-500/30 focus-within:bg-white/[0.04]">
                  
                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision... (e.g. A moonlit garden for a wedding portfolio with starlit particles)"
                    className="w-full bg-transparent border-none outline-none resize-none p-8 min-h-[140px] text-xl text-white placeholder:text-white/10 font-light leading-relaxed scrollbar-none"
                    rows={1}
                  />
                  
                  <div className="flex justify-between items-center px-6 pb-6 pt-2">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {MOODS.map((mood) => (
                        <button
                          key={mood.id}
                          onClick={() => setSelectedMood(mood.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                            selectedMood === mood.id 
                              ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                              : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white/70'
                          }`}
                        >
                          {mood.icon}
                          {mood.label}
                        </button>
                      ))}
                    </div>

                    <button 
                      onClick={handleGenerate}
                      disabled={!prompt.trim()}
                      className="ml-4 shrink-0 flex items-center justify-center w-16 h-16 rounded-[24px] bg-gradient-to-br from-purple-600 to-pink-600 text-white hover:scale-110 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                    >
                      <Wand2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center font-medium">
                  {error}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* GENERATION STATE */}
          {(status === 'processing' || status === 'complete') && (
            <motion.div 
              key="generation-state"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full grid lg:grid-cols-2 gap-20 items-center"
            >
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative w-32 h-32 mb-12">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-[40px] border border-purple-500/20 border-t-purple-500/60 shadow-[0_0_60px_rgba(168,85,247,0.2)]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BrainCircuit className="w-12 h-12 text-white animate-pulse" />
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
                    {status === 'complete' ? 'Generation Finalized.' : currentStep}
                  </h2>
                  <p className="text-white/30 text-lg font-light max-w-sm leading-relaxed">
                    {status === 'complete' 
                      ? 'The cinematic manifest is ready. Transitioning to Creative Editor...' 
                      : 'Our neural engines are weaving your prompt into a production-grade digital experience.'}
                  </p>
                </div>

                <div className="w-full max-w-sm space-y-8">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.3em] text-white/20">
                    <span>Neural Link Stability</span>
                    <span className="text-purple-400">{status === 'complete' ? '100%' : 'Optimizing'}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                      initial={{ width: "0%" }}
                      animate={{ width: status === 'complete' ? "100%" : "85%" }}
                      transition={{ duration: status === 'complete' ? 0.8 : 30, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              <div className="relative group hidden lg:block">
                <div className="absolute -inset-10 bg-purple-600/10 rounded-full blur-[100px] opacity-50" />
                <div className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[48px] p-10 h-[550px] overflow-hidden flex flex-col shadow-2xl">
                   <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                     <Terminal className="w-4 h-4 text-purple-400" />
                     <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.3em]">Neural Manifest Stream</span>
                   </div>

                   <div className="flex-1 font-mono text-[11px] leading-relaxed overflow-hidden scrollbar-none">
                      <AnimatePresence>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="space-y-4"
                        >
                          {manifest ? (
                             <pre className="text-purple-300/60">
                               {JSON.stringify(manifest, null, 2)}
                             </pre>
                          ) : (
                            <div className="space-y-4 opacity-20">
                              {[1,2,3,4,5,6,7,8,9,10].map(i => (
                                <div key={i} className="h-2.5 bg-white rounded-full" style={{ width: `${Math.random() * 60 + 30}%` }} />
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                   </div>

                   <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none"
                   />
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
