'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Code, GraduationCap, Mail, Download, Github, Linkedin, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/projects', label: 'Projects', icon: Code },
  { href: '/education', label: 'Education', icon: GraduationCap },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:w-1/3 lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:border-r lg:border-border/60 bg-card lg:bg-background">
      <ScrollArea className="h-full">
        <div className="p-8 lg:p-12 flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-col items-start mb-8">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src="/Profile.png"
                  alt="Thanuka Ellepola"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>
              <h1 className="text-4xl font-bold font-headline text-primary-foreground">Thanuka Ellepola</h1>
              <h2 className="text-xl text-primary font-medium">Data Scientist | Full Stack Developer</h2>
              <p className="mt-4 text-muted-foreground">
                Driving innovation and insight at the intersection of data, AI, and business.
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
                      'flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors',
                      isActive && 'text-primary bg-accent/50 font-semibold'
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
            <div className="flex items-center gap-4 mt-6">
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
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1">
                 <a href="https://drive.google.com/file/d/1-qfFUhpeUF8G_uWDhASd9qj3DI0suTyT/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2" size={16} /> Download CV
                 </a>
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
