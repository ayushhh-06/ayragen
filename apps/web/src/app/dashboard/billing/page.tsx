'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, CreditCard, ArrowRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

const plans = [
  {
    name: 'Genesis',
    price: '₹0',
    desc: 'For personal storytellers.',
    features: ['3 AI Generations / mo', 'Standard Rendering', 'AyraGen Branding', 'Community Themes'],
    button: 'Current Essence',
    current: true
  },
  {
    name: 'Architect',
    price: '₹199',
    desc: 'For creative enthusiasts.',
    features: ['Unlimited Generations', 'Cinematic 4K Export', 'Custom Subdomains', 'Music Library', 'Priority AI Engine'],
    button: 'Elevate to Architect',
    popular: true
  },
  {
    name: 'Oracle',
    price: '₹499',
    desc: 'For luxury agencies.',
    features: ['Everything in Pro', 'White-labeling', 'Team Collaboration', 'Vercel One-click Deploy', '24/7 Concierge Support'],
    button: 'Unlock Oracle'
  }
];

export default function BillingPage() {
  const [loading, setLoading] = React.useState<string | null>(null);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (plan: string) => {
    if (plan === 'Genesis') return;
    setLoading(plan);

    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      alert('Razorpay SDK failed to load. Check your internet.');
      setLoading(null);
      return;
    }

    try {
      const response = await apiClient.post('/payments/create-order', { plan: plan.toLowerCase() });
      const order = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_placeholder', 
        amount: order.amount,
        currency: "INR",
        name: "AyraGen AI",
        description: `Upgrade to ${plan} Plan`,
        order_id: order.id,
        handler: async function (response: any) {
          const verifyRes = await apiClient.post('/payments/verify', {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            plan: plan.toLowerCase()
          });
          if (verifyRes.data.success) {
            window.location.reload();
          }
        },
        theme: {
          color: "#c084fc",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto w-full pb-32 font-body">
      <header className="mb-20 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">AyraGen <span className="text-white/20 italic font-light">Vault</span></span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold font-display text-white tracking-tighter">Power Your Universe</h1>
        <p className="text-white/30 text-lg font-light italic">"Choose the magnitude of your creative influence."</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-10 rounded-[40px] border flex flex-col justify-between transition-all duration-500 ${
              plan.popular 
              ? 'bg-gradient-to-b from-white/[0.08] to-transparent border-white/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]' 
              : 'bg-white/[0.02] border-white/10'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-purple-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                Recommended
              </div>
            )}

            <div className="space-y-10">
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${plan.popular ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-white/20'}`}>
                    {plan.name === 'Oracle' ? <Crown size={20} /> : <Zap size={20} />}
                 </div>
                 <h3 className="text-2xl font-bold font-display text-white">{plan.name}</h3>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold font-display text-white tracking-tighter">{plan.price}</span>
                <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">/ month</span>
              </div>

              <ul className="space-y-4 pt-8 border-t border-white/5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-[13px] text-white/40 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => handleUpgrade(plan.name)}
              disabled={plan.current || !!loading}
              className={`mt-12 w-full py-5 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                plan.current 
                ? 'bg-white/[0.05] text-white/20 cursor-default border border-transparent' 
                : 'bg-white text-black hover:scale-105 active:scale-95 shadow-2xl'
              }`}
            >
              {loading === plan.name ? 'Re-Syncing...' : plan.button}
              {loading === plan.name && <Loader2 size={14} className="animate-spin" />}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Usage Section */}
      <div className="grid md:grid-cols-2 gap-8">
         <section className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-[40px] p-10 space-y-8">
            <h3 className="text-[11px] font-bold text-white/20 uppercase tracking-[0.3em] flex items-center gap-2">
               <Zap size={14} className="text-purple-400" />
               Neural Capacity
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold font-display text-white">2 / 3</span>
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">66% Utilized</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '66%' }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  />
               </div>
            </div>
            <p className="text-[11px] text-white/20 italic font-medium">Neural cycle resets in 12 days.</p>
         </section>

         <section className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-[40px] p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-[11px] font-bold text-white/20 uppercase tracking-[0.3em] flex items-center gap-2">
                 <ShieldCheck size={14} className="text-purple-400" />
                 Payment Integrity
              </h3>
              <div className="flex items-center gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                 <div className="w-12 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/20 italic">VISA</div>
                 <div>
                    <p className="text-sm font-bold text-white tracking-widest uppercase">•••• 4242</p>
                    <p className="text-[10px] text-white/20 uppercase tracking-tighter">Vault Encryption Active</p>
                 </div>
              </div>
            </div>
            <button className="text-[11px] font-bold text-white/30 uppercase tracking-widest hover:text-white transition-all flex items-center gap-2 mt-8 group">
               Access Billing Portal <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
            </button>
         </section>
      </div>
    </div>
  );
}
