'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, Zap, Shield, Crown, Play, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (plan: string) => {
    setLoading(plan);
    try {
      // In a real production app, we would call the backend to create a Razorpay order
      // For now, we'll simulate the flow or redirect to auth if not logged in
      const res = await apiClient.post('/billing/order', { plan, yearly: isYearly });
      const order = res.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_placeholder',
        amount: order.amount,
        currency: "INR",
        name: "AYRAGEN",
        description: `${plan} Subscription`,
        order_id: order.id,
        handler: function (response: any) {
          apiClient.post('/billing/verify', response).then(() => {
            window.location.href = '/dashboard';
          });
        },
        theme: {
          color: "#c084fc",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment initialization failed:', err);
      // Fallback: Redirect to auth if unauthorized
      window.location.href = '/auth';
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#020203] text-white font-body selection:bg-purple-500/30 overflow-x-hidden relative">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
        
        <header className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-bold text-purple-400 uppercase tracking-widest">
            Neural Tier Selection
          </div>
          <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter leading-none">
             Cinematic <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Power.</span>
          </h1>
          <p className="text-white/30 text-lg font-light max-w-lg mx-auto italic">
            "Choose the magnitude of your creative influence."
          </p>
        </header>

        {/* Toggle */}
        <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.08] p-1.5 rounded-2xl mb-24 relative backdrop-blur-3xl">
          <button 
            onClick={() => setIsYearly(false)}
            className={`relative z-10 px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${!isYearly ? 'bg-white text-black shadow-2xl' : 'text-white/30 hover:text-white'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setIsYearly(true)}
            className={`relative z-10 px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${isYearly ? 'bg-white text-black shadow-2xl' : 'text-white/30 hover:text-white'}`}
          >
            Yearly <span className="ml-2 text-[9px] text-purple-400 opacity-60">-20%</span>
          </button>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
          
          <PlanCard 
            title="Genesis"
            price="0"
            icon={<Shield className="w-5 h-5" />}
            features={['3 Digital Universes', 'Basic Neural Processing', 'Community Access', 'AyraGen Branding']}
            buttonText="Current Essence"
            onAction={() => router.push('/dashboard')}
          />

          <PlanCard 
            title="Architect"
            price={isYearly ? "199" : "299"}
            icon={<Zap className="w-5 h-5 text-purple-400" />}
            features={['Unlimited Universes', 'Priority Neural Queue', 'Custom Subdomains', '4K Cinematic Export', 'Ghost Mode (No Branding)']}
            buttonText={loading === 'Architect' ? 'Syncing...' : 'Elevate to Architect'}
            isPopular={true}
            onAction={() => handleUpgrade('Architect')}
            loading={loading === 'Architect'}
          />

          <PlanCard 
            title="Oracle"
            price={isYearly ? "499" : "699"}
            icon={<Crown className="w-5 h-5 text-pink-400" />}
            features={['Everything in Architect', 'Multi-User Workspace', 'API Access', 'White-label Delivery', 'Dedicated Support']}
            buttonText={loading === 'Oracle' ? 'Syncing...' : 'Unlock Oracle'}
            onAction={() => handleUpgrade('Oracle')}
            loading={loading === 'Oracle'}
          />

        </div>
      </div>
    </main>
  );
}

function PlanCard({ title, price, icon, features, buttonText, isPopular = false, onAction, loading }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`relative rounded-[40px] p-10 flex flex-col border transition-all duration-500 ${
        isPopular 
        ? 'bg-gradient-to-b from-white/[0.08] to-transparent border-white/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]' 
        : 'bg-white/[0.02] border-white/[0.08] backdrop-blur-3xl'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[9px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-lg shadow-purple-500/40">
          Recommended
        </div>
      )}

      <div className="flex items-center gap-4 mb-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isPopular ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-white/20'}`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold font-display">{title}</h3>
      </div>

      <div className="mb-12">
        <div className="flex items-baseline gap-1">
          <span className="text-6xl font-bold font-display tracking-tighter">₹{price}</span>
          <span className="text-white/20 text-sm font-light">/mo</span>
        </div>
      </div>

      <div className="flex-1 space-y-5 mb-12">
        {features.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
             <span className="text-[13px] text-white/40 font-light">{feature}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={onAction}
        disabled={loading}
        className={`w-full py-5 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
          isPopular 
          ? 'bg-white text-black hover:scale-105 shadow-2xl' 
          : 'bg-white/[0.05] border border-white/10 text-white hover:bg-white/10'
        }`}
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {buttonText}
      </button>
    </motion.div>
  );
}
