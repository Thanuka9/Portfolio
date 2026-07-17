import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Case studies and project portfolio: AI job-hunting agents, healthcare predictive models, RCM automation systems, voice AI assistants, and enterprise software platforms.',
  alternates: {
    canonical: 'https://thanukaellepola.com/en/projects',
  },
  openGraph: {
    title: 'Projects & Case Studies | Thanuka Ellepola',
    description: 'Explore 15+ real-world AI and data engineering projects with measurable business impact.',
    url: 'https://thanukaellepola.com/en/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
