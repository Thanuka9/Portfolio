import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a strategic consultation with Thanuka Ellepola — AI Architect & Data Scientist. Discuss AI integration, data strategy, or enterprise architecture for your business.',
  alternates: {
    canonical: 'https://thanukaellepola.com/en/contact',
  },
  openGraph: {
    title: 'Contact Thanuka Ellepola | Strategic Consultation',
    description: 'Book a consultation with an AI Architect specialising in autonomous agents, RAG pipelines, and enterprise AI solutions.',
    url: 'https://thanukaellepola.com/en/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
