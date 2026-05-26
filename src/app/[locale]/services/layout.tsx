import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Expert AI engineering and full-stack services: autonomous agent systems, RAG pipelines, predictive analytics, healthcare RCM automation, and enterprise architecture design.',
  alternates: {
    canonical: 'https://thanukaellepola.careers/services',
  },
  openGraph: {
    title: 'Services | Thanuka Ellepola — AI & Full-Stack Engineering',
    description: 'AI systems, data intelligence, enterprise engineering, and technical consulting services by Thanuka Ellepola.',
    url: 'https://thanukaellepola.careers/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
