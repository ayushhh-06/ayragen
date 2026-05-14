'use client';

import { useEffect } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('AuraGen Critical Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-[#040408] text-white overflow-hidden selection:bg-rose-500/30">
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6 z-50">
          {/* Deep cinematic gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-red-900/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-lg p-12 rounded-[2.5rem] bg-black/60 border border-white/5 backdrop-blur-2xl shadow-2xl">
            <div className="w-20 h-20 mb-8 rounded-3xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <AlertTriangle className="w-10 h-10" />
            </div>

            <h1 className="text-4xl font-display font-bold mb-5 tracking-tight">
              System Disconnect
            </h1>
            
            <p className="text-white/40 text-lg leading-relaxed mb-12">
              A critical divergence occurred in the primary rendering sequence. 
              We need to perform a hard reset to restore the cinematic experience.
            </p>

            <button
              onClick={() => reset()}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
            >
              <RotateCcw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-700" />
              <span className="tracking-wide">Reboot Core Engine</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
