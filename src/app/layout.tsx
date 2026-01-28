
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Sidebar from '@/components/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://thanukaellepola.careers'),
  title: {
    default: 'Thanuka Ellepola | Data Scientist, AI Engineer & Full Stack Developer',
    template: `%s | Thanuka Ellepola`,
  },
  description: 'The official portfolio for Thanuka Ellepola, a Data Scientist, AI Engineer, and Full Stack Developer based in Sri Lanka, who transforms complex business challenges into innovative technological solutions. Explore a proven track record in healthcare analytics, predictive modeling, and enterprise applications.',
  keywords: ["Thanuka Ellepola", "Ellepola", "Thanuka", "Data Scientist", "Full Stack Developer", "AI Engineer", "Data Engineer", "Healthcare Analytics", "Python", "SQL", "Power BI", "Predictive Analytics", "Machine Learning", "Sri Lanka", "Colombo", "revenue cycle management", "full-stack developer portfolio"],
  creator: 'Thanuka Ellepola',
  authors: [{ name: 'Thanuka Ellepola', url: 'https://thanukaellepola.careers/' }],
  verification: {
    google: 'ZQtbsNwZsL_u6jqqqC2oep-_N2sU-5RJ8IxgWrspGOI',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Thanuka Ellepola | Data Scientist, AI Engineer & Full Stack Developer',
    description: 'The official portfolio for Thanuka Ellepola, showcasing data science and full stack development projects.',
    url: 'https://thanukaellepola.careers/',
    siteName: 'Thanuka Ellepola Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateCreated: '2023-10-01T12:00:00-05:00',
  dateModified: new Date().toISOString(),
  mainEntity: {
    '@type': 'Person',
    name: 'Thanuka Ellepola',
    alternateName: 'Ellepola',
    url: 'https://thanukaellepola.careers/',
    jobTitle: 'Data Scientist, AI Engineer, & Full Stack Developer',
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
    knowsAbout: ["Data Science", "Full Stack Development", "AI Engineering", "Data Engineering", "Predictive Analytics", "Healthcare Analytics", "Revenue Cycle Management", "Python", "SQL", "Machine Learning", "Power BI", "React", "Next.js"]
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <div className="flex flex-col lg:flex-row">
            <Sidebar />
            <main className="w-full lg:w-2/3 lg:ml-[33.3333%] p-8 lg:p-16 animate-fade-in">
              <div className="w-full max-w-4xl mx-auto flex flex-col min-h-screen">
                <div className="flex-grow">
                  {children}
                </div>
                <Footer />
              </div>
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
