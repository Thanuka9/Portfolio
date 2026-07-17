
import React from 'react';
import type {Metadata} from 'next';
import { Inter, Outfit } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });


export const metadata: Metadata = {
  metadataBase: new URL('https://thanukaellepola.com'),
  title: {
    default: 'Thanuka Ellepola | AI Architect & Full-Stack Solutions',
    template: `%s | Thanuka Ellepola`,
  },
  description: 'AI Architect & Data Scientist specializing in autonomous agents, RAG architectures, predictive analytics, and enterprise engineering. Transforming complex data into scalable business assets with R² > 0.90 accuracy.',
  keywords: ["AI Architect", "Data Scientist", "AI Engineer", "Full Stack Developer", "Autonomous Agents", "RAG Pipeline", "Generative AI", "Predictive Modeling", "Healthcare Analytics", "RCM Automation", "Technical Consultant", "Enterprise Architecture"],
  creator: 'Thanuka Ellepola',
  authors: [{ name: 'Thanuka Ellepola', url: 'https://thanukaellepola.com/en' }],
  verification: {
    google: 'ZQtbsNwZsL_u6jqqqC2oep-_N2sU-5RJ8IxgWrspGOI',
  },
  alternates: {
    canonical: 'https://thanukaellepola.com/en',
  },
  openGraph: {
    title: 'Thanuka Ellepola | AI Architect & Full-Stack Solutions',
    description: 'Specialized AI Engineering and Full-Stack development for modern enterprises.',
    url: 'https://thanukaellepola.com/en',
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
  dateModified: '2026-04-17T12:00:00-05:00',
  mainEntity: {
    '@type': 'Person',
    name: 'Thanuka Ellepola',
    description: 'AI Architect, Data Scientist, and Full-Stack Engineer with a track record of building autonomous agents, optimizing RCM workflows, and deploying scalable enterprise AI solutions.',
    url: 'https://thanukaellepola.com/en',
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

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Thanuka Ellepola | AI Architect & Full-Stack solutions',
  url: 'https://thanukaellepola.com/en',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://thanukaellepola.com/en/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Overview',
      item: 'https://thanukaellepola.com/en'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Professional Impact',
      item: 'https://thanukaellepola.com/en/experience'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Case Studies',
      item: 'https://thanukaellepola.com/en/projects'
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Skills & Expertise',
      item: 'https://thanukaellepola.com/en/skills'
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Services & Strategic Value',
      item: 'https://thanukaellepola.com/en/services'
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'AI Labs (Simulations)',
      item: 'https://thanukaellepola.com/en/labs'
    },
    {
      '@type': 'ListItem',
      position: 7,
      name: 'Articles & Insights',
      item: 'https://thanukaellepola.com/en/blog'
    },
    {
      '@type': 'ListItem',
      position: 8,
      name: 'Academic Foundation',
      item: 'https://thanukaellepola.com/en/education'
    },
    {
      '@type': 'ListItem',
      position: 9,
      name: 'Strategic Inquiry',
      item: 'https://thanukaellepola.com/en/contact'
    }
  ]
};



import { ClientOverlays } from '@/components/client-overlays';

import { GlobalErrorBoundary } from '@/components/error-boundary';
import { Suspense } from 'react';
import { PageShell } from '@/components/page-shell';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-primary/20 bg-background text-foreground min-h-screen relative overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {/* Optimized Background Layering */}
          <div className="fixed inset-0 bg-background -z-30 transition-colors duration-500" />
          <div className="fixed inset-0 mesh-gradient opacity-[var(--mesh-opacity)] pointer-events-none -z-20 transition-opacity duration-500" />
          <ClientOverlays />
          
          <GlobalErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 bg-[#060e20] z-[100] flex items-center justify-center text-primary font-black animate-pulse uppercase tracking-[0.5em] text-xs">Synchronizing Neural Interface...</div>}>
              <PageShell>
                {children}
              </PageShell>
            </Suspense>
          </GlobalErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
