import { useState, useCallback } from 'react';
import { WebsiteManifest } from '@ayragen/schema';

/**
 * Hook to manage the lifecycle of a generated website manifest.
 * Handles the generation trigger, loading states, and manifest persistence.
 */
export const useManifest = () => {
  const [manifest, setManifest] = useState<WebsiteManifest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // In production, this calls the NestJS backend
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) throw new Error('Failed to generate website');
      
      const data = await response.json();
      setManifest(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { manifest, generate, isLoading, error };
};
