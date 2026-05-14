'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tablet, Smartphone, Monitor, RefreshCw, CheckCircle } from 'lucide-react';
import { Renderer } from '@/frontend/interface/canvas/Renderer';
import { WebsiteManifest } from '@auragen/schema';

export const LivePreview = ({ manifest }: { manifest: WebsiteManifest | null }) => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const deviceWidths = {
    mobile: '375px',
    tablet: '768px',
    desktop: '1000%',
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (!manifest) return (
    <div className="flex flex-col items-center justify-center h-[600px] bg-white/5 rounded-[40px] border border-dashed border-white/10">
      <RefreshCw size={40} className="text-white/10 animate-spin mb-4" />
      <p className="text-white/20">Waiting for AI to generate manifest...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 rounded-3xl border border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold">
            <CheckCircle size={14} />
            <span>Live Preview</span>
          </div>
          <span className="text-sm text-white/40">{manifest.title}</span>
        </div>

        {/* Device Toggler */}
        <div className="flex items-center gap-1 bg-black p-1 rounded-2xl border border-white/5">
          <DeviceButton 
            active={device === 'mobile'} 
            onClick={() => setDevice('mobile')} 
            icon={<Smartphone size={18} />} 
          />
          <DeviceButton 
            active={device === 'tablet'} 
            onClick={() => setDevice('tablet')} 
            icon={<Tablet size={18} />} 
          />
          <DeviceButton 
            active={device === 'desktop'} 
            onClick={() => setDevice('desktop')} 
            icon={<Monitor size={18} />} 
          />
        </div>

        <button 
          onClick={handleRefresh}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
        >
          <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Frame Wrapper */}
      <div className="flex-1 bg-[#111] rounded-[40px] overflow-hidden border border-white/10 relative">
        <div 
          className="mx-auto h-full transition-all duration-500 ease-in-out bg-black shadow-2xl"
          style={{ width: deviceWidths[device], maxWidth: '100%' }}
        >
          <div className="h-full overflow-y-auto custom-scrollbar">
            <Renderer manifest={manifest} />
          </div>
        </div>
        
        {/* Responsive Overlay Info */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-white/40 pointer-events-none">
          {device} View • {device === 'desktop' ? 'Fluid' : deviceWidths[device]}
        </div>
      </div>
    </div>
  );
};

const DeviceButton = ({ icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-xl transition-all ${active ? 'bg-white/10 text-primary shadow-lg' : 'text-white/20 hover:text-white'}`}
  >
    {icon}
  </button>
);
