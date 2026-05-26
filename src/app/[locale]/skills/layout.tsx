import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills & Certifications',
  description: 'Explore Thanuka Ellepola\'s core technical competencies: Autonomous AI systems, predictive modeling, full-stack architecture, data engineering, and professional industry certifications.',
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
