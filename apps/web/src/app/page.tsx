'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Monitor, 
  Smartphone, 
  Share2, 
  Zap, 
  Layers, 
  CheckCircle2,
  Code as Github,
  Camera as Instagram,
  Globe as Twitter,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#020203] text-white font-body selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 h-20 px-6 md:px-12 flex items-center justify-between z-[100] bg-[#020203]/50 backdrop-blur-xl border-b border-white/[0.05]">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="h-4 w-4 text-purple-300" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">AyraGen</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-white/50">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#themes" className="hover:text-white transition-colors">Themes</Link>
          <Link href="#examples" className="hover:text-white transition-colors">Examples</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-[13px] font-medium text-white/70 hover:text-white transition-colors px-4 py-2">Sign in</Link>
          <Link href="/auth" className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[13px] font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            Start Creating
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-bold text-white/60 uppercase tracking-widest">
            <span className="flex h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
            AI-Powered • Beautiful • Effortless
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter">
            Create cinematic <br /> websites with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/40 max-w-lg leading-relaxed font-light">
            Transform your stories, emotions, and ideas into visually stunning, responsive websites. No coding. Just imagination.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/onboarding" className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
              <Sparkles className="w-5 h-5" />
              Start Creating Now
            </Link>
            <button className="px-8 py-4 bg-white/[0.03] border border-white/[0.08] text-white font-bold rounded-2xl flex items-center gap-3 hover:bg-white/[0.06] transition-all">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020203] overflow-hidden bg-white/10">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-[13px] text-white/40">
              <span className="text-white font-bold">Loved by 2,000+</span> creators <br />
              <div className="flex text-yellow-500 gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} className="w-3 h-3 fill-current" />)}
                <span className="text-white font-bold ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Visual Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative perspective-1000 hidden lg:block"
        >
          {/* Main Website Card */}
          <div className="relative z-20 w-[600px] h-[400px] rounded-[40px] bg-[#0a0a0f] border border-white/[0.1] shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-50" />
            
            {/* Website Content Mockup */}
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-white/30">
                  <span>Home</span>
                  <span>Our Story</span>
                  <span>Gallery</span>
                </div>
              </div>
              
              <div className="flex gap-10 h-full">
                <div className="flex-1 space-y-6">
                  <h2 className="text-5xl font-display font-bold">Our <br /> Love Story</h2>
                  <p className="text-sm text-white/40 leading-relaxed max-w-xs italic">
                    Every moment, beautifully preserved in a cinematic digital vault.
                  </p>
                  <div className="px-6 py-3 bg-purple-600 text-white text-[10px] font-bold rounded-full w-fit">
                    Explore Our Journey
                  </div>
                </div>
                <div className="w-[180px] h-[240px] relative rounded-3xl overflow-hidden border border-white/10 rotate-3 translate-y-4">
                  <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Couple" />
                </div>
              </div>
            </div>

            {/* Floating Polaroid Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-20 z-30 w-48 h-60 bg-white p-3 rounded-lg shadow-2xl rotate-12 border border-black/5"
            >
              <div className="w-full h-44 bg-gray-200 overflow-hidden mb-3">
                <img src="https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Polaroid 1" />
              </div>
              <div className="h-2 w-20 bg-gray-100 rounded" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 z-30 w-44 h-52 bg-white p-2.5 rounded-lg shadow-2xl -rotate-6 border border-black/5"
            >
              <div className="w-full h-36 bg-gray-200 overflow-hidden mb-2.5">
                <img src="https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Polaroid 2" />
              </div>
              <div className="h-1.5 w-16 bg-gray-100 rounded" />
            </motion.div>
          </div>

          {/* Floating Stats */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-10 -right-10 z-40 p-6 bg-[#1a1a25]/80 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-2xl flex flex-col items-center"
          >
            <div className="relative w-16 h-16 flex items-center justify-center mb-2">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-purple-500" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - 0.98)} />
              </svg>
              <span className="absolute text-[12px] font-bold">98%</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Generation Magic</span>
            <span className="text-[8px] text-white/20 mt-1">Building your universe...</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 px-6 md:px-12 border-y border-white/[0.05] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Trusted by creators and teams at</span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all">
            <LogoItem icon={<Monitor />} name="Vercel" />
            <LogoItem icon={<Smartphone />} name="Framer" />
            <LogoItem icon={<Layers />} name="Linear" />
            <LogoItem icon={<Share2 />} name="Notion" />
            <LogoItem icon={<Zap />} name="Tailwind" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-20 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
            Everything you need to build <span className="text-purple-400">unforgettable</span> digital experiences.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Sparkles className="text-purple-400" />}
            title="AI That Understands"
            desc="Advanced AI analyzes emotions, context and meaning to create perfect websites."
          />
          <FeatureCard 
            icon={<Layers className="text-pink-400" />}
            title="Cinematic Designs"
            desc="Stunning, modern, and emotionally engaging themes crafted for every story."
          />
          <FeatureCard 
            icon={<Smartphone className="text-indigo-400" />}
            title="Fully Responsive"
            desc="Every website looks perfect on all devices. Built with modern best practices."
          />
          <FeatureCard 
            icon={<Share2 className="text-emerald-400" />}
            title="Export & Share"
            desc="Export your site, host it, and share your story with the world instantly."
          />
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 px-6 md:px-12 bg-white/[0.01] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-4 block">How it Works</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">From thought to website in <span className="text-purple-400">3 simple steps</span></h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <StepItem 
            num={1} 
            title="Describe" 
            desc="Share your story, idea or moment in simple words." 
            icon={<MessageSquare className="w-5 h-5" />}
          />
          <StepItem 
            num={2} 
            title="Generate" 
            desc="AI analyzes and creates your beautiful website instantly." 
            icon={<Zap className="w-5 h-5" />}
          />
          <StepItem 
            num={3} 
            title="Customize & Share" 
            desc="Tweak, personalize and share your site with the world." 
            icon={<Share2 className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* Showcase Showcase */}
      <section id="examples" className="py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight">
              Your story deserves more than just words. <br />
              Make it <span className="text-purple-400">unforgettable.</span>
            </h2>
            <Link href="/onboarding" className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all">
              Start Creating Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-3">
                {[5, 6, 7].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020203] bg-white/10 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-[13px] text-white/40 font-medium">Join 2,000+ creators</span>
            </div>
          </div>

          <div className="relative h-[600px] flex items-center">
             <div className="grid grid-cols-2 gap-4 w-full h-[120%] -rotate-6 scale-110">
                <ShowcaseItem img="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800" title="Adventure Together" />
                <ShowcaseItem img="https://images.unsplash.com/photo-1518131394553-84611782294c?q=80&w=800" title="A Love Written in Moments" delay={0.2} />
                <ShowcaseItem img="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800" title="Timeless Memories" delay={0.4} />
                <ShowcaseItem img="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800" title="Ethereal Travels" delay={0.6} />
             </div>
             <div className="absolute inset-0 bg-gradient-to-l from-[#020203] via-transparent to-[#020203] pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-[#020203] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Call to Action with Firefly Jar */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative w-full rounded-[60px] overflow-hidden p-20 text-center bg-[#0a0a0f] border border-white/[0.05]">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1517404212775-40766774060c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 blur-sm" alt="Magic" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020203]/80 to-[#020203]" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                <Image src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=400" alt="Jar" width={60} height={60} className="rounded-full brightness-150 contrast-125" />
              </div>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              Ready to create <br /> something beautiful?
            </h2>
            <p className="text-white/40 text-lg">Join thousands of creators building websites that touch hearts.</p>
            
            <Link href="/onboarding" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl">
              Start Your Journey Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 px-6 md:px-12 border-t border-white/[0.05] max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10">
                <Sparkles className="h-5 w-5 text-purple-300" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">AyraGen</span>
            </Link>
            <p className="text-white/30 text-sm max-w-xs leading-relaxed">
              The AI platform that turns emotions into cinematic digital experiences.
            </p>
            <div className="flex gap-4">
              <FooterSocial icon={<Twitter />} />
              <FooterSocial icon={<Instagram />} />
              <FooterSocial icon={<Github />} />
            </div>
          </div>
          
          <FooterCol title="Product" links={['Features', 'Themes', 'Examples', 'How it Works']} />
          <FooterCol title="Company" links={['About', 'Blog', 'Careers', 'Contact']} />
          <FooterCol title="Resources" links={['Docs', 'Help Center', 'Community', 'Updates']} />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/[0.03] text-[12px] text-white/20 font-medium">
          <span>© 2024 AyraGen. All rights reserved.</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LogoItem({ icon, name }: { icon: React.ReactNode, name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 text-white/60">{icon}</div>
      <span className="text-[12px] font-bold tracking-widest text-white/60">{name}</span>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group p-8 bg-white/[0.02] border border-white/[0.08] rounded-3xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500">
      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function StepItem({ num, title, desc, icon }: { num: number, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="text-center space-y-6 relative z-10 group">
      <div className="relative inline-flex items-center justify-center">
        <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all" />
        <div className="w-24 h-24 rounded-[32px] bg-[#0a0a0f] border border-white/[0.08] flex items-center justify-center relative z-10 group-hover:border-purple-500/50 transition-all">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black shadow-lg">
            {num}
          </div>
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-white/30 text-sm max-w-[200px] mx-auto leading-relaxed">{desc}</p>
    </div>
  );
}

function ShowcaseItem({ img, title, delay = 0 }: { img: string, title: string, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10"
    >
      <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-6 left-6 right-6">
        <h4 className="text-lg font-bold mb-2">{title}</h4>
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-1 group-hover:text-white transition-colors cursor-pointer">
          Explore <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}

function FooterCol({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/20">{title}</h4>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link}>
            <Link href="#" className="text-sm text-white/40 hover:text-white transition-colors">{link}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterSocial({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer">
      {React.cloneElement(icon as React.ReactElement, { size: 18 })}
    </div>
  );
}
