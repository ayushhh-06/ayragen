'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, Zap, Shield, Crown, Play } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <main className="min-h-screen bg-[#050505] font-sans text-white overflow-hidden selection:bg-purple-500/30 selection:text-white relative">
      
      {/* Intense Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-[100%] bg-purple-600/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full p-8 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[13px] font-medium">Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10">
            <Sparkles className="h-3 w-3 text-purple-300" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white/90">AuraGen</span>
        </div>
        <div className="w-20" />
      </nav>

      {/* Content Area */}
      <div className="relative z-10 flex flex-col items-center pt-12 pb-32 px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-medium text-purple-300 tracking-wide uppercase mb-6">
            Scale your vision
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-display">
            Simple, transparent <br />
            <span className="text-white/60 italic">pricing for everyone.</span>
          </h1>
          <p className="text-white/40 text-[17px] max-w-lg mx-auto font-light leading-relaxed">
            Choose the perfect plan for your creative journey. <br className="hidden md:block"/> No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Toggle with Cinematic Glow */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-full mb-20 relative backdrop-blur-xl"
        >
          <div className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_rgba(255,255,255,0.2)] ${!isYearly ? 'translate-x-0' : 'translate-x-[calc(100%+6px)]'}`} />
          <button 
            onClick={() => setIsYearly(false)}
            className={`relative z-10 px-8 py-2.5 rounded-full text-[13px] font-semibold transition-colors duration-500 ${!isYearly ? 'text-black' : 'text-white/40 hover:text-white'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setIsYearly(true)}
            className={`relative z-10 px-8 py-2.5 rounded-full text-[13px] font-semibold transition-colors duration-500 ${isYearly ? 'text-black' : 'text-white/40 hover:text-white'}`}
          >
            Yearly <span className="absolute -top-3 -right-2 text-[9px] bg-purple-500 text-white px-2 py-0.5 rounded-full font-bold shadow-lg">Save 20%</span>
          </button>
        </motion.div>

        {/* Pricing Cards - High End Glassmorphism */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl items-stretch">
          
          <PricingCard 
            title="Starter"
            price="0"
            icon={<Shield className="w-5 h-5 text-white/40" />}
            features={['1 Website', '50 AI Credits/mo', 'Basic Templates', 'AuraGen Branding']}
            buttonText="Get Started"
            delay={0.3}
          />

          <PricingCard 
            title="Pro"
            price={isYearly ? "19" : "24"}
            icon={<Zap className="w-5 h-5 text-purple-400" />}
            features={['10 Websites', '1000 AI Credits/mo', 'Premium Themes', 'Custom Domain', 'No Branding']}
            buttonText="Upgrade to Pro"
            isPopular={true}
            delay={0.4}
          />

          <PricingCard 
            title="Agency"
            price={isYearly ? "49" : "59"}
            icon={<Crown className="w-5 h-5 text-pink-400" />}
            features={['Unlimited Sites', '5000 AI Credits/mo', 'Team Collaboration', 'Priority Support', 'Custom Analytics']}
            buttonText="Start Free Trial"
            delay={0.5}
          />

        </div>

        {/* FAQ Shortcut */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-20 text-[13px] text-white/20">
          Have questions? <span className="text-white/40 hover:text-white cursor-pointer underline underline-offset-4 transition-colors">Talk to our experts</span>
        </motion.p>
      </div>
    </main>
  );
}

function PricingCard({ title, price, icon, features, buttonText, isPopular = false, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-[40px] p-10 flex flex-col transition-all duration-500 ${
        isPopular 
        ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] md:-translate-y-6 scale-[1.02]' 
        : 'bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-5 py-2 rounded-full tracking-widest uppercase shadow-2xl">
          Most Popular
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <div className={`p-2.5 rounded-2xl ${isPopular ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-white/40'}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      </div>

      <div className="mb-10 flex items-baseline gap-1">
        <span className="text-5xl font-bold tracking-tighter">${price}</span>
        <span className="text-white/30 text-sm font-light">/mo</span>
      </div>

      <div className="flex-1 space-y-5 mb-12">
        {features.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-start gap-4">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isPopular ? 'bg-purple-500/10' : 'bg-white/5'}`}>
              <Check className={`w-3 h-3 ${isPopular ? 'text-purple-400' : 'text-white/20'}`} />
            </div>
            <span className="text-[14px] text-white/50 font-light">{feature}</span>
          </div>
        ))}
      </div>

      <Link href="/auth">
        <button className={`w-full py-4 rounded-2xl text-[14px] font-bold transition-all active:scale-95 ${
          isPopular 
          ? 'bg-white text-black hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
          : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
        }`}>
          {buttonText}
        </button>
      </Link>
    </motion.div>
  );
}
