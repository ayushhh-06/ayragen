'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  sectionType: string;
}

interface State {
  hasError: boolean;
}

export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[SectionError] ${this.props.sectionType}:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="py-12 px-6 border-2 border-dashed border-red-500/20 rounded-[32px] bg-red-500/5 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-8 h-8 text-red-500/40 mb-4" />
          <h3 className="text-sm font-bold text-red-500/60 uppercase tracking-widest">Section Render Failed</h3>
          <p className="text-[12px] text-red-500/30 mt-2">The AI-generated schema for "{this.props.sectionType}" contains invalid data.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
