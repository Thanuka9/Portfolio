
import React from 'react';
import type {Metadata} from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });


export const metadata: Metadata = {
  metadataBase: new URL('https://thanukaellepola.careers'),
  title: {
    default: 'Thanuka Ellepola | AI Architect & Full-Stack Solutions',
    template: `%s | Thanuka Ellepola`,
  },
  description: 'AI Engineer & Full-Stack Developer specializing in autonomous agents, predictive analytics, and enterprise systems. Transforming complex data into intelligent, scalable business assets.',
  keywords: ["AI Engineer", "Data Scientist", "Full Stack Developer", "Autonomous Agents", "Generative AI", "Predictive Modeling", "Healthcare Analytics", "RCM Automation", "React 19", "Next.js", "Python", "Technical Consultant"],
  creator: 'Thanuka Ellepola',
  authors: [{ name: 'Thanuka Ellepola', url: 'https://thanukaellepola.careers/' }],
  verification: {
    google: 'ZQtbsNwZsL_u6jqqqC2oep-_N2sU-5RJ8IxgWrspGOI',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Thanuka Ellepola | AI Architect & Full-Stack Solutions',
    description: 'Specialized AI Engineering and Full-Stack development for modern enterprises.',
    url: 'https://thanukaellepola.careers/',
    siteName: 'Thanuka Ellepola Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Thanuka Ellepola Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thanuka Ellepola | AI Architect',
    description: 'Transforming complex data into intelligent business assets.',
    images: ['/twitter-image.png'],
  }
};

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateCreated: '2023-10-01T12:00:00-05:00',
  dateModified: '2026-04-17', // Use static date to prevent hydration mismatch
  mainEntity: {
    '@type': 'Person',
    name: 'Thanuka Ellepola',
    description: 'AI Architect, Data Scientist, and Full-Stack Engineer with a track record of building autonomous agents, optimizing RCM workflows, and deploying scalable enterprise AI solutions.',
    url: 'https://thanukaellepola.careers/',
    jobTitle: 'AI Architect & Full-Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Collective RCM (Pvt) Ltd',
    },
    alumniOf: 'University of Colombo',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Colombo',
      addressCountry: 'LK',
    },
    sameAs: [
      'https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/',
      'https://github.com/Thanuka9',
    ],
    knowsAbout: ["AI Engineering", "Generative AI", "Data Science", "Full Stack Development", "Predictive Analytics", "Healthcare Analytics", "Revenue Cycle Management", "Autonomous Agents", "Cloud Architecture"]
  }
};


import { NeuralBackground } from '@/components/neural-background';
import { PageShell } from '@/components/page-shell';
import { LanguageProvider } from '@/lib/language-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-primary/20 bg-background text-foreground min-h-screen relative overflow-x-hidden">
        <div className="fixed inset-0 mesh-gradient opacity-60 pointer-events-none -z-10" />
        <NeuralBackground />
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <LanguageProvider>
          <PageShell>
            {children}
          </PageShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
