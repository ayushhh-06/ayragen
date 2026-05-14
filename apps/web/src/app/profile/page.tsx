'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, Settings, CreditCard, Bell, LogOut, Shield, ArrowLeft, Camera, Mail, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/database/state/useAuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  return (
    <main className="min-h-screen bg-[#020203] text-white font-body selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-20">
           <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white transition-all group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Back to Studio</span>
           </Link>
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
               <ShieldCheck className="w-4 h-4 text-purple-400" />
             </div>
             <span className="font-display font-bold text-xl tracking-tight">AyraGen <span className="text-white/20 italic font-light">Security</span></span>
           </div>
        </header>

        <div className="grid lg:grid-cols-[280px_1fr] gap-16">
          
          {/* Navigation Sidebar */}
          <aside className="space-y-2">
            {[
              { icon: User, label: 'Identity', active: true },
              { icon: CreditCard, label: 'Subscription', active: false },
              { icon: Shield, label: 'Vault Security', active: false },
              { icon: Settings, label: 'Preferences', active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-bold uppercase tracking-[0.2em] border ${
                  item.active 
                    ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                    : 'text-white/30 border-transparent hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}

            <div className="pt-10">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-bold uppercase tracking-[0.2em] text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                Disconnect Session
              </button>
            </div>
          </aside>

          {/* Main Form Area */}
          <div className="space-y-12">
            
            <header className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold font-display tracking-tighter">Cinematic Profile</h1>
              <p className="text-white/30 text-lg font-light italic">"A digital representation of your creative soul."</p>
            </header>

            <section className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-[40px] p-10 md:p-16 space-y-16">
               
               {/* Avatar Section */}
               <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="relative group">
                     <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-display font-bold border-4 border-black overflow-hidden">
                           {user?.name?.[0] || 'A'}
                        </div>
                     </div>
                     <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white text-black border-4 border-[#020203] flex items-center justify-center hover:scale-110 transition-all">
                        <Camera size={16} />
                     </button>
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                     <h3 className="text-2xl font-bold font-display">{user?.name || 'AyraGen Architect'}</h3>
                     <p className="text-[11px] font-bold text-purple-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                        <Sparkles size={12} />
                        Genesis Member
                     </p>
                  </div>
               </div>

               {/* Fields */}
               <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                     <label className="text-[11px] font-bold text-white/20 uppercase tracking-[0.3em] ml-2">Full Identity</label>
                     <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                           type="text" 
                           defaultValue={user?.name} 
                           className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.05] transition-all" 
                        />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[11px] font-bold text-white/20 uppercase tracking-[0.3em] ml-2">Digital Address</label>
                     <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                           type="email" 
                           defaultValue={user?.email} 
                           disabled
                           className="w-full bg-white/[0.01] border border-white/[0.05] rounded-2xl py-5 pl-14 pr-6 text-sm text-white/40 focus:outline-none cursor-not-allowed" 
                        />
                     </div>
                  </div>
               </div>

               <div className="flex justify-end pt-8">
                  <button className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-[11px] rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                     Update Identity
                  </button>
               </div>
            </section>

            {/* Subscription Highlight */}
            <section className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-[40px] p-10 md:p-16 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-all duration-1000" />
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="space-y-4 text-center md:text-left">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                        Tier Status
                     </div>
                     <h2 className="text-3xl font-display font-bold">AyraGen Pro</h2>
                     <p className="text-white/40 text-sm italic">Unlimited cinematic renderings & priority neural access.</p>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-3xl border border-white/5 p-8 rounded-3xl text-center min-w-[200px]">
                     <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">Renews In</div>
                     <div className="text-4xl font-bold font-display tracking-tight">24 Days</div>
                  </div>
               </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
