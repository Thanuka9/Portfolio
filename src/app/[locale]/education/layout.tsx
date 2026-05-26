import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Academic background of Thanuka Ellepola — University of Colombo, certifications in AI, machine learning, cloud architecture, and data science.',
  alternates: {
    canonical: 'https://thanukaellepola.careers/education',
  },
  openGraph: {
    title: 'Education & Certifications | Thanuka Ellepola',
    description: 'Academic foundation and professional certifications in AI engineering, data science, and enterprise technology.',
    url: 'https://thanukaellepola.careers/education',
  },
};

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
