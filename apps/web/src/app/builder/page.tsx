'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Wand2, Globe } from 'lucide-react';

import { useGeneration } from '@/hooks/useGeneration';
import { AmbientBackground } from '@/components/shared/AmbientBackground';
import { FloatingParticles } from '@/components/shared/FloatingParticles';
import { GlowButton } from '@/components/shared/GlowButton';
import { RomanticLoader } from '@/components/shared/RomanticLoader';
import { Renderer } from '@/components/engine/Renderer';
import { MediaUploadZone } from '@/components/shared/MediaUploadZone';

const PROMPT_SUGGESTIONS = [
  "A dreamy anniversary website",
  "A cinematic apology page",
  "A romantic memory website",
  "An emotional birthday surprise"
];

const MOODS = ['Romantic', 'Melancholic', 'Cinematic', 'Dreamy', 'Euphoric'];
const AESTHETICS = ['Soft Minimal', 'Dark Love', 'Korean Aesthetic', 'Retro Film', 'Luxury Black'];

export default function BuilderPage() {
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedAesthetic, setSelectedAesthetic] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { generate, status, currentStep, manifest, error } = useGeneration();

  const handleGenerate = () => {
    if (prompt.trim() && status !== 'processing') {
      const fullPrompt = `${prompt}. Mood: ${selectedMood || 'Cinematic'}. Aesthetic: ${selectedAesthetic || 'Soft Minimal'}.`;
      generate(fullPrompt);
    }
  };

  return (
    <main className="relative min-h-screen bg-background overflow-hidden flex selection:bg-primary/30 selection:text-white">
      <AmbientBackground />
      <FloatingParticles count={30} />
      <div className="noise" />

      {/* Left Panel - Prompt & Emotion Input */}
      <section className="relative z-20 w-full lg:w-[45%] h-screen flex flex-col border-r border-white/5 bg-black/40 backdrop-blur-2xl p-8 lg:p-12 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {/* Header */}
        <header className="flex items-center justify-between mb-16 flex-shrink-0">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-label text-xs uppercase tracking-[0.2em]">Return</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">AuraGen v3.0</span>
          </div>
        </header>

        {/* Builder Content */}
        <div className="flex-1 flex flex-col max-w-xl mx-auto w-full pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="font-display text-4xl lg:text-5xl font-black mb-4">What feeling are we capturing?</h1>
            <p className="text-white/40 text-lg mb-10 font-light">
              Describe the emotion, the memory, or the story. Our intelligence engine will weave the cinematic universe.
            </p>

            {/* Glowing Textarea */}
            <div className={`relative transition-all duration-700 mb-10 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
              <div className={`absolute -inset-1 bg-gradient-to-r from-primary via-indigo to-rose rounded-3xl blur-xl opacity-0 transition-opacity duration-700 ${isFocused ? 'opacity-30' : 'opacity-0'}`} />
              
              <div className="relative glass-strong rounded-[2rem] overflow-hidden flex flex-col group">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Tell me a story..."
                  className="w-full bg-transparent text-xl font-medium text-white placeholder:text-white/20 p-8 min-h-[200px] resize-none outline-none"
                />
              </div>
            </div>

            {/* Parameter Selectors */}
            <div className="space-y-8 mb-10">
              {/* Mood Selection */}
              <div>
                <span className="label mb-3 block text-white/50">Emotional Tone</span>
                <div className="flex flex-wrap gap-2">
                  {MOODS.map(mood => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood === selectedMood ? null : mood)}
                      className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${selectedMood === mood ? 'border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(192,132,252,0.3)]' : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aesthetic Selection */}
              <div>
                <span className="label mb-3 block text-white/50">Cinematic Aesthetic</span>
                <div className="flex flex-wrap gap-2">
                  {AESTHETICS.map(aes => (
                    <button
                      key={aes}
                      onClick={() => setSelectedAesthetic(aes === selectedAesthetic ? null : aes)}
                      className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${selectedAesthetic === aes ? 'border-rose bg-rose/20 text-white shadow-[0_0_15px_rgba(249,168,212,0.3)]' : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
                    >
                      {aes}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="mb-10">
              <MediaUploadZone onFilesChange={setFiles} />
            </div>

            {/* Generate Action */}
            <div className="flex flex-col gap-4">
              <GlowButton 
                variant="primary" 
                size="lg" 
                className="w-full rounded-2xl py-5 text-lg shadow-[0_0_40px_rgba(192,132,252,0.4)]" 
                onClick={handleGenerate}
                disabled={!prompt.trim() || status === 'processing'}
              >
                Generate Universe
                <Wand2 className="w-5 h-5 ml-2" />
              </GlowButton>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {PROMPT_SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(sug)}
                    className="text-xs text-white/30 hover:text-white/70 transition-colors"
                  >
                    "{sug}"
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Right Panel - Live Preview */}
      <section className="relative z-10 hidden lg:flex flex-1 h-screen flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-rose/5" />
        
        <div className="flex-1 flex items-center justify-center p-12">
          <AnimatePresence mode="wait">
            
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 rounded-full border-t border-primary/30 animate-spin" style={{ animationDuration: '4s' }} />
                  <Sparkles className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="font-display text-2xl text-white/40 mb-2">Awaiting your narrative</h3>
                <p className="text-white/20 text-sm max-w-sm mx-auto">The canvas is blank. The atmosphere is quiet. Let's create something beautiful.</p>
              </motion.div>
            )}

            {status === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: 'blur(20px)' }}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                <RomanticLoader step={currentStep} />
              </motion.div>
            )}

            {status === 'complete' && manifest && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full glass-card rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(192,132,252,0.15)] relative group"
              >
                {/* Live Output Container */}
                <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-black custom-scrollbar">
                  <Renderer manifest={manifest} />
                </div>
                
                {/* Floating Preview Toolbar */}
                <div className="absolute top-6 right-6 z-50 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/editor/${manifest.id || 'demo'}`}>
                    <GlowButton variant="glass" size="sm">
                      Open in Visual Editor
                    </GlowButton>
                  </Link>
                  <GlowButton variant="primary" size="sm">
                    <Globe className="w-4 h-4 mr-2" /> Publish Live
                  </GlowButton>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
      
      {/* Mobile Live Preview Fullscreen Overlay */}
      <AnimatePresence>
        {(status === 'processing' || status === 'complete') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-background overflow-hidden"
          >
            {status === 'processing' ? (
              <RomanticLoader step={currentStep} />
            ) : (
              <div className="w-full h-full relative">
                <div className="absolute top-4 left-4 z-50">
                  <GlowButton variant="glass" size="sm" onClick={() => generate('')}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </GlowButton>
                </div>
                {manifest && <Renderer manifest={manifest} />}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
