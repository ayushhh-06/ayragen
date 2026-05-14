'use client';

import React from 'react';
import { Globe, ArrowUpRight, Copy, Terminal, CheckCircle2, Clock, GitBranch, RefreshCw } from 'lucide-react';

export default function DeploymentPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full pb-20">
      
      {/* Header Area */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-2">Deployment</h1>
          <p className="text-sm text-white/50">Manage your production environments and custom domains.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
          <Globe className="w-4 h-4" /> Add Domain
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Production Deployment Card */}
          <div className="rounded-3xl border border-white/10 bg-[#120B1A] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[60px] pointer-events-none" />
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h2 className="text-base font-semibold text-white/90">Production Deployment</h2>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 relative z-10">
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-[10px] font-medium text-white/40 uppercase tracking-wide mb-1">Domain</p>
                  <div className="flex items-center gap-2 text-white font-medium">
                    lovestory.auragen.site <a href="#" className="text-white/40 hover:text-white"><ArrowUpRight className="w-3 h-3" /></a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-medium text-white/40 uppercase tracking-wide mb-1">Status</p>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ready
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-white/40 uppercase tracking-wide mb-1">Last Deployed</p>
                    <p className="text-sm font-medium text-white">2 min ago</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-black/40 rounded-2xl p-6 border border-white/5 flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold text-white mb-2">v1.2.4</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-6">Current Version</p>
                <div className="flex gap-3 w-full">
                  <button className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors border border-white/10">Visit Site</button>
                  <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5" /> Redeploy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Domains */}
          <div className="rounded-3xl border border-white/10 bg-[#120B1A] p-8">
            <h2 className="text-base font-semibold text-white/90 mb-6">Custom Domains</h2>
            
            <div className="border border-white/10 rounded-xl bg-black/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white/50" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white flex items-center gap-2">
                    ourlovestory.com <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">Active</span>
                  </h3>
                  <p className="text-[11px] text-white/40">Redirects to lovestory.auragen.site</p>
                </div>
              </div>
              <button className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                <MoreHorizontalIcon />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Deployment History */}
          <div className="rounded-3xl border border-white/10 bg-[#120B1A] p-8">
            <h2 className="text-sm font-semibold text-white/90 mb-6">Deployment History</h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              
              <div className="relative flex items-start gap-4">
                <div className="absolute left-0 w-6 h-6 rounded-full bg-[#120B1A] flex items-center justify-center border-2 border-emerald-500 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="ml-10">
                  <p className="text-xs font-semibold text-white mb-0.5">Version v1.2.4</p>
                  <p className="text-[10px] text-white/40 mb-2">Deployed successfully</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                    <Clock className="w-3 h-3" /> 2 min ago
                  </div>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="absolute left-0 w-6 h-6 rounded-full bg-[#120B1A] flex items-center justify-center border-2 border-white/20 shrink-0">
                  <GitBranch className="w-3 h-3 text-white/50" />
                </div>
                <div className="ml-10">
                  <p className="text-xs font-semibold text-white mb-0.5">Version v1.2.3</p>
                  <p className="text-[10px] text-white/40 mb-2">Deployed successfully</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                    <Clock className="w-3 h-3" /> 1 day ago
                  </div>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="absolute left-0 w-6 h-6 rounded-full bg-[#120B1A] flex items-center justify-center border-2 border-white/20 shrink-0">
                  <GitBranch className="w-3 h-3 text-white/50" />
                </div>
                <div className="ml-10">
                  <p className="text-xs font-semibold text-white mb-0.5">Version v1.2.2</p>
                  <p className="text-[10px] text-white/40 mb-2">Deployed successfully</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                    <Clock className="w-3 h-3" /> 3 days ago
                  </div>
                </div>
              </div>

            </div>
            
            <button className="w-full mt-6 text-xs text-white/40 hover:text-white transition-colors text-center py-2">
              View all deployments
            </button>
          </div>

          {/* Build Logs Preview */}
          <div className="rounded-3xl border border-white/10 bg-[#120B1A] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2 bg-black/20">
              <Terminal className="w-4 h-4 text-white/50" />
              <h2 className="text-xs font-semibold text-white/70">Build Logs (v1.2.4)</h2>
            </div>
            <div className="p-6 font-mono text-[10px] text-white/40 leading-relaxed bg-[#05020A]">
              <p><span className="text-green-400">✓</span> Installing dependencies...</p>
              <p className="opacity-50">Done in 4.2s</p>
              <p><span className="text-green-400">✓</span> Compiling Next.js build...</p>
              <p className="opacity-50">Done in 12.1s</p>
              <p><span className="text-green-400">✓</span> Running post-build optimizations...</p>
              <p className="opacity-50">Done in 2.3s</p>
              <p className="text-white mt-2">✨ Deployment successful. Site is live.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function MoreHorizontalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
