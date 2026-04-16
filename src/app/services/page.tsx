
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
    <div className="space-y-20 pb-16 animate-reveal">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-2">
          <Sparkles size={16} /> 
          <span>Available for Strategic Consulting</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold font-headline text-primary leading-tight">
          Solving Complex Bottlenecks with <span className="text-accent">Data & AI.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          I provide specialized technical expertise for organizations that need to bridge the gap between messy data and intelligent, automated outcomes. My work focuses on measurable ROI, security, and enterprise scalability.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={service.title} className="group border-none bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <CardHeader className="p-8">
              <div className={`w-14 h-14 rounded-2xl bg-background flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                <service.icon size={28} className={service.accent} />
              </div>
              <CardTitle className="text-2xl font-bold mb-2">{service.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Strategic Offerings</h4>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 group/item">
                    <ArrowRight size={14} className="text-accent mt-1 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="relative overflow-hidden bg-primary p-12 lg:p-20 rounded-[2rem] text-primary-foreground">
        <div className="relative z-10 space-y-8 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold font-headline leading-tight">Ready to architect your next breakthrough?</h2>
          <p className="text-lg lg:text-xl text-primary-foreground/80 leading-relaxed">
            Whether you need a full-scale AI agent architecture, a predictive RCM engine, or a high-performance data platform, let's discuss your roadmap.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 px-10 rounded-full shadow-lg">
              <Link href="/contact">
                Schedule a 15-Min Strategy Call <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground h-14 px-10 rounded-full">
              <Link href="/projects">View Case Studies</Link>
            </Button>
          </div>
        </div>
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
      </section>
    </div>
  );
}
