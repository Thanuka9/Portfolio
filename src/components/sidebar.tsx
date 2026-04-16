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
    { href: '/services', label: 'Services & Value', icon: Sparkles },
    { href: '/projects', label: 'Case Studies', icon: Code },
    { href: '/experience', label: 'Professional Impact', icon: Briefcase },
    { href: '/education', label: 'Academic Foundation', icon: GraduationCap },
    { href: '/contact', label: 'Work with Me', icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const profileImage = imageData.profile;

  return (
    <aside className="lg:w-1/3 lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:border-r lg:border-border/60 bg-card lg:bg-background">
      <ScrollArea className="h-full">
        <div className="p-8 lg:p-12 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-4 mb-8">
                <Image
                  src={profileImage.src}
                  alt={profileImage.alt}
                  width={profileImage.width}
                  height={profileImage.height}
                  className="rounded-full border-2 border-primary/20 object-cover"
                  priority
                  data-ai-hint={profileImage.hint}
                />
                <div>
                  <h1 className="text-2xl font-bold font-headline text-primary tracking-tight">Thanuka Ellepola</h1>
                  <h2 className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Solving Business Challenges with AI & Data</h2>
                </div>
            </div>
             <p className="mt-4 text-muted-foreground leading-relaxed">
                I help organizations transform complex data into revenue-driving AI systems and efficient full-stack platforms.
            </p>

            <nav className="hidden lg:block space-y-1.5 mt-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200',
                      isActive && 'text-primary bg-primary/10 font-semibold shadow-sm ring-1 ring-primary/20'
                    )}
                  >
                    <link.icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-8">
            <div className="space-y-3 text-sm">
              <a href="mailto:thanuka.ellepola@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail size={16} /> thanuka.ellepola@gmail.com
              </a>
              <a href="tel:+94776705832" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone size={16} /> +94 77 670 5832
              </a>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} /> Colombo, Sri Lanka (Available Globally)
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full font-semibold">
                 <Link href="/contact">
                    Schedule a Strategy Call
                 </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild className="hover:border-primary/50 hover:text-primary">
                  <a href="https://github.com/Thanuka9" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github size={20} />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="hover:border-primary/50 hover:text-primary">
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
