import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Wand2, Globe, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useGenerationStore } from '@/database/state/useGenerationStore';
import { useAuthStore } from '@/database/state/useAuthStore';
import { apiClient } from '@/lib/api-client';

export const PremiumBanner = () => {
  const { plan, manifest } = useGenerationStore();
  const { user } = useAuthStore();
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  if (plan === 'ARCHITECT' || !isVisible || !manifest) return null;

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // Razorpay logic here (reusing common logic)
      const response = await apiClient.post('/billing/order', { 
        plan: 'architect', 
        websiteId: manifest.id 
      });
      const order = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_placeholder',
        amount: order.amount,
        currency: "INR",
        name: "AYRAGEN",
        description: `Unlock Premium for ${manifest.title}`,
        order_id: order.id,
        handler: async function (response: any) {
          await apiClient.post('/billing/verify', {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            plan: 'architect'
          });
          window.location.reload();
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: { color: "#c084fc" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error('Upgrade failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute top-20 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-6"
    >
      <div className="relative overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-1.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
        {/* Animated Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 animate-pulse" />
        
        <div className="relative flex items-center justify-between pl-6 pr-2 py-2">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10">
               <Wand2 size={18} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Unlock Cinematic Excellence
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-widest font-black">₹199</span>
              </h3>
              <p className="text-[10px] text-white/40 font-medium tracking-wide">Custom Subdomain • No Watermark • HD Assets</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleUpgrade}
              disabled={loading}
              className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2"
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              Elevate Universe
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="p-3 text-white/20 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
