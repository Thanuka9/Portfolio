
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

  return (
    <aside className="lg:w-1/3 lg:h-screen lg:fixed lg:top-0 lg:left-0 bg-background/80 backdrop-blur-3xl z-50 overflow-hidden lg:border-r border-border/50 shadow-2xl">
      <ScrollArea className="h-full">
        <div className="p-10 lg:p-14 flex flex-col justify-between min-h-screen">
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/0 blur-2xl group-hover:from-primary transition-all duration-700 opacity-30" />
                <Image
                  src={profileImage.src}
                  alt={profileImage.alt}
                  width={140}
                  height={140}
                  className="relative rounded-3xl border-2 border-primary/20 object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
                  priority
                  data-ai-hint={profileImage.hint}
                />
              </div>
              

              <div className="space-y-4">
                <h1 className="text-3xl font-black font-headline tracking-tighter text-foreground group-hover:text-primary transition-colors leading-[0.9]">
                  Thanuka Ellepola.
                </h1>
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground leading-tight">
                  AI Architect | Data Scientist | AI Engineer <br />
                  Lead Solutions Engineer | Strategic Consultant
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed font-medium text-lg">
                Architecting high-performance enterprise AI ecosystems and predictive platforms.
              </p>
            </div>

            <nav className="hidden lg:block space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500',
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/20 translate-x-2' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:translate-x-1'
                    )}
                  >
                    <link.icon size={20} className={cn(
                      'transition-all duration-500',
                      isActive ? 'rotate-0 scale-110' : 'group-hover:rotate-12 group-hover:scale-110'
                    )} />
                    <span className="font-bold tracking-tight">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-12 pt-12">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Connectivity</h4>
              <div className="space-y-4">
                <a href="mailto:thanuka.ellepola@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-border/50 group-hover:bg-primary/10 group-hover:scale-110 transition-all"><Mail size={16} /></div> 
                  <span className="text-sm font-bold truncate">thanuka.ellepola@gmail.com</span>
                </a>
                <a href="tel:+94776705832" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-border/50 group-hover:bg-primary/10 group-hover:scale-110 transition-all"><Phone size={16} /></div> 
                  <span className="text-sm font-bold">+94 77 670 5832</span>
                </a>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full font-black h-14 rounded-xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-base group/btn">
                 <Link href="/contact" className="flex items-center justify-center gap-2">
                    Book Strategy <Sparkles size={18} className="group-hover/btn:rotate-12 transition-transform" />
                 </Link>
              </Button>
              <div className="flex items-center justify-between gap-3 p-1.5 bg-secondary/40 backdrop-blur-xl rounded-2xl border border-border/50">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" asChild className="w-10 h-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all">
                    <a href="https://github.com/Thanuka9" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github size={18} />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="w-10 h-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all">
                    <a href="https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin size={18} />
                    </a>
                  </Button>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>

  );
}
