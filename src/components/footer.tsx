'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-background overflow-hidden border-t border-primary/5 pt-20 pb-12">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <div className="md:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-black font-headline tracking-tighter text-foreground">
                Thanuka <span className="text-primary italic">Ellepola.</span>
              </h3>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-md">
                Bridging the gap between messy data and intelligent, automated outcomes through expert AI engineering and architectural thinking.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-8 rounded-2xl h-14 shadow-xl shadow-primary/10">
                <a href="https://drive.google.com/file/d/1H1b0lXTZ4gVZwm68Hl6S0nSAdiywi-jB/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  Download Credentials
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 font-black px-8 rounded-2xl h-14">
                <Link href="/contact">
                  Start Consultation
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Intelligence Hub</h4>
            <ul className="space-y-4">
              {[
                { label: 'Overview', href: '/' },
                { label: 'Strategic Value', href: '/services' },
                { label: 'Case Studies', href: '/projects' },
                { label: 'Professional Impact', href: '/experience' },
                { label: 'Academic Foundation', href: '/education' },
                { label: 'Privacy & Data Protection', href: '/privacy' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors font-bold tracking-tight">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Direct Access</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0 border border-border/50 group-hover:bg-primary/10 transition-all">
                  <Mail size={16} className="text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</p>
                  <a href="mailto:thanuka.ellepola@gmail.com" className="text-sm font-bold hover:text-primary break-all">thanuka.ellepola@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0 border border-border/50 group-hover:bg-primary/10 transition-all">
                  <Linkedin size={16} className="text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-primary">Professional Profile</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-24 pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-muted-foreground font-bold tracking-tight">
            &copy; {year} Thanuka Ellepola. Architecting the future of enterprise intelligence.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/10 text-xs font-black uppercase tracking-widest text-primary">
              <Sparkles size={14} /> Built for Impact
            </div>
            <div className="flex gap-4">
               <a href="https://github.com/Thanuka9" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110"><Github size={20}/></a>
               <a href="mailto:thanuka.ellepola@gmail.com" className="text-muted-foreground hover:text-primary transition-all hover:scale-110"><Mail size={20}/></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
