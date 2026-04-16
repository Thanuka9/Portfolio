'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Code, GraduationCap, Mail, Download, Github, Linkedin, Phone, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from './theme-toggle';
import imageData from '@/lib/placeholder-images.json';

const navLinks = [
    { href: '/', label: 'Overview', icon: Home },
    { href: '/services', label: 'Services & Strategic Value', icon: Sparkles },
    { href: '/projects', label: 'Case Studies', icon: Code },
    { href: '/experience', label: 'Professional Impact', icon: Briefcase },
    { href: '/education', label: 'Academic Foundation', icon: GraduationCap },
    { href: '/contact', label: 'Work with Me', icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const profileImage = imageData.profile;
  const schedulingUrl = "https://calendly.com/thanuka-ellepola";

  return (
    <aside className="lg:w-1/3 lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:border-r lg:border-border/60 bg-card lg:bg-background z-50">
      <ScrollArea className="h-full">
        <div className="p-8 lg:p-12 flex flex-col justify-between min-h-screen">
          <div>
            <div className="flex items-center gap-4 mb-8">
                <Image
                  src={profileImage.src}
                  alt={profileImage.alt}
                  width={profileImage.width}
                  height={profileImage.height}
                  className="rounded-full border-2 border-accent/20 object-cover shadow-sm"
                  priority
                  data-ai-hint={profileImage.hint}
                />
                <div>
                  <h1 className="text-2xl font-bold font-headline text-primary tracking-tight">Thanuka Ellepola</h1>
                  <h2 className="text-xs text-accent font-bold uppercase tracking-widest">AI • Fullstack • Data Science</h2>
                </div>
            </div>
             <p className="mt-4 text-muted-foreground leading-relaxed text-sm lg:text-base font-medium">
                Helping organizations bridge the gap between complex data and high-performance, automated intelligence.
            </p>

            <nav className="hidden lg:block space-y-1.5 mt-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-200 group',
                      isActive && 'text-primary bg-secondary/80 font-semibold shadow-sm ring-1 ring-border'
                    )}
                  >
                    <link.icon size={18} className={cn(isActive ? 'text-accent' : 'group-hover:text-accent transition-colors')} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-12 space-y-8">
            <div className="space-y-4 text-sm">
              <a href="mailto:thanuka.ellepola@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"><Mail size={14} /></div> thanuka.ellepola@gmail.com
              </a>
              <a href="tel:+94776705832" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"><Phone size={14} /></div> +94 77 670 5832
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"><MapPin size={14} /></div> Colombo, Sri Lanka
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full font-bold h-12 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
                 <a href={schedulingUrl} target="_blank" rel="noopener noreferrer">
                    Book a Strategy Call
                 </a>
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild className="rounded-xl hover:border-accent hover:text-accent transition-all">
                  <a href="https://github.com/Thanuka9" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github size={20} />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-xl hover:border-accent hover:text-accent transition-all">
                  <a href="https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}