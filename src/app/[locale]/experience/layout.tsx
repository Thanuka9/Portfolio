import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience of Thanuka Ellepola — Data Scientist at the Central Bank of Sri Lanka, Founder of Veyra Labs, and a track record of enterprise AI architecture and digital transformation.',
  alternates: {
    canonical: 'https://thanukaellepola.com/en/experience',
  },
  openGraph: {
    title: 'Professional Experience | Thanuka Ellepola',
    description: 'Career timeline and impact metrics from AI engineering roles in healthcare, enterprise, and data science.',
    url: 'https://thanukaellepola.com/en/experience',
  },
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
