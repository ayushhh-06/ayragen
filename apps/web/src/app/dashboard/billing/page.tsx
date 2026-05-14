'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, CreditCard, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    desc: 'For personal storytellers.',
    features: ['3 AI Generations / mo', 'Standard Rendering', 'AuraGen Branding', 'Community Themes'],
    button: 'Current Plan',
    current: true
  },
  {
    name: 'Pro',
    price: '$19',
    desc: 'For creative enthusiasts.',
    features: ['Unlimited Generations', 'Cinematic 4K Export', 'Custom Subdomains', 'Music Library', 'Priority AI Engine'],
    button: 'Upgrade to Pro',
    popular: true
  },
  {
    name: 'Premium',
    price: '$49',
    desc: 'For luxury agencies.',
    features: ['Everything in Pro', 'White-labeling', 'Team Collaboration', 'Vercel One-click Deploy', '24/7 Concierge Support'],
    button: 'Go Premium'
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
    if (plan === 'Free') return;
    setLoading(plan);

    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load. Check your internet.');
      setLoading(null);
      return;
    }

    try {
      // 1. Create Order on Backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007'}/billing/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ plan: plan.toLowerCase() })
      });
      const order = await response.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_your_key', 
        amount: order.amount,
        currency: "INR",
        name: "AuraGen AI",
        description: `Upgrade to ${plan} Plan`,
        image: "https://auragen.ai/logo.png",
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify Payment on Backend
          const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007'}/billing/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              plan: plan.toLowerCase()
            })
          });
          const result = await verifyRes.json();
          if (result.success) {
            window.location.href = '/dashboard/billing?success=true';
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
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
    <div className="p-8 max-w-6xl mx-auto w-full pb-32">
      <div className="mb-16 space-y-4">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Power Your <br /> Universe</h1>
        <p className="text-white/40 text-sm font-medium italic">Manage your subscription, credits, and cinematic capabilities.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-8 rounded-[40px] border flex flex-col justify-between transition-all duration-500 ${
              plan.popular 
              ? 'bg-primary/5 border-primary/30 shadow-[0_30px_100px_rgba(192,132,252,0.15)] scale-105 z-10' 
              : 'bg-white/[0.02] border-white/5 hover:border-white/10'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
                Most Popular
              </div>
            )}

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-widest">{plan.name}</h3>
                <p className="text-xs text-white/30 font-medium italic">{plan.desc}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                <span className="text-white/20 text-xs font-bold uppercase tracking-widest">/month</span>
              </div>

              <ul className="space-y-4 pt-8 border-t border-white/5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-xs text-white/60 font-medium">
                    <div className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                       <Check size={10} className="text-emerald-500" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => handleUpgrade(plan.name)}
              disabled={plan.current || !!loading}
              className={`mt-12 w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${
                plan.current 
                ? 'bg-white/5 text-white/20 cursor-default' 
                : 'bg-white text-black hover:scale-105 active:scale-95 shadow-xl'
              }`}
            >
              {loading === plan.name ? 'Processing...' : plan.button}
              {loading === plan.name && <Sparkles size={12} className="animate-spin" />}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Usage Stats Section */}
      <div className="grid md:grid-cols-2 gap-8">
         <div className="p-10 rounded-[40px] bg-white/[0.01] border border-white/5 space-y-6">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
               <Zap size={16} className="text-primary" />
               Current AI Usage
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Generations</span>
                  <span className="text-xl font-black text-white">2 <span className="text-white/20 text-xs">/ 3</span></span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '66%' }}
                    className="h-full bg-primary shadow-[0_0_20px_rgba(192,132,252,0.5)]"
                  />
               </div>
            </div>
            <p className="text-[10px] text-white/20 font-medium italic">Resets on June 1st, 2026.</p>
         </div>

         <div className="p-10 rounded-[40px] bg-white/[0.01] border border-white/5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                 <CreditCard size={16} className="text-primary" />
                 Payment Method
              </h3>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                 <div className="w-12 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/20 italic">VISA</div>
                 <div>
                    <p className="text-xs font-bold text-white tracking-widest uppercase">•••• •••• •••• 4242</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-tighter">Expires 12/28</p>
                 </div>
              </div>
            </div>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:text-white transition-all flex items-center gap-2 mt-6">
               Manage Billing Portal <ArrowRight size={12} />
            </button>
         </div>
      </div>
    </div>
  );
}
