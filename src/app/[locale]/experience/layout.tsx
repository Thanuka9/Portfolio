import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience of Thanuka Ellepola — Lead AI Architect at Collective RCM, data science engineering roles, and enterprise AI deployment history.',
  alternates: {
    canonical: 'https://thanukaellepola.careers/experience',
  },
  openGraph: {
    title: 'Professional Experience | Thanuka Ellepola',
    description: 'Career timeline and impact metrics from AI engineering roles in healthcare, enterprise, and data science.',
    url: 'https://thanukaellepola.careers/experience',
  },
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
