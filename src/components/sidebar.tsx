
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

const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/experience', label: 'Experience', icon: Briefcase },
    { href: '/projects', label: 'Projects', icon: Code },
    { href: '/education', label: 'Education', icon: GraduationCap },
    { href: '/contact', label: 'Contact', icon: Mail },
    { href: '/seo', label: 'SEO Tool', icon: Sparkles },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:w-1/3 lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:border-r lg:border-border/60 bg-card lg:bg-background">
      <ScrollArea className="h-full">
        <div className="p-8 lg:p-12 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-4 mb-8">
                <Image
                  src="/Profile.png"
                  alt="Thanuka Ellepola"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                  priority
                  data-ai-hint="profile person"
                />
                <div>
                  <h1 className="text-2xl font-bold font-headline text-primary">Thanuka Ellepola</h1>
                  <h2 className="text-lg text-muted-foreground font-medium">Data Scientist | Full Stack Developer</h2>
                </div>
            </div>
             <p className="mt-4 text-muted-foreground">
                Driving innovation and insight at the intersection of data, AI, and business.
            </p>

            <nav className="hidden lg:block space-y-2 mt-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors',
                      isActive && 'text-primary bg-primary/10 font-semibold'
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
            <div className="space-y-2 text-sm">
              <a href="mailto:thanuka.ellepola@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary"><Mail size={16} /> thanuka.ellepola@gmail.com</a>
              <a href="tel:+94776705832" className="flex items-center gap-2 text-muted-foreground hover:text-primary"><Phone size={16} /> +94 77 670 5832</a>
              <p className="flex items-center gap-2 text-muted-foreground"><MapPin size={16} /> Sri Lanka</p>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1">
                 <a href="https://drive.google.com/file/d/1-qfFUhpeUF8G_uWDhASd9qj3DI0suTyT/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2" size={16} /> Download CV
                 </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/Thanuka9" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
