'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { Button } from './ui/button';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 right-8 z-[100] max-w-sm w-full"
        >
          <div className="glass-card p-6 border-primary/20 bg-background/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                <ShieldCheck size={20} />
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-lg">Privacy Consent</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use minimal cookies for theme persistence and essential interactivity. By continuing, you agree to our <a href="/privacy" className="text-primary hover:underline font-bold">Privacy Policy</a>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={accept} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl h-10 transition-all">
                    Acknowledge
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
