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
      <div className="flex flex-col lg:flex-row min-h-screen relative z-10 overflow-x-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
        
        <motion.div 
          animate={{ 
            x: isPushed ? '33.3333%' : 0,
            width: isPushed ? '66.6667%' : '100%'
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow min-h-screen"
        >
          <Spotlight className="w-full p-0 min-h-screen">
            <main id="main-content" className="p-6 lg:p-12 xl:p-20 relative">
              <div className="w-full max-w-5xl mx-auto flex flex-col min-h-screen">
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
        </motion.div>
      </div>
      <Toaster />
      <CookieConsent />
    </ThemeProvider>
  );
};
