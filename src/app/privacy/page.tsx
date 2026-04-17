import React from 'react';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Thanuka Ellepola',
  description: 'Data protection and privacy policy for Thanuka Ellepola\'s professional portfolio.',
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Collection",
      content: "We only collect information that you voluntarily provide through the contact form, such as your name, email address, and project details. This information is used solely to respond to your inquiries and discussed strategic collaborations.",
      icon: Eye
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Your data is processed through secure channels like EmailJS.",
      icon: Lock
    },
    {
      title: "Cookies & Tracking",
      content: "This site uses minimal cookies to enhance the user experience, primarily for theme preferences (light/dark mode). We do not use persistent tracking or third-party marketing cookies.",
      icon: Shield
    },
    {
      title: "Third-Party Services",
      content: "Integration with modern platforms like EmailJS for form submission and Framer Motion for animations. These services maintain their own privacy policies regarding data handling.",
      icon: FileText
    }
  ];

  return (
    <div className="space-y-16 pb-24 animate-reveal">
      <header className="space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-primary text-xs font-bold tracking-wider uppercase animate-slide-up">
          <Shield size={16} /> 
          Legal & Compliance
        </div>
        <h1 className="text-4xl lg:text-7xl font-black font-headline tracking-tighter leading-none">
          Data Protection <br />
          <span className="text-primary italic">& Privacy.</span>
        </h1>
        <p className="text-xl text-muted-foreground/80 max-w-2xl font-medium leading-relaxed">
          Committed to maintaining the highest standards of data integrity and transparency in our strategic collaborations.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <div 
            key={section.title}
            className="group p-8 rounded-[2.5rem] glass-card animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
              <section.icon size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <footer className="pt-12 border-t border-border/50">
        <p className="text-sm text-muted-foreground font-medium">
          Last Updated: April 2026. For further inquiries, contact <a href="mailto:thanuka.ellepola@gmail.com" className="text-primary hover:underline">thanuka.ellepola@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}
