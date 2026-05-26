import React from 'react';
import { FileText, Scale, Copyright, AlertTriangle, Globe, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from "@/i18n/routing";

export default function TermsPage() {
  const lastUpdated = "May 26, 2026";

  const sections = [
    {
      icon: Globe,
      title: "Acceptance of Terms",
      content: `By accessing and using thanukaellepola.careers (the "Website"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please discontinue use of this Website immediately. These terms apply to all visitors, users, and others who access the Website.`,
    },
    {
      icon: FileText,
      title: "Permitted Use",
      content: `This Website is provided for informational and professional networking purposes only. You may browse, read, and share content from this Website for personal and non-commercial use. You may not reproduce, distribute, modify, or republish any content without prior written permission from Thanuka Ellepola. Automated scraping, crawling beyond standard search-engine indexing, or any form of data harvesting is strictly prohibited.`,
    },
    {
      icon: Copyright,
      title: "Intellectual Property",
      content: `All content on this Website — including but not limited to text, code samples, project descriptions, images, design elements, and branding — is the intellectual property of Thanuka Ellepola and is protected by applicable copyright and intellectual property laws. The source code of projects described on this Website remains the property of their respective organisations or authors unless otherwise stated. Open-source projects linked herein are governed by their own respective licences.`,
    },
    {
      icon: AlertTriangle,
      title: "Disclaimer of Warranties",
      content: `This Website and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. Thanuka Ellepola does not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components. The information on this Website is provided for general informational purposes and should not be construed as professional advice.`,
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content: `To the fullest extent permitted by law, Thanuka Ellepola shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this Website or its content. This includes but is not limited to loss of data, loss of profits, or business interruption. Your sole remedy for dissatisfaction with this Website is to cease using it.`,
    },
    {
      icon: ExternalLink,
      title: "Third-Party Links",
      content: `This Website may contain links to third-party websites including GitHub repositories, LinkedIn, and demonstration deployments. These links are provided for your convenience only. Thanuka Ellepola has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites. Accessing third-party links is entirely at your own risk.`,
    },
    {
      icon: Globe,
      title: "Governing Law",
      content: `These Terms and Conditions are governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka. If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
    },
    {
      icon: FileText,
      title: "Changes to Terms",
      content: `Thanuka Ellepola reserves the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting to the Website. Your continued use of the Website after any changes constitutes your acceptance of the new terms. It is your responsibility to review these terms periodically.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 animate-reveal">
      <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-12 font-bold group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Overview
      </Link>

      <div className="space-y-16">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-primary text-xs font-bold tracking-wider uppercase">
            <Scale size={12} />
            Legal Document
          </div>
          <h1 className="text-4xl lg:text-6xl font-black font-headline tracking-tighter">
            Terms &amp; <span className="text-primary italic">Conditions.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl">
            Please read these terms carefully before using this website. By continuing, you agree to be bound by these terms.
          </p>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/60">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="grid gap-6">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="group p-8 rounded-[2.5rem] glass-panel border-primary/10 hover:border-primary/30 transition-all"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 text-primary mt-0.5">
                  <section.icon size={22} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-lg font-black tracking-tight">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed font-medium text-sm">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="pt-12 border-t border-border/50 space-y-4">
          <p className="text-sm text-muted-foreground font-medium">
            For any questions regarding these Terms and Conditions, please reach out via the{' '}
            <Link href="/contact" className="text-primary hover:underline font-bold">Contact Page</Link>.
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            See also: <Link href="/privacy" className="text-primary hover:underline font-bold">Privacy Policy</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
