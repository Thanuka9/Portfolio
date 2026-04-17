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
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const PageShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[200] bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold"
      >
        Skip to main content
      </a>
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-white/5 z-[60] flex items-center justify-between px-6">
        <Link href="/" className="font-headline font-black tracking-tighter text-xl">
          Thanuka<span className="text-primary italic">.</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-all"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="min-h-screen relative z-10">
        <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
        
        <div className="transition-all duration-500 ease-in-out w-full lg:pl-[360px] pt-16 lg:pt-0">
          <Spotlight className="min-w-0 w-full min-h-screen flex flex-col">
            <main id="main-content" className="flex-grow flex flex-col items-center justify-center p-6 lg:p-12 xl:p-20 relative">
              <div className="w-full max-w-5xl flex flex-col min-h-full mx-auto">
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
      </div>
      <Toaster />
      <CookieConsent />
    </ThemeProvider>
  );
};
