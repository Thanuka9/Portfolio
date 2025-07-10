'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  const [year, setYear] = React.useState<number | string>('');

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card text-card-foreground border-t mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold font-headline text-primary">Thanuka Ellepola</h3>
            <p className="mt-2 text-muted-foreground max-w-md">
              Data Scientist & Full Stack Developer specializing in healthcare analytics, predictive modeling, and enterprise web applications. Transforming complex business challenges into innovative technological solutions.
            </p>
            <div className="mt-4 flex gap-2">
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="https://drive.google.com/file/d/1-qfFUhpeUF8G_uWDhASd9qj3DI0suTyT/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">
                  Get In Touch
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="/experience" className="text-muted-foreground hover:text-primary">Experience</Link></li>
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary">Projects</Link></li>
              <li><Link href="/education" className="text-muted-foreground hover:text-primary">Education</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:thanuka.ellepola@gmail.com" className="hover:text-primary">thanuka.ellepola@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+94776705832" className="hover:text-primary">+94 77 670 5832</a>
              </li>
               <li className="flex items-center gap-2">
                <Linkedin size={16} />
                <a href="https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn Profile</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {year} Thanuka Ellepola. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
             <p className="flex items-center gap-1.5">Crafted with <span className="text-red-500">&hearts;</span> for building innovative solutions</p>
             <div className="flex items-center gap-2">
                <a href="https://github.com/Thanuka9" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary"><Github size={18}/></a>
                <a href="mailto:thanuka.ellepola@gmail.com" aria-label="Email" className="hover:text-primary"><Mail size={18}/></a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
