import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Sidebar from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'Thanuka Ellepola | Data Scientist & Full Stack Developer',
  description: 'Portfolio of Thanuka Ellepola, a Data Scientist and Full Stack Developer, showcasing expertise in transforming healthcare and business through data and technology. Explore projects in predictive analytics, revenue cycle management, and more.',
  keywords: "Thanuka Ellepola, Data Scientist, Full Stack Developer, Healthcare Analytics, Python, Sri Lanka, Revenue Cycle Management, Predictive Analytics, Business Analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col lg:flex-row">
          <Sidebar />
          <main className="w-full lg:w-2/3 lg:ml-[33.3333%] p-8 lg:p-16">
            <div className="w-full max-w-4xl mx-auto">
              {children}
            </div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
