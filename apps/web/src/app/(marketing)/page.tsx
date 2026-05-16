'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Play, Monitor, Smartphone, Share2, 
  Zap, Layers, CheckCircle2, ChevronRight, MessageSquare,
  Heart, Globe, ShieldCheck, Quote
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('creation');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative">
      
      {/* Hero: The Awakening */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 pt-20 overflow-hidden">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center"
        >
          <div className="space-y-10 relative z-10">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Engine v3.0 Is Live</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-7xl md:text-[110px] font-display font-bold leading-[0.85] tracking-tighter">
              Aesthetics <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                Redefined.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/30 max-w-xl leading-relaxed font-light italic">
              "We don't build pages. We architect digital universes where memories pulse with life and every pixel carries an emotion."
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-4">
              <Link href="/builder" className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                 Ignite Your Vision
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-all" />
              </Link>
              <button className="px-10 py-5 bg-white/[0.02] border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/[0.05] transition-all flex items-center gap-3">
                 <Play size={14} className="fill-white" />
                 The Premiere
              </button>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            <div className="relative z-20 w-full aspect-square rounded-[60px] bg-[#0a0a0f] border border-white/[0.05] shadow-2xl overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200" 
                 className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-all duration-[5000ms]" 
                 alt="Cinematic Preview" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent" />
               
               {/* Floating Interface Elements */}
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-12 -right-12 w-64 p-6 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <Sparkles size={14} />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/40">AI Orchestrator</span>
                  </div>
                  <div className="space-y-2">
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div animate={{ width: ['0%', '85%', '85%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-purple-500" />
                     </div>
                     <p className="text-[9px] text-white/20 italic">"Synthesizing emotional resonance..."</p>
                  </div>
               </motion.div>
            </div>
            
            {/* Ambient Circles */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-600/10 blur-[100px] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* The Core: Why AyraGen? */}
      <section className="py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
             <CoreValueCard 
               icon={<Zap className="text-orange-400" />}
               title="Zero Latency Thought"
               desc="From a simple prompt to a full cinematic universe in under 10 seconds. Our neural engine handles the complexity while you focus on the story."
             />
             <CoreValueCard 
               icon={<Layers className="text-purple-400" />}
               title="Granular Artistry"
               desc="Don't just generate. Co-create. Use our AI Design Copilot to tweak border-radius, grain intensity, and typography via natural language."
             />
             <CoreValueCard 
               icon={<Globe className="text-pink-400" />}
               title="Universal Presence"
               desc="Instantly publish to your own subdomain. Every creation is globally distributed, SEO-optimized, and social-media ready."
             />
          </div>
        </div>
      </section>

      {/* The Showcase: Live from the Multiverse */}
      <section className="py-40 bg-white/[0.01] border-y border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-4">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">Live Discovery</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">Real Legacies. <br /> Real Emotions.</h2>
           </div>
           <Link href="/explore" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all flex items-center gap-2">
              Browse Multiverse
              <ArrowRight size={14} />
           </Link>
        </div>

        <div className="flex gap-12 overflow-x-hidden relative">
           <div className="flex gap-12 animate-scroll-infinite px-12">
              <ShowcasePreview img="https://images.unsplash.com/photo-1518131394553-84611782294c?q=80&w=600" title="After the Sunset" creator="Arjun V." />
              <ShowcasePreview img="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600" title="The High Altitude" creator="Sarah K." />
              <ShowcasePreview img="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600" title="Midnight Poetry" creator="Zayn M." />
              <ShowcasePreview img="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600" title="Ethereal Fog" creator="Elena R." />
              {/* Duplicate for infinite loop effect */}
              <ShowcasePreview img="https://images.unsplash.com/photo-1518131394553-84611782294c?q=80&w=600" title="After the Sunset" creator="Arjun V." />
              <ShowcasePreview img="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600" title="The High Altitude" creator="Sarah K." />
           </div>
           <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020203] to-transparent z-10" />
           <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020203] to-transparent z-10" />
        </div>
      </section>

      {/* The Process: How We Forge Universes */}
      <section className="py-60 px-6 md:px-12 max-w-5xl mx-auto">
         <div className="text-center mb-32 space-y-6">
            <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter">Engineered for <br /> <span className="text-white/20">Aura.</span></h2>
            <p className="text-white/40 text-xl font-light italic">"The process is simple. The result is eternal."</p>
         </div>

         <div className="space-y-40">
            <ProcessStep 
              number="01" 
              title="Narrative Injection" 
              desc="You describe the vibe, the occasion, or the person. Our AI doesn't just read the words; it extracts the emotional frequency of your input."
              icon={<MessageSquare className="text-purple-400" />}
            />
            <ProcessStep 
              number="02" 
              title="Aesthetic Synthesis" 
              desc=" AyraGen's core engine selects the perfect typography, grain intensity, and motion rhythm to match your story's soul."
              icon={<Sparkles className="text-pink-400" />}
              reversed
            />
            <ProcessStep 
              number="03" 
              title="The Grand Premiere" 
              desc="Instantly launch your creation to a secure, private, or public subdomain. Complete with cinematic cursors and ceremonial entries."
              icon={<ShieldCheck className="text-emerald-400" />}
            />
         </div>
      </section>

      {/* The Legacy Wall: Voices from the Void */}
      <section className="py-40 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-24 space-y-4">
               <Quote className="text-purple-500/20 w-16 h-16" />
               <h2 className="text-5xl font-display font-bold tracking-tight">The Legacy Wall</h2>
               <p className="text-white/20 uppercase tracking-[0.4em] text-[10px] font-black">Testimonials from the multiversal architects</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <TestimonialCard 
                 quote="I created a birthday universe for my daughter. The way the AI understood the 'Ethereal' vibe was magical. She cried." 
                 author="Ananya R."
                 role="Digital Creator"
               />
               <TestimonialCard 
                 quote="Finally, a platform that respects design as much as I do. The 'Design Copilot' is like having a creative director in your pocket." 
                 author="Marcus T."
                 role="Brand Architect"
               />
               <TestimonialCard 
                 quote="The deployment flow is literally a ceremony. Sharing my anniversary site felt like launching a movie premiere." 
                 author="Kevin J."
                 role="Professional Dreamer"
               />
            </div>
         </div>
      </section>

      {/* Final CTA: The Ignition */}
      <section className="py-60 px-6 md:px-12 text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="space-y-12"
         >
            <h2 className="text-7xl md:text-[140px] font-display font-bold tracking-[ -0.05em] leading-none">
               Stop Dreaming. <br />
               <span className="text-white/10">Start Igniting.</span>
            </h2>
            <Link href="/builder" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-full shadow-[0_0_80px_rgba(255,255,255,0.15)] hover:scale-110 active:scale-95 transition-all">
               Launch Studio
               <ArrowRight size={18} />
            </Link>
         </motion.div>
      </section>

    </div>
  );
}

