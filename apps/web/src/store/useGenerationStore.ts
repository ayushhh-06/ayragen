import { create } from 'zustand';

export type GenStep = 'idle' | 'analyzing' | 'planning' | 'designing' | 'synthesizing' | 'complete';

interface GenerationStore {
  isGenerating: boolean;
  step: GenStep;
  progress: number;
  message: string;
  manifest: any | null; // Avoids cross-package type resolution issues at store level

  setStep: (step: GenStep, message?: string) => void;
  setManifest: (manifest: any) => void;
  setProgress: (progress: number) => void;
  reset: () => void;
  startGeneration: () => void;
}

export const useGenerationStore = create<GenerationStore>((set) => ({
  isGenerating: false,
  step: 'idle',
  progress: 0,
  message: '',
  manifest: null,

  setStep: (step, message = '') => set({ step, message }),
  setManifest: (manifest) => set({ manifest, isGenerating: false, step: 'complete' }),
  setProgress: (progress) => set({ progress }),
  reset: () => set({ isGenerating: false, step: 'idle', progress: 0, message: '', manifest: null }),
  startGeneration: () => set({ isGenerating: true, step: 'analyzing', message: 'Analyzing your vision...', manifest: null }),
}));
