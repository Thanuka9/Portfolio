'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '@/components/sidebar';
import Footer from '@/components/footer';
import { Spotlight } from '@/components/spotlight';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from 'next/navigation';
import { CookieConsent } from './cookie-consent';

export const PageShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // If we are on the home page, the sidebar is always "open" conceptually for the layout
  const isPushed = isSidebarOpen || pathname === '/';

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[200] bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold"
      >
        Skip to main content
      </a>
      <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] min-h-screen relative z-10 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
        
        <Spotlight className="min-w-0 w-full min-h-screen flex flex-col">
          <main id="main-content" className="flex-grow flex flex-col items-center justify-center p-6 lg:p-12 xl:p-20 relative">
            <div className="w-full max-w-6xl flex flex-col min-h-full">
              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
              <Footer />
            </div>
          </main>
        </Spotlight>
      </div>
      <Toaster />
      <CookieConsent />
    </ThemeProvider>
  );
};