const CoreValueCard = ({ icon, title, desc }: any) => (
  <div className="p-10 bg-white/[0.02] border border-white/[0.05] rounded-[48px] space-y-6 hover:bg-white/[0.04] transition-all group">
    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-all">
      {icon}
    </div>
    <div className="space-y-4">
      <h3 className="text-2xl font-bold font-display">{title}</h3>
      <p className="text-white/30 font-light leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ShowcasePreview = ({ img, title, creator }: any) => (
  <div className="flex-shrink-0 w-[350px] space-y-6 group cursor-pointer">
    <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden border border-white/10">
       <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt={title} />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
       <div className="absolute bottom-8 left-8">
          <Play size={24} className="text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0" />
       </div>
    </div>
    <div className="px-4 space-y-1">
       <h4 className="text-xl font-bold font-display tracking-tight">{title}</h4>
       <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Architect: {creator}</p>
    </div>
  </div>
);

const ProcessStep = ({ number, title, desc, icon, reversed }: any) => (
  <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-20`}>
     <div className="flex-1 space-y-8">
        <span className="text-5xl font-display font-black text-white/5">{number}</span>
        <h3 className="text-4xl font-bold font-display leading-tight">{title}</h3>
        <p className="text-white/30 text-lg leading-relaxed font-light">{desc}</p>
        <div className="flex items-center gap-4 text-[10px] font-black text-purple-400 uppercase tracking-widest">
           {icon}
           Neural Synthesis Active
        </div>
     </div>
     <div className="flex-1 w-full aspect-video rounded-[40px] bg-white/[0.02] border border-white/5 flex items-center justify-center p-12">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 relative overflow-hidden">
           <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
           </div>
           <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Globe size={80} />
           </div>
        </div>
     </div>
  </div>
);

const TestimonialCard = ({ quote, author, role }: any) => (
  <div className="p-12 bg-white/[0.01] border border-white/[0.03] rounded-[48px] space-y-8 hover:bg-white/[0.03] transition-all relative">
     <Quote className="absolute top-8 right-8 text-white/[0.02] w-20 h-20" />
     <p className="text-lg text-white/50 leading-relaxed italic font-light">"{quote}"</p>
     <div className="pt-8 border-t border-white/5 space-y-1">
        <h5 className="text-sm font-black uppercase tracking-widest text-white">{author}</h5>
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{role}</p>
     </div>
  </div>
);
