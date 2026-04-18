
import React from 'react';
import { 
  Sparkles, 
  BarChart3, 
  BrainCircuit, 
  Database, 
  ArrowRight, 
  Code2,
  ShieldCheck,
  Bot,
  Cpu,
  Search,
  Mic,
  Globe,
  Server,
  GitBranch,
  Key
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export const metadata = {
  title: 'Services & Strategic AI Consulting',
  description: 'Specialized services in AI Engineering, Data Science, Data Engineering, and Full Stack Development tailored for high-growth business outcomes.',
}

const services = [
  {
    title: "AI & Autonomous Systems",
    icon: Bot,
    description: "Architecting the next generation of business logic using multi-agent systems and real-time intelligence.",
    benefits: [
      { text: "Custom Autonomous Agent Architectures (CEO, Eng, & ML Pod pods)", icon: Cpu },
      { text: "LangChain-orchestrated RAG Pipelines with FAISS Vector Search", icon: Search },
      { text: "Low-latency Voice AI Simulations (Gemini Live API)", icon: Mic },
      { text: "Real-time Market Intelligence & Google Search Grounding", icon: Globe },
      { text: "Automated Discovery Engines with RAG-driven Personalization", icon: BrainCircuit },
      { text: "Agentic Auditing for identifying operational bottlenecks", icon: Sparkles },
    ],
    accent: "from-violet-500/20 to-cyan-500/20",
    accentBorder: "from-violet-500/40 to-cyan-500/20",
    number: "01"
  },
  {
    title: "Full-Stack Enterprise Development",
    icon: Code2,
    description: "Building resilient, high-performance platforms that scale with your operational complexity.",
    benefits: [
      { text: "Developed full-stack web applications using Flask, SQL, HTML, CSS, and JavaScript for internal enterprise operations", icon: Code2 },
      { text: "Implemented authentication (2FA), role-based access control, and performance dashboards", icon: Key },
      { text: "Designed backend APIs and optimized database architecture for scalability", icon: Server },
      { text: "Integrated structured data storage using MySQL/PostgreSQL", icon: Database },
      { text: "Managed high-availability hosting and automated CI/CD pipelines (GitHub Actions) for Azure/GCP", icon: GitBranch },
    ],
    accent: "from-primary/20 to-emerald-500/20",
    accentBorder: "from-primary/40 to-emerald-500/20",
    number: "02"
  },
  {
    title: "Predictive Analytics & Data Science",
    icon: BarChart3,
    description: "Turning raw historical data into a statistically accurate roadmap for financial and operational growth.",
    benefits: [
      { text: "Payment Behavior Forecasting (R² > 0.90)", icon: BarChart3 },
      { text: "Healthcare Revenue Cycle Management (RCM) Optimization", icon: Sparkles },
      { text: "Sentiment Intelligence for Multi-million Record Datasets", icon: BrainCircuit },
      { text: "Executive Dashboards & Strategic KPI Visibility", icon: Globe },
    ],
    accent: "from-pink-500/20 to-orange-500/20",
    accentBorder: "from-pink-500/40 to-orange-500/20",
    number: "03"
  },
  {
    title: "Data Engineering & Infrastructure",
    icon: Database,
    description: "Designing the plumbing for modern AI: Scalable, clean, and automated data pipelines.",
    benefits: [
      { text: "End-to-end ETL/ELT Pipeline Automation", icon: GitBranch },
      { text: "Multi-threaded Data Ingestion (JSON/SQL/API)", icon: Server },
      { text: "Redis Cache Layer & Performance Optimization", icon: Sparkles },
      { text: "Distributed System Monitoring & Audit Logging", icon: ShieldCheck },
    ],
    accent: "from-teal-500/20 to-blue-500/20",
    accentBorder: "from-teal-500/40 to-blue-500/20",
    number: "04"
  }
];

export default function ServicesPage() {
  return (
    <div className="space-y-32 pb-24 animate-reveal">
      <header className="space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-primary text-xs font-bold tracking-wider uppercase animate-slide-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Available for Technical Consulting
        </div>
        <h1 className="text-4xl lg:text-7xl font-black font-headline tracking-tighter leading-none">
          Solutions for <br />
          <span className="text-primary italic">Intelligence.</span>
        </h1>
        <p className="text-lg text-muted-foreground/80 max-w-3xl leading-relaxed font-medium">
          I provide specialized technical bridge-building for organizations that need to transform complex data into automated, measurable ROI.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div 
            key={service.title} 
            className={`group relative p-1 rounded-[3.5rem] bg-gradient-to-br ${service.accentBorder} hover:opacity-100 opacity-90 transition-all duration-700 animate-slide-up`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="bg-background/60 backdrop-blur-3xl rounded-[3.4rem] p-10 lg:p-14 h-full flex flex-col justify-between space-y-12">
              <div className="space-y-10">
                <div className="flex items-start justify-between">
                  <div className={`w-20 h-20 glass-panel rounded-3xl flex items-center justify-center border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl`}>
                    <service.icon size={36} />
                  </div>
                  <div className="text-6xl font-black opacity-[0.05] group-hover:opacity-[0.12] transition-opacity font-headline select-none">
                    {service.number}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl lg:text-3xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">{service.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{service.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <span className="w-4 h-px bg-primary/50"></span>
                  Strategic Scope
                </h4>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit.text} className="flex items-start gap-4 group/item">
                      <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary transition-all duration-300 border border-primary/10">
                        <benefit.icon size={12} className="text-primary group-hover/item:text-primary-foreground transition-colors" />
                      </div>
                      <span className="text-muted-foreground font-medium text-sm leading-relaxed group-hover/item:text-foreground transition-colors">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Section */}
      <section id="consulting-cta" className="relative group p-1 lg:p-2 rounded-[4rem] bg-gradient-to-br from-primary via-primary/50 to-primary/80 shadow-2xl animate-reveal">
        <div className="bg-background/95 backdrop-blur-3xl rounded-[3.8rem] py-20 lg:py-32 px-10 text-center space-y-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
          
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-black font-headline tracking-tighter leading-none">
              Need a <span className="text-primary italic">Technical Roadmap?</span>
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
              Whether you need an AI audit or a high-scale data platform, let's map out your architecture.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-black h-20 px-12 rounded-3xl shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 text-base">
              <Link href="/contact" className="flex items-center gap-3">
                Book a Strategy Call <ArrowRight size={24} />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="font-black h-20 px-12 rounded-3xl hover:bg-background/50 border-primary/20 text-base group">
              <Link href="/projects" className="flex items-center gap-2 text-foreground">
                Explore Case Studies <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
