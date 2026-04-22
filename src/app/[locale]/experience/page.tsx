import React from 'react';
import type { Metadata } from 'next';
import { ExperienceTimeline } from '@/components/experience-timeline';

export const metadata: Metadata = {
  title: 'Experience & Technical Expertise | Thanuka Ellepola',
  description: 'Detailed professional journey and technical skills of Thanuka Ellepola, specializing in Data Science, AI Engineering, and Enterprise Full-Stack Development.',
}

export default function ExperiencePage() {
  return (
    <ExperienceTimeline />
  );
}
