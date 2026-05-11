import { WebsiteManifest } from '@auragen/schema';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface GenerationState {
  isGenerating: boolean;
  step: 'analyzing' | 'planning' | 'designing' | 'synthesizing' | 'complete' | 'idle';
  progress: number;
  message: string;
  manifest: WebsiteManifest | null;
}
