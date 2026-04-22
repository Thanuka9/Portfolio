'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center space-y-8">
          <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center text-destructive animate-pulse">
            <AlertCircle size={48} />
          </div>
          <div className="space-y-4 max-w-md">
            <h1 className="text-3xl font-black font-headline tracking-tighter text-foreground">
              Neural Sync Interrupted.
            </h1>
            <p className="text-muted-foreground font-medium leading-relaxed">
              We encountered a runtime exception in the intelligence core. This could be due to a 3D rendering bottleneck or a state collision.
            </p>
          </div>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 px-8 rounded-xl shadow-xl"
          >
            <RefreshCcw className="mr-2" size={18} /> Reset System
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
