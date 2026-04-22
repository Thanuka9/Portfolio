import React from 'react';
import { Shield, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import { Link } from "@/i18n/routing";

export default function PrivacyPage() {
  const lastUpdated = "April 17, 2026";

  const sections = [
    {
      title: "Data Collection",
      icon: Eye,
      content: "I only collect information that you voluntarily provide via the contact form, such as your name, email address, and project details. This data is exclusively used to respond to your inquiries."
    },
    {
      title: "Spam Protection",
      icon: Shield,
      content: "The contact form utilizes honeypot technology and basic validation to prevent automated spam. No third-party tracking cookies are used for this purpose."
    },
    {
      title: "Data Security",
      icon: Lock,
      content: "All communications sent via this website are processed securely. I do not share, sell, or distribute your personal information to third parties unless required by law."
    },
    {
      title: "Cookie Policy",
      icon: FileText,
      content: "This site uses minimal essential cookies to manage theme preferences (dark/light mode). We do not use advertising or tracking cookies from third-party networks."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 animate-reveal">
      <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-12 font-bold group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Overview
      </Link>

      <div className="space-y-16">
        <header className="space-y-6">
          <h1 className="text-4xl lg:text-6xl font-black font-headline tracking-tighter">
            Privacy & <span className="text-primary italic">Compliance.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl">
            Transparency is the foundation of every professional collaboration. This policy outlines how I handle your data and maintain technical standards.
          </p>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/60">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="grid gap-8">
          {sections.map((section, index) => (
            <div 
              key={section.title}
              className="group p-8 rounded-[2.5rem] glass-panel border-primary/10 hover:border-primary/30 transition-all animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 text-primary">
                  <section.icon size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{section.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="pt-12 border-t border-border/50">
          <p className="text-sm text-muted-foreground font-medium">
            By using this website, you consent to the terms outlined above. For any questions regarding your data, please reach out via the <Link href="/contact" className="text-primary hover:underline">Contact Page</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}
