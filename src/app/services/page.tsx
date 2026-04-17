
import React from 'react';
import { 
  Sparkles, 
  BarChart3, 
  Globe, 
  BrainCircuit, 
  Database, 
  Users, 
  ArrowRight, 
  Code2, 
  Layers, 
  Zap,
  LineChart,
  Settings,
  ShieldCheck,
  Bot
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
      "Custom Autonomous Agents (CEO, Eng, DevOps Pods)",
      "Gemini 3.1 & RAG pipeline implementation",
      "Low-latency Voice AI & Real-time Market Grounding",
      "Automated workflow reasoning and decision layers"
    ],
    accent: "text-accent"
  },
  {
    title: "Full-Stack Enterprise Development",
    icon: Code2,
    description: "Building resilient, high-performance platforms that scale with your operational complexity.",
    benefits: [
      "Modern React 19 & Next.js 15 Architectures",
      "Hybrid SQL/NoSQL Database Design (Postgres/Mongo)",
      "Secure Enterprise Intranets & Task Engines",
      "Zero-downtime CI/CD & Cloud Infrastructure (Azure/GCP)"
    ],
    accent: "text-primary"
  },
  {
    title: "Predictive Analytics & Data Science",
    icon: BarChart3,
    description: "Turning raw historical data into a statistically accurate roadmap for financial and operational growth.",
    benefits: [
      "Payment Behavior Forecasting (R² > 0.90)",
      "Healthcare Revenue Cycle Management (RCM) Optimization",
      "Sentiment Intelligence for Multi-million Record Datasets",
      "Executive Dashboards & Strategic KPI Visibility"
    ],
    accent: "text-accent"
  },
  {
    title: "Data Engineering & Infrastructure",
    icon: Database,
    description: "Designing the plumbing for modern AI: Scalable, clean, and automated data pipelines.",
    benefits: [
      "End-to-end ETL/ELT Pipeline Automation",
      "Multi-threaded Data Ingestion (JSON/SQL/API)",
      "Redis Cache Layer & Performance Optimization",
      "Distributed System Monitoring & Audit Logging"
    ],
    accent: "text-primary"
  }
];

export default function ServicesPage() {
  return (
    <div className="space-y-32 pb-24 animate-reveal">
      <header className="space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-primary text-xs font-bold tracking-wider uppercase animate-slide-up">
          <Sparkles size={16} /> 
          Available for Technical Consulting
        </div>
        <h1 className="text-4xl lg:text-7xl font-black font-headline tracking-tighter leading-none">
          Solutions for <br />
          <span className="text-primary italic">Intelligence.</span>
        </h1>
        <p className="text-2xl text-muted-foreground/80 max-w-3xl leading-relaxed font-medium">
          I provide specialized technical bridge-building for organizations that need to transform complex data into automated, measurable ROI.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div 
            key={service.title} 
            className="group relative p-1 rounded-[3.5rem] bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/30 transition-all duration-700 animate-slide-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="bg-background/40 backdrop-blur-3xl rounded-[3.4rem] p-10 lg:p-14 h-full flex flex-col justify-between space-y-12">
              <div className="space-y-10">
                <div className="flex items-start justify-between">
                  <div className="w-20 h-20 glass-panel rounded-3xl flex items-center justify-center border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl">
                    <service.icon size={36} />
                  </div>
                  <div className="text-6xl font-black opacity-[0.05] group-hover:opacity-[0.1] transition-opacity font-headline">
                    0{index + 1}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">{service.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">{service.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.3em] text-primary">Strategic Scope</h4>
                <ul className="space-y-4">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-4 group/item">
                      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary transition-all">
                        <ArrowRight size={12} className="text-primary group-hover/item:text-primary-foreground" />
                      </div>
                      <span className="text-muted-foreground font-bold text-sm leading-relaxed group-hover/item:text-foreground transition-colors">{benefit}</span>
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
          
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-black font-headline tracking-tighter leading-none">
              Need a <span className="text-primary italic">Technical Roadmap?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
              Whether you need an AI audit or a high-scale data platform, let's map out your architecture.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-black h-20 px-12 rounded-3xl shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 text-lg">
              <Link href="/contact" className="flex items-center gap-3">
                Book a Strategy Call <ArrowRight size={24} />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="font-black h-20 px-12 rounded-3xl hover:bg-background/50 border-primary/20 text-lg group">
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

