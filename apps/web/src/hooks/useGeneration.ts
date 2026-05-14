'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGenerationStore } from '@/database/state/useGenerationStore';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3007';

export type GenerationStatus = 'idle' | 'processing' | 'complete' | 'error';

export const useGeneration = () => {
  const socketRef = useRef<Socket | null>(null);
  const { startGeneration, setStep, setManifest, manifest, step } = useGenerationStore();
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [currentStep, setCurrentStep] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Gracefully attempt socket connection — don't crash if backend is offline
    try {
      socketRef.current = io(`${SOCKET_URL}/generation`, {
        transports: ['websocket'],
        reconnection: false,
        timeout: 3000,
      });

      const socket = socketRef.current;

      socket.on('connect_error', () => {
        // Backend not running — silent fail, stay in idle
        console.warn('[AuraGen] Backend not connected. Running in offline mode.');
      });

      socket.on('generation_status', (data: { step: string; message: string }) => {
        setStep(data.step as any, data.message);
        setCurrentStep(data.message);
        setStatus('processing');
      });

      socket.on('generation_complete', (receivedManifest: any) => {
        setManifest(receivedManifest);
        setStatus('complete');
      });

      socket.on('generation_error', (err: { message: string }) => {
        setError(err.message);
        setStatus('error');
      });

      return () => {
        socket.disconnect();
      };
    } catch (e) {
      console.warn('[AuraGen] Socket initialization skipped.');
    }
  }, [setStep, setManifest]);

  const generate = (prompt: string) => {
    if (socketRef.current?.connected) {
      startGeneration();
      setStatus('processing');
      setCurrentStep('Analyzing your vision...');
      socketRef.current.emit('start_generation', { prompt });
    } else {
      // Offline demo mode: simulate generation
      startGeneration();
      setStatus('processing');
      const steps = [
        { step: 'analyzing', message: 'Sensing the emotion in your words...' },
        { step: 'planning', message: 'Architecting your cinematic universe...' },
        { step: 'designing', message: 'Curating colours, light, and atmosphere...' },
        { step: 'synthesizing', message: 'Weaving your story together...' },
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < steps.length) {
          setCurrentStep(steps[i].message);
          setStep(steps[i].step as any, steps[i].message);
          i++;
        } else {
          clearInterval(interval);
          // Demo manifest
          const demoManifest: any = {
            id: 'demo-' + Date.now(),
            title: prompt.slice(0, 40),
            description: prompt,
            emotionalTone: { primary: 'romantic', secondary: 'ethereal', vibe: 'cinematic', energy: 0.8 },
            theme: {
              colors: { primary: '#c084fc', background: '#040407', text: '#fafafa', accent: '#f9a8d4', gradients: ['linear-gradient(135deg, #c084fc, #f9a8d4)'] },
              typography: { heading: 'Playfair Display', body: 'Inter' },
              effects: { glassmorphism: true, particles: 'stars', animations: 'fluid', grain: true },
            },
            sections: [
              { id: 's1', type: 'hero', title: 'For the one I love', content: { subtitle: prompt }, order: 0 },
              { id: 's2', type: 'story-timeline', title: 'Our Journey', content: { items: [{ year: '2023', event: 'Where it all began.' }] }, order: 1 },
            ],
            metadata: { traceId: 'demo', generatedAt: new Date().toISOString() },
          };
          setManifest(demoManifest);
          setStatus('complete');
        }
      }, 1600);
    }
  };

  return { generate, status, currentStep, manifest, error };
};
