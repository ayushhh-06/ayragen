'use client';

import { useGenerationStore } from '@/store/useGenerationStore';
import { DynamicRenderer } from '@/components/builder/DynamicRenderer';
import { Button } from '@/components/ui/Button';
import { 
  Settings, 
  Layers, 
  Palette, 
  Type, 
  ChevronLeft, 
  Eye, 
  Share2, 
  Save,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function ProjectEditor() {
  const { manifest } = useGenerationStore();

  return (
    <div className="flex h-screen bg-[#080808] overflow-hidden text-white">
      {/* Left Sidebar: Navigator */}
      <aside className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col">
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </Link>
          <span className="font-medium text-sm text-white/80 truncate">Navigator</span>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Sections</h3>
            <Button variant="ghost" size="icon" className="w-5 h-5"><Plus className="w-3 h-3" /></Button>
          </div>
          <div className="space-y-1">
            {manifest?.sections.map((section) => (
              <div 
                key={section.id} 
                className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-all"
              >
                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                  <Layers className="w-3 h-3 text-white/40" />
                </div>
                <span className="text-sm text-white/60 group-hover:text-white transition-colors">{section.type}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content: Canvas */}
      <main className="flex-1 flex flex-col relative">
        {/* Editor Toolbar */}
        <header className="h-14 border-b border-white/5 bg-black/20 flex items-center justify-between px-6">
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-medium text-white/60">Live Preview Active</span>
             </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2 text-white/40 hover:text-white">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button variant="premium" size="sm" className="gap-2 px-6">
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button variant="glass" size="sm" className="w-9 h-9 p-0">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Viewport Canvas */}
        <div className="flex-1 overflow-auto p-8 bg-[radial-gradient(circle_at_center,#111111_0%,#080808_100%)]">
          <div className="max-w-[1440px] mx-auto min-h-full border border-white/10 rounded-2xl bg-white/[0.02] shadow-2xl overflow-hidden">
            {manifest ? (
              <DynamicRenderer manifest={manifest} />
            ) : (
              <div className="h-full flex items-center justify-center italic text-white/10">
                No active project. Return to Dashboard to start generating.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Right Sidebar: Properties */}
      <aside className="w-80 border-l border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="font-medium text-sm text-white/80">Properties</span>
          <Settings className="w-4 h-4 text-white/30" />
        </div>

        <div className="p-6 space-y-8">
           <div>
             <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Design System</h3>
             <div className="grid grid-cols-2 gap-3">
               <Button variant="glass" size="sm" className="justify-start gap-2 h-10 px-3">
                 <Palette className="w-4 h-4 text-red-500" />
                 Colors
               </Button>
               <Button variant="glass" size="sm" className="justify-start gap-2 h-10 px-3">
                 <Type className="w-4 h-4 text-red-500" />
                 Fonts
               </Button>
             </div>
           </div>

           <div>
             <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Selected Section</h3>
             <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs text-white/30 italic">
               Select an element on the canvas to edit properties.
             </div>
           </div>
        </div>
      </aside>
    </div>
  );
}
