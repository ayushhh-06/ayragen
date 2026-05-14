'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, ArrowLeft, Loader2, Camera, Palette, Music, Globe, Database, BrainCircuit } from 'lucide-react';
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

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [prompt]);

  // Navigate when done
  useEffect(() => {
    if (status === 'complete' && manifest?.id) {
      const timer = setTimeout(() => {
        router.push(`/editor/${manifest.id}`);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [status, manifest, router]);

  return (
    <main className="relative min-h-screen bg-[#030105] flex flex-col font-sans text-white overflow-hidden selection:bg-pink-500/30">
      
      {/* Immersive Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: status === 'processing' ? [1, 1.2, 1] : 1,
            opacity: status === 'processing' ? [0.3, 0.6, 0.3] : 0.3 
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-pink-600/20 blur-[150px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ 
            scale: status === 'processing' ? [1, 1.5, 1] : 1,
            opacity: status === 'processing' ? [0.2, 0.5, 0.2] : 0.2 
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-purple-600/20 blur-[150px] mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030105] opacity-90" />
      </div>

      {/* Header */}
      <header className="relative z-50 w-full p-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Studio</span>
        </Link>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="font-display font-bold tracking-tight text-lg">AuraGen <span className="text-white/20 italic font-light">AI</span></span>
        </div>
      </header>

      {/* Central Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* INPUT STATE */}
          {status !== 'processing' && status !== 'complete' && (
            <motion.div 
              key="input-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center max-w-2xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-4 text-center leading-[1.1] tracking-tight">
                Design with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">Pure Imagination.</span>
              </h1>
              <p className="text-white/40 mb-12 text-center max-w-md font-light leading-relaxed">
                Describe your story, brand, or emotion. Our AI will architect a unique cinematic universe in seconds.
              </p>

              {/* Magical Input Box */}
              <div className="w-full relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-[32px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative bg-[#0A0512]/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-2 shadow-2xl flex flex-col transition-all duration-500 focus-within:border-pink-500/40 focus-within:bg-[#0F071A]">
                  
                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision... (e.g. A midnight garden theme for a poetry portfolio with starlit particles)"
                    className="w-full bg-transparent border-none outline-none resize-none p-6 min-h-[120px] text-lg text-white placeholder:text-white/10 font-light leading-relaxed scrollbar-none"
                    rows={1}
                  />
                  
                  <div className="flex justify-between items-center px-4 pb-4 pt-2">
                    {/* Mood Selector */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {MOODS.map((mood) => (
                        <button
                          key={mood.id}
                          onClick={() => setSelectedMood(mood.id)}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                            selectedMood === mood.id 
                              ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
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
                      className="ml-4 shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white hover:scale-110 transition-all disabled:opacity-30 disabled:grayscale disabled:hover:scale-100 shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                    >
                      <Wand2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 px-5 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[13px] text-center font-medium">
                  {error}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* GENERATION STATE - REALTIME MAGIC */}
          {(status === 'processing' || status === 'complete') && (
            <motion.div 
              key="generation-state"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Side: Status & Thinking */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative w-32 h-32 mb-10">
                   {/* Glowing Core */}
                   <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-pink-500/20 border-t-pink-500/60 shadow-[0_0_60px_rgba(236,72,153,0.2)]"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }} 
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border border-purple-500/10 border-b-purple-500/40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BrainCircuit className="w-10 h-10 text-white animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                   <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
                    {status === 'complete' ? 'Generation Finalized.' : currentStep}
                  </h2>
                  <p className="text-white/30 text-sm font-light max-w-sm tracking-wide">
                    {status === 'complete' 
                      ? 'The cinematic manifest is ready. Transitioning to Creative Editor...' 
                      : 'Our neural engines are weaving your prompt into a production-grade digital experience.'}
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="w-full max-w-xs space-y-6">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    <span>Engine Integrity</span>
                    <span>{status === 'complete' ? '100%' : 'Active'}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                      initial={{ width: "0%" }}
                      animate={{ width: status === 'complete' ? "100%" : "85%" }}
                      transition={{ duration: status === 'complete' ? 0.8 : 30, ease: "easeOut" }}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1,2,3,4].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                        className="h-1 bg-white/10 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Realtime Code Stream (The "Magic" Visual) */}
              <div className="relative group perspective-[1000px] hidden lg:block">
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-[40px] blur-3xl opacity-50" />
                <div className="relative bg-[#050208]/60 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 h-[500px] overflow-hidden flex flex-col shadow-2xl">
                   <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                     <Database className="w-3.5 h-3.5 text-white/20" />
                     <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Neural Data Stream</span>
                     <div className="ml-auto flex gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-red-500/20" />
                       <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                       <div className="w-2 h-2 rounded-full bg-green-500/20" />
                     </div>
                   </div>

                   <div className="flex-1 font-mono text-[11px] leading-relaxed overflow-hidden">
                      <AnimatePresence>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="space-y-4"
                        >
                          {manifest ? (
                             <pre className="text-purple-300/80">
                               {JSON.stringify(manifest, null, 2)}
                             </pre>
                          ) : (
                            <div className="space-y-3 opacity-40">
                              <div className="h-3 w-[80%] bg-white/10 rounded animate-pulse" />
                              <div className="h-3 w-[60%] bg-white/10 rounded animate-pulse" />
                              <div className="h-3 w-[90%] bg-white/10 rounded animate-pulse" />
                              <div className="h-3 w-[40%] bg-white/10 rounded animate-pulse" />
                              <div className="h-3 w-[70%] bg-white/10 rounded animate-pulse" />
                              <div className="h-3 w-[50%] bg-white/10 rounded animate-pulse" />
                              <div className="h-3 w-[85%] bg-white/10 rounded animate-pulse" />
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                   </div>

                   {/* Scanning Effect */}
                   <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none"
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
