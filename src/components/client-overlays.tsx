'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const NeuralCanvas = dynamic(() => import('@/components/three-background').then(mod => mod.NeuralCanvas), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#060e20] -z-30" /> 
});

const CustomCursor = dynamic(() => import('@/components/custom-cursor'), { ssr: false });
const AIChatbox = dynamic(() => import('@/components/ai-chatbox').then(mod => mod.AIChatbox), { ssr: false });

export function ClientOverlays() {
  return (
    <>
      <NeuralCanvas />
      <CustomCursor />
      <AIChatbox />
    </>
  );
}
