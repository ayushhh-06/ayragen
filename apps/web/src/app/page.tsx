'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Layers, Cpu, Command, Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

// --- Components ---

/**
 * ParticleField: High-performance canvas-based floating particles.
 */
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 132, 252, ${p.opacity})`; // primary color
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    createParticles();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1] opacity-40" />;
};

/**
 * MeshGradients: Large blurred moving blobs for cinematic depth.
 */
const MeshGradients = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -50, 80, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[120px]"
    />
    <motion.div
      animate={{
        x: [0, -80, 40, 0],
        y: [0, 100, -30, 0],
        scale: [1, 0.8, 1.1, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[100px]"
    />
  </div>
);

/**
 * Navbar: Minimalist glassmorphism navigation.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-black/40 backdrop-blur-xl border border-white/5 rounded-full py-3 px-8' : ''}`}>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-indigo flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Command className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tighter font-display">AuraGen</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
          <Link href="#features" className="hover:text-white transition-colors">Technology</Link>
          <Link href="#showcase" className="hover:text-white transition-colors">Showcase</Link>
          <Link href="#about" className="hover:text-white transition-colors">Intelligence</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-white/60 hover:text-white transition-colors">Sign In</button>
          <Link href="/builder">
            <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all active:scale-95 flex items-center gap-2 group">
              Launch Engine
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// --- Main Page Component ---

export default function AuraGenHome() {
  const { scrollYProgress } = useScroll();


  return (
    <main className="relative min-h-screen bg-[#040408] text-white selection:bg-primary/30 overflow-x-hidden">
      <div className="noise" />
      <ParticleField />
      <MeshGradients />
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">Intelligence v3.2 Now Live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3rem,10vw,7.5rem)] font-bold leading-[0.85] tracking-tighter mb-10"
          >
            Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-rose-400 italic">Masterpieces</span><br />
            from pure thought.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 font-light leading-relaxed mb-12"
          >
            AuraGen transforms your abstract emotional prompts into cinematic, 
            high-fidelity web experiences. No builders. No limits. Just vision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/builder">
              <button className="group relative px-8 py-4 rounded-full bg-primary text-black font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(192,132,252,0.4)]">
                <span className="relative z-10 flex items-center gap-2">
                  Start Creating
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
          {/* Supporting copy – smaller, lower opacity */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-lg md:text-xl text-white/40 font-light leading-relaxed"
          >
            Turn feelings into immersive, production‑ready websites – no templates, no code.
          </motion.p>

          {/* CTA Buttons – premium glass‑morphic style */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5 items-center">
            <Link href="/builder">
              <GlowButton variant="primary" size="lg" className="group px-10 py-4">
                Create Your Memory
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </GlowButton>
            </Link>
            <GlowButton variant="ghost" size="lg" className="px-8 py-4">
              Watch Demo
            </GlowButton>
          </motion.div>
        </motion.div>

        {/* Scroll down indicator – subtle pulsing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="label">Discover</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Feature Section – reduced visual clutter, stronger depth */}
      {/* --------------------------------------------------------------- */}
      <section id="features" className="relative z-10 py-32 px-6 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
            <div className="md:col-span-4">
              <p className="text-white/40 text-lg leading-relaxed">
                We've moved beyond layouts. AuraGen orchestrates mood, motion, and interaction to create digital living organisms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: "Neural Theming",
                desc: "Our AI analyzes the semantic weight of your prompt to curate a unique color and typography ecosystem."
              },
              {
                icon: Layers,
                title: "Atmospheric Depth",
                desc: "Every generation includes cinematic motion layers, glassmorphism, and dynamic lighting presets."
              },
              {
                icon: Zap,
                title: "Instant Infinity",
                desc: "Produce production-ready codebases in seconds. Optimized for performance, SEO, and visual impact."
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group p-10 rounded-[2rem] bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-white/[0.08] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                  <f.icon className="w-7 h-7 text-white/80 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{f.title}</h3>
                <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CINEMATIC QUOTE --- */}
      <section className="relative z-10 py-40 flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: scrollYProgress }}
          className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full scale-150 pointer-events-none" 
        />
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-display italic font-light text-white/70 leading-tight"
          >
            "AuraGen isn't just a tool; it's the bridge between raw imagination and digital reality."
          </motion.p>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[3rem] p-12 md:p-24 text-center bg-gradient-to-b from-white/10 to-transparent border border-white/10"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter">
              The future of creation <br /> is <span className="text-primary italic">conscious.</span>
            </h2>
            <p className="max-w-xl mx-auto text-white/50 text-lg mb-12">
              Join the elite creators using AuraGen to architect the next generation of the web.
            </p>
            <Link href="/builder">
              <button className="px-12 py-5 rounded-full bg-white text-black font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                Start Generating Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold tracking-tighter uppercase">AuraGen Intelligence</span>
          </div>
          <div className="flex gap-8 text-xs font-bold tracking-[0.2em] uppercase text-white/30">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">Discord</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="text-xs text-white/20">
            © 2026 AuraGen. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
