'use client';

import React from 'react';
import { Sparkles, Moon, Sun, MonitorPlay, Droplet } from 'lucide-react';
import { PRESET_THEMES } from '@/themes/presets';

interface ThemeCustomizerProps {
  manifest: any;
  onUpdate: (manifest: any) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ manifest, onUpdate }) => {
  const currentPresetId = manifest?.theme?.preset || 'cinematic';

  const handlePresetChange = (presetId: string) => {
    const preset = PRESET_THEMES[presetId];
    if (!preset) return;
    
    onUpdate({
      ...manifest,
      theme: {
        preset: presetId,
        ...preset
      }
    });
  };

  const updateEffect = (key: string, value: any) => {
    onUpdate({
      ...manifest,
      theme: {
        ...manifest.theme,
        effects: {
          ...manifest.theme.effects,
          [key]: value
        }
      }
    });
  };

  return (
    <div className="space-y-10">
      
      {/* Preset Selector */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-label uppercase tracking-widest text-white/70">Cinematic Presets</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {Object.values(PRESET_THEMES).map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetChange(preset.id)}
              className={`relative overflow-hidden group p-4 rounded-2xl border text-left transition-all ${currentPresetId === preset.id ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(192,132,252,0.2)]' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: preset.colors.gradients[0] }} />
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: preset.colors.primary }} />
                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{preset.name}</span>
              </div>
              <span className="text-xs text-white/40 block capitalize">{preset.typography.heading.split(',')[0]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Effects Controls */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Droplet className="w-4 h-4 text-rose" />
          <h3 className="text-sm font-label uppercase tracking-widest text-white/70">Atmosphere</h3>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
            <div>
              <span className="text-sm font-bold block mb-1">Glassmorphism</span>
              <span className="text-xs text-white/40">Premium blurred panels</span>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${manifest?.theme?.effects?.glassmorphism ? 'bg-primary' : 'bg-white/10'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${manifest?.theme?.effects?.glassmorphism ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
            <input 
              type="checkbox" 
              className="hidden"
              checked={manifest?.theme?.effects?.glassmorphism || false}
              onChange={(e) => updateEffect('glassmorphism', e.target.checked)}
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
            <div>
              <span className="text-sm font-bold block mb-1">Cinematic Grain</span>
              <span className="text-xs text-white/40">Film noise overlay</span>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${manifest?.theme?.effects?.grain ? 'bg-primary' : 'bg-white/10'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${manifest?.theme?.effects?.grain ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
            <input 
              type="checkbox" 
              className="hidden"
              checked={manifest?.theme?.effects?.grain || false}
              onChange={(e) => updateEffect('grain', e.target.checked)}
            />
          </label>
        </div>
      </section>

      {/* Particle Controls */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Moon className="w-4 h-4 text-indigo" />
          <h3 className="text-sm font-label uppercase tracking-widest text-white/70">Particle System</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {['none', 'stars', 'floating', 'snow'].map((type) => (
            <button
              key={type}
              onClick={() => updateEffect('particles', type)}
              className={`p-3 rounded-xl border text-xs font-bold capitalize transition-all ${manifest?.theme?.effects?.particles === type ? 'border-indigo bg-indigo/20 text-white' : 'border-white/5 bg-white/[0.02] text-white/50 hover:bg-white/10 hover:text-white'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
