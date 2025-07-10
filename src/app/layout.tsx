import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Sidebar from '@/components/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Thanuka Ellepola | Data Scientist & Full Stack Developer',
  description: 'Portfolio of Thanuka Ellepola, a Data Scientist and Full Stack Developer, showcasing expertise in transforming healthcare and business through data and technology. Explore projects in predictive analytics, revenue cycle management, and more.',
  keywords: "Thanuka Ellepola, Data Scientist, Full Stack Developer, Healthcare Analytics, Python, Sri Lanka, Revenue Cycle Management, Predictive Analytics, Business Analytics",
  creator: 'Thanuka Ellepola',
  authors: [{ name: 'Thanuka Ellepola', url: 'https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/' }],
  openGraph: {
    title: 'Thanuka Ellepola | Data Scientist & Full Stack Developer',
    description: 'Explore the portfolio of Thanuka Ellepola, showcasing data science and full stack development projects.',
    url: 'https://studio--ellepola-portfolio.us-central1.hosted.app/',
    siteName: 'Thanuka Ellepola Portfolio',
    images: [
      {
        url: '/og-image.png', // Update with a real image path
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
