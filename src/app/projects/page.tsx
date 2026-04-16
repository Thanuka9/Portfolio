import React from 'react';
import { Code, Briefcase, Github, Database, BrainCircuit, BarChart3, LineChart, Zap, Search, ShieldCheck, Activity, Globe, Lock, Server, Bot, Cpu, History, RefreshCw, ExternalLink, ArrowRight, Target, FlaskConical, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Strategic Project Impacts',
  description: 'Detailed case studies of AI systems, autonomous agents, and enterprise platforms focused on business outcomes.',
}

const projects = [
  {
    title: "AI Job Hunter: Autonomous Talent Acquisition System",
    role: "Lead AI Engineer & Architect",
    summary: "Built an autonomous system that reduces job application time by 90% through intelligent filtering and RAG-based personalization.",
    challenge: "The manual process of discovering, matching, and applying for high-signal opportunities is extremely inefficient and prone to low quality. Most automation tools use 'brute force' which results in poor outcomes.",
    solution: "Architected a multi-agent system using LangChain and Gemini 3.1. It features a decision layer that scores opportunities before applying, a RAG pipeline for dynamic context injection, and Playwright for human-like browser automation.",
    impact: "Created a high-fidelity system capable of processing 1000s of listings with zero manual intervention while maintaining a high match-signal. Successfully integrated a learning loop to fine-tune scoring over time.",
    tags: ["LangChain", "Gemini 3.1", "FAISS", "Playwright", "RAG", "Python"],
    github: "https://github.com/Thanuka9/Job-Hunter",
    demo: "https://codex-705252260340.us-west1.run.app/?repo=https%3A%2F%2Fgithub.com%2FThanuka9%2FJob-Hunter",
    icon: Bot
  },
  {
    title: "Predictive Analytics for Healthcare Payment Forecasting",
    role: "Lead Data Scientist / Researcher",
    summary: "Leveraging ML to forecast payment behaviors in RCM, achieving R² > 0.90 for financial prioritization.",
    challenge: "Healthcare revenue cycles are often reactive. Organizations struggle with delayed payments and high denial rates because they can't predict which claims are at risk.",
    solution: "Developed a proactive framework using Random Forest and Neural Networks on a 3-year dataset (~28k records). Implemented feature selection and rolling averages to capture non-linear financial patterns.",
    impact: "Achieved high predictive accuracy (R² > 0.90), allowing for early intervention on high-risk accounts and optimized resource allocation in collection workflows.",
    tags: ["Scikit-learn", "Neural Networks", "Pandas", "Healthcare RCM", "Statistical Modeling"],
    icon: LineChart
  },
  {
    title: "RevOps AI: Autonomous Data Auditing Platform",
    role: "System Architect & Full Stack Developer",
    summary: "A B2B SaaS transforming Healthcare RCM through autonomous data auditing and agentic pods.",
    challenge: "Billing errors and data hygiene issues cost healthcare providers millions. Manual auditing is slow, inconsistent, and unscalable.",
    solution: "Built a platform with an Autonomous Agent Architecture (CEO, Eng, ML Pods). It uses a specialized logic component to scan for architectural patterns and Scikit-learn models for payment forecasting.",
    impact: "Reduced manual audit effort by 40% and improved KPI visibility for financial controllers through real-time predictive dashboards.",
    tags: ["FastAPI", "React", "Scikit-learn", "Docker", "GCP", "Agentic AI"],
    github: "https://github.com/Thanuka9",
    icon: Zap
  },
  {
    title: "Collective Intranet: Enterprise Workflow Engine",
    role: "Full Stack Architect & Main Developer",
    summary: "A secure internal platform centralizing onboarding, training, and performance tracking for RCM teams.",
    challenge: "Managing a growing team across multiple RCM departments required a centralized, secure system for training, task management, and administrative reporting.",
    solution: "Engineered a hybrid SQL/NoSQL platform (Flask, PostgreSQL, MongoDB GridFS) with role-based access control, 2FA, and a timed assessment engine with automated scoring.",
    impact: "Centralized all enterprise workflows for a large healthcare team, ensuring a 95% certification pass rate and providing management with a single source of truth for employee progression.",
    tags: ["Flask", "PostgreSQL", "MongoDB", "Redis", "Azure", "CI/CD"],
    icon: Server
  },
  {
    title: "CareerForge AI 3.0: Voice-AI Career OS",
    role: "Full Stack AI Engineer",
    summary: "A multi-agent platform providing real-time market grounding and low-latency voice AI simulations.",
    challenge: "Job seekers lack realistic, real-time data and high-fidelity practice tools for competitive tech roles.",
    solution: "Built a multi-agent career OS featuring low-latency voice interactions (Gemini 3.1 Live API) and real-time market grounding using Google Search integration.",
    impact: "Enabled full-duplex voice practice and data-backed salary negotiation tools, providing users with a verifiable 'Market Scout' capability.",
    tags: ["React 19", "Gemini 3.1 Live API", "Web Audio API", "Google Search Grounding"],
    github: "https://github.com/Thanuka9",
    icon: BrainCircuit
  },
  {
    title: "ReviewRadar AI: Consumer Sentiment Intelligence",
    role: "AI & Data Engineer",
    summary: "Processing 7M+ reviews to generate actionable sentiment insights for business growth.",
    challenge: "Businesses struggle to extract actionable insights from massive volumes of unstructured customer feedback.",
    solution: "Developed an end-to-end sentiment intelligence platform with multi-threaded ETL pipelines, ensemble ML models, and VADER sentiment scores.",
    impact: "Created a scalable architecture capable of identifying service-level bottlenecks and category-specific sentiment trends across millions of records.",
    tags: ["Python", "XGBoost", "PostgreSQL", "ETL", "VADER", "spaCy"],
    github: "https://github.com/Thanuka9/reviewradar_ai",
    icon: Search
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-16 pb-16">
       <header className="space-y-4">
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Code size={36} /> Case Studies & Impacts
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Each project represents a specific business problem solved with a combination of AI, data science, and enterprise-grade engineering.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-16">
        {projects.map((project, index) => (
          <div 
            key={project.title} 
            className="group opacity-0 animate-fade-in transition-all duration-300"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <project.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-headline leading-tight">{project.title}</h2>
                    <p className="text-accent font-medium text-sm mt-1">{project.role}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                   <div className="flex gap-2">
                     <Target className="w-5 h-5 text-primary shrink-0 mt-1" />
                     <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">The Challenge</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm mt-1">{project.challenge}</p>
                     </div>
                   </div>
                   <div className="flex gap-2">
                     <FlaskConical className="w-5 h-5 text-primary shrink-0 mt-1" />
                     <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">The Solution</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm mt-1">{project.solution}</p>
                     </div>
                   </div>
                   <div className="flex gap-2">
                     <TrendingUp className="w-5 h-5 text-accent shrink-0 mt-1" />
                     <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider text-accent">The Impact</h3>
                        <p className="text-card-foreground leading-relaxed font-medium text-sm mt-1">{project.impact}</p>
                     </div>
                   </div>
                </div>

                <div className="flex gap-2 pt-4">
                    {project.demo && (
                        <Button variant="outline" size="sm" asChild className="rounded-full">
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={16} className="mr-2" /> Live Case
                            </a>
                        </Button>
                    )}
                    {project.github && (
                        <Button variant="outline" size="sm" asChild className="rounded-full">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github size={16} className="mr-2" /> GitHub
                            </a>
                        </Button>
                    )}
                </div>
              </div>

              <div className="md:col-span-7 bg-card border border-border/60 rounded-3xl p-8 space-y-6 self-stretch">
                <p className="text-muted-foreground italic leading-relaxed">
                  "{project.summary}"
                </p>
                <div className="space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 border-none px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
