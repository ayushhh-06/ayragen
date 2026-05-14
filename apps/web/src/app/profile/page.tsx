'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FloatingNavbar } from '@/frontend/interface/shared/FloatingNavbar';
import { AmbientBackground } from '@/frontend/interface/shared/AmbientBackground';
import { GlassCard } from '@/frontend/interface/shared/GlassCard';
import { GlowButton } from '@/frontend/interface/shared/GlowButton';
import { Sparkles, User, Settings, CreditCard, Bell, LogOut, Shield } from 'lucide-react';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-white pb-20">
      <FloatingNavbar />
      <AmbientBackground />
      <div className="noise" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-2">
            {[
              { icon: User, label: 'Profile', active: true },
              { icon: Sparkles, label: 'Generations', active: false },
              { icon: CreditCard, label: 'Subscription', active: false },
              { icon: Bell, label: 'Notifications', active: false },
              { icon: Shield, label: 'Security', active: false },
              { icon: Settings, label: 'Preferences', active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium text-sm ${item.active ? 'bg-primary/20 text-white border border-primary/30 shadow-[0_0_20px_rgba(192,132,252,0.15)]' : 'text-white/50 hover:bg-white/5 hover:text-white border border-transparent'}`}
              >
                <item.icon className={`w-4 h-4 ${item.active ? 'text-primary' : ''}`} />
                {item.label}
              </button>
            ))}

            <div className="pt-8">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium text-sm text-red-400 hover:bg-red-500/10 border border-transparent">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="font-display text-4xl font-bold mb-2">Account Profile</h1>
              <p className="text-white/40">Manage your cinematic identity and platform preferences.</p>
            </motion.div>

            {/* Profile Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <GlassCard className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-rose p-1 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-4 border-black overflow-hidden">
                      {/* Placeholder Avatar */}
                      <div className="w-full h-full bg-white/10 flex items-center justify-center text-3xl font-display text-white">A</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-label uppercase tracking-widest text-white/40 mb-2">Display Name</label>
                        <input type="text" defaultValue="Ayush" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-label uppercase tracking-widest text-white/40 mb-2">Email Address</label>
                        <input type="email" defaultValue="ayush@example.com" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <GlowButton variant="primary" size="sm">Save Changes</GlowButton>
                </div>
              </GlassCard>
            </motion.div>

            {/* Subscription Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <GlassCard className="p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-colors duration-700" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-2xl font-bold">AyraGen Pro</h2>
                  </div>
                  <p className="text-white/40 mb-6">Unlimited cinematic generations and 4K exports.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-1 p-4 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-between w-full">
                      <div>
                        <div className="text-sm font-bold text-white">Active Plan</div>
                        <div className="text-xs text-white/50">Renews Oct 12, 2026</div>
                      </div>
                      <div className="text-xl font-bold text-primary">$19<span className="text-sm text-white/40">/mo</span></div>
                    </div>
                    
                    <GlowButton variant="ghost" size="sm" className="w-full sm:w-auto">Manage Billing</GlowButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}
