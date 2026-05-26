import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles & Insights',
  description: 'Technical articles, engineering reports, and industry insights on autonomous AI agents, enterprise RAG architectures, and predictive analytics by Thanuka Ellepola.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
