import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WebsiteManifest, Section } from '@auragen/schema';

export type GenerationStep = 'analyzing' | 'planning' | 'designing' | 'synthesizing' | 'complete' | 'idle';

export interface AtmosphereState {
  primaryColor: string;
  backgroundColor: string;
  blurStrength: number;
  grainIntensity: number;
  motionPacing: 'slow' | 'medium' | 'fast';
  vibe: string;
}

interface GenerationState {
  // Core State
  isGenerating: boolean;
  step: GenerationStep;
  stepMessage: string;
  manifest: WebsiteManifest | null;
  history: WebsiteManifest[];
  
  // Editor State
  selectedSectionId: string | null;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
  undoStack: WebsiteManifest[];
  redoStack: WebsiteManifest[];

  // Atmosphere (Adaptive UI)
  atmosphere: AtmosphereState;

  // Actions
  startGeneration: () => void;
  setStep: (step: GenerationStep, message: string) => void;
  setManifest: (manifest: WebsiteManifest) => void;
  updateManifest: (updater: (prev: WebsiteManifest) => WebsiteManifest) => void;
  resetGeneration: () => void;
  
  // Selection
  setSelectedSection: (id: string | null) => void;
  
  // Viewport
  setViewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  setZoom: (zoom: number) => void;
  
  // History
  undo: () => void;
  redo: () => void;
}

const DEFAULT_ATMOSPHERE: AtmosphereState = {
  primaryColor: '#c084fc',
  backgroundColor: '#050505',
  blurStrength: 20,
  grainIntensity: 0.03,
  motionPacing: 'medium',
  vibe: 'cinematic'
};

export const useGenerationStore = create<GenerationState>()(
  persist(
    (set, get) => ({
      isGenerating: false,
      step: 'idle',
      stepMessage: '',
      manifest: null,
      history: [],
      
      selectedSectionId: null,
      viewMode: 'desktop',
      zoom: 1,
      undoStack: [],
      redoStack: [],

      atmosphere: DEFAULT_ATMOSPHERE,

      startGeneration: () => set({ 
        isGenerating: true, 
        step: 'analyzing', 
        stepMessage: 'Igniting core intelligence...',
        manifest: null,
        selectedSectionId: null
      }),

      setStep: (step, message) => set({ step, stepMessage: message }),

      setManifest: (manifest) => {
        const currentManifest = get().manifest;
        
        // Derive atmosphere from manifest
        const atmosphere: AtmosphereState = {
          primaryColor: manifest.theme.colors.primary,
          backgroundColor: manifest.theme.colors.background,
          blurStrength: manifest.theme.effects.glassmorphism ? 40 : 10,
          grainIntensity: manifest.theme.effects.grain ? 0.05 : 0.01,
          motionPacing: manifest.emotionalTone.energy > 0.7 ? 'fast' : manifest.emotionalTone.energy < 0.4 ? 'slow' : 'medium',
          vibe: manifest.emotionalTone.vibe
        };

        set((state) => ({ 
          manifest, 
          atmosphere,
          isGenerating: false, 
          step: 'complete',
          history: [manifest, ...state.history].slice(0, 10),
          undoStack: currentManifest ? [...state.undoStack, currentManifest].slice(-20) : state.undoStack
        }));
      },

      updateManifest: (updater) => {
        const current = get().manifest;
        if (!current) return;
        
        const updated = updater(current);
        set((state) => ({
          manifest: updated,
          undoStack: [...state.undoStack, current].slice(-20),
          redoStack: []
        }));
      },

      setSelectedSection: (id) => set({ selectedSectionId: id }),
      setViewMode: (viewMode) => set({ viewMode }),
      setZoom: (zoom) => set({ zoom }),

      undo: () => {
        const { undoStack, manifest, redoStack } = get();
        if (undoStack.length === 0 || !manifest) return;
        
        const prev = undoStack[undoStack.length - 1];
        set({
          manifest: prev,
          undoStack: undoStack.slice(0, -1),
          redoStack: [manifest, ...redoStack]
        });
      },

      redo: () => {
        const { redoStack, manifest, undoStack } = get();
        if (redoStack.length === 0 || !manifest) return;
        
        const next = redoStack[0];
        set({
          manifest: next,
          redoStack: redoStack.slice(1),
          undoStack: [...undoStack, manifest]
        });
      },

      resetGeneration: () => set({ 
        isGenerating: false, 
        step: 'idle', 
        stepMessage: '', 
        manifest: null,
        selectedSectionId: null,
        atmosphere: DEFAULT_ATMOSPHERE
      }),
    }),
    {
      name: 'auragen-generation-storage',
      partialize: (state) => ({ history: state.history }),
    }
  )
);
