'use client';

import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Zap, CreditCard, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const TABS = ['Profile', 'Billing', 'AI Preferences', 'Notifications', 'Integrations', 'Team', 'Danger Zone'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div className="p-8 max-w-5xl mx-auto w-full pb-20">
      
      {/* Header Area */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-white mb-2">Settings</h1>
        <p className="text-sm text-white/50">Manage your account preferences and configurations</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-white/10 mb-8 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab 
              ? 'border-pink-500 text-pink-400' 
              : 'border-transparent text-white/40 hover:text-white/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area - Profile Settings */}
      {activeTab === 'Profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Left Column - Profile Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="rounded-3xl border border-white/10 bg-[#120B1A] p-8">
              <h2 className="text-sm font-semibold text-white/90 mb-6">Profile Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full border border-white/20 overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" fill alt="Avatar" className="object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Alex Johnson</h3>
                  <p className="text-xs text-white/40 mb-3">alex@example.com</p>
                  <button className="px-4 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10 transition-colors">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-medium text-white/40 mb-2 uppercase tracking-wide">Full Name</label>
                  <input type="text" defaultValue="Alex Johnson" className="w-full bg-[#0A0512] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500/50" />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-white/40 mb-2 uppercase tracking-wide">Email Address</label>
                  <input type="email" defaultValue="alex@example.com" className="w-full bg-[#0A0512] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500/50" />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-white/40 mb-2 uppercase tracking-wide">Bio</label>
                  <textarea defaultValue="AI enthusiast & web creator." rows={3} className="w-full bg-[#0A0512] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500/50 resize-none" />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-sm font-semibold text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transition-transform">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Preferences */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-[#120B1A] p-8">
              <h2 className="text-sm font-semibold text-white/90 mb-6">Appearance</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-medium text-white/40 mb-2 uppercase tracking-wide">Theme</label>
                  <div className="relative">
                    <select className="w-full bg-[#0A0512] border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-pink-500/50">
                      <option>Dark Cinematic</option>
                      <option>Light Minimal</option>
                      <option>System Default</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/40 mb-3 uppercase tracking-wide">Accent Color</label>
                  <div className="flex items-center gap-3">
                    <button className="w-6 h-6 rounded-full bg-pink-500 ring-2 ring-white/20 ring-offset-2 ring-offset-[#120B1A]" />
                    <button className="w-6 h-6 rounded-full bg-purple-500 hover:scale-110 transition-transform" />
                    <button className="w-6 h-6 rounded-full bg-blue-500 hover:scale-110 transition-transform" />
                    <button className="w-6 h-6 rounded-full bg-emerald-500 hover:scale-110 transition-transform" />
                    <button className="w-6 h-6 rounded-full bg-orange-500 hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#120B1A] p-8">
              <h2 className="text-sm font-semibold text-white/90 mb-6">Localization</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-medium text-white/40 mb-2 uppercase tracking-wide">Language</label>
                  <div className="relative">
                    <select className="w-full bg-[#0A0512] border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-pink-500/50">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}

    </div>
  );
}
