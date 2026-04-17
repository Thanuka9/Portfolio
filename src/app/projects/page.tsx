import React from 'react';
import { Code, Briefcase, Github, Database, BrainCircuit, BarChart3, LineChart, Zap, Search, ShieldCheck, Activity, Globe, Lock, Server, Bot, Cpu, History, RefreshCw, ExternalLink, ArrowRight, Target, FlaskConical, TrendingUp, Quote } from "lucide-react";
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
    github: "https://github.com/Thanuka9",
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
  },
  {
    title: "CodeX: Competitive Coding & Algorithmic Practice",
    role: "Full Stack Developer & Algorithmic Researcher",
    summary: "A robust platform for high-performance algorithmic practice and competitive coding simulations.",
    challenge: "Traditional coding platforms often lack specialized local-first performance tracking and specialized practice modes for high-level data structures.",
    solution: "Built a specialized environment focusing on algorithmic efficiency, featuring real-time execution metrics and structural complexity analysis.",
    impact: "Created a dedicated space for mastering competitive programming paradigms, reducing the friction between theoretical complexity and actual implementation.",
    tags: ["C++", "Python", "Data Structures", "Algorithms", "Competitive Programming"],
    github: "https://github.com/Thanuka9",
    icon: Code
  },
  {
    title: "Disaster Management System: Centralized Response Hub",
    role: "System Designer & Lead Developer",
    summary: "Digitizing relief coordination and resource allocation during critical natural disasters.",
    challenge: "Coordination during natural disasters is often fragmented, leading to delayed relief and inefficient resource distribution.",
    solution: "Developed a centralized response platform integrating real-time reporting, resource tracking, and volunteer coordination modules.",
    impact: "Significantly improved information flow between relief centers and donors, ensuring that high-need areas received prioritized support based on data-backed insights.",
    tags: ["PHP", "MySQL", "JavaScript", "Response Automation", "Hub-Spoke Architecture"],
    github: "https://github.com/Thanuka9",
    icon: Globe
  },
  {
    title: "Statistical Application: Financial Forecast Modeling",
    role: "Statistical Researcher",
    summary: "Applying rigorous statistical methodologies to validate financial forecasting accuracy.",
    challenge: "Financial forecasts often fail due to improper validation of underlying statistical assumptions in high-volatility environments.",
    solution: "Engineered a specialized application for comparing predictive performance across various statistical models, incorporating sensitivity analysis and error distribution checks.",
    impact: "Provided a data-backed validation framework that identifies the limits of predictive modeling in volatile finance, ensuring more robust strategic decision-making.",
    tags: ["R", "Statistics", "Predictive Modeling", "Hypothesis Testing", "Data Analysis"],
    github: "https://github.com/Thanuka9",
    icon: BarChart3
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-24 pb-24 animate-reveal">
      <header className="space-y-6 text-center flex flex-col items-center">
        <h1 className="text-3xl lg:text-6xl font-black font-headline tracking-tighter leading-none">
          Strategic <span className="text-primary">Impacts.</span>
        </h1>
        <p className="text-2xl text-muted-foreground/80 max-w-3xl font-medium leading-relaxed">
          Case studies in AI engineering, data science, and enterprise architecture—focused on solving complex business bottlenecks.
        </p>
      </header>

      <div className="space-y-32">
        {projects.map((project, index) => (
          <div 
            key={project.title} 
            className="group relative animate-slide-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Project Number (Decorative) */}
            <div className="absolute -top-12 -left-4 text-9xl font-black opacity-[0.03] select-none pointer-events-none font-headline tracking-tighter">
              0{index + 1}
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
              {/* Sidebar Content */}
              <div className="lg:col-span-5 space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 glass-panel rounded-3xl flex items-center justify-center shrink-0 border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl">
                    <project.icon size={40} />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black font-headline leading-tight tracking-tight group-hover:text-primary transition-colors">{project.title}</h2>
                    <p className="text-primary font-bold text-lg uppercase tracking-widest">{project.role}</p>
                  </div>
                </div>

                <div className="space-y-10">
                   <div className="flex gap-6 group/item">
                     <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/10 group-hover/item:bg-primary transition-all">
                        <Target className="w-5 h-5 text-primary group-hover/item:text-primary-foreground" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover/item:text-foreground transition-colors">The Challenge</h3>
                        <p className="text-muted-foreground leading-relaxed font-medium">{project.challenge}</p>
                     </div>
                   </div>

                   <div className="flex gap-6 group/item">
                     <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/10 group-hover/item:bg-primary transition-all">
                        <FlaskConical className="w-5 h-5 text-primary group-hover/item:text-primary-foreground" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover/item:text-foreground transition-colors">The Solution</h3>
                        <p className="text-muted-foreground leading-relaxed font-medium">{project.solution}</p>
                     </div>
                   </div>

                   <div className="flex gap-6 group/item">
                     <div className="w-10 h-10 rounded-2xl bg-primary/30 flex items-center justify-center shrink-0 border border-primary/20 group-hover/item:bg-primary transition-all">
                        <TrendingUp className="w-5 h-5 text-primary group-hover/item:text-primary-foreground" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="font-black text-xs uppercase tracking-[0.2em] text-primary group-hover/item:text-foreground transition-colors">The Impact</h3>
                        <p className="text-foreground leading-relaxed font-bold italic">{project.impact}</p>
                     </div>
                   </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                    {project.demo && (
                        <Button variant="outline" size="lg" asChild className="rounded-2xl border-primary/20 hover:bg-primary/10 font-bold h-14 px-8 group">
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={20} className="mr-2 group-hover:scale-110 transition-transform" /> Live Case Study
                            </a>
                        </Button>
                    )}
                    {project.github && (
                        <Button variant="ghost" size="lg" asChild className="rounded-2xl font-bold h-14 px-8 hover:bg-background/80 group">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github size={20} className="mr-2 group-hover:scale-110 transition-transform" /> Repository
                            </a>
                        </Button>
                    )}
                </div>
              </div>

              {/* Main Content Card */}
              <div className="lg:col-span-7 relative p-1 lg:p-1.5 rounded-[4rem] bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/40 transition-all duration-700">
                <div className="bg-background/40 backdrop-blur-3xl rounded-[3.8rem] p-10 lg:p-16 h-full flex flex-col justify-between space-y-12">
                  <div className="space-y-8">
                    <Quote size={60} className="text-primary opacity-20" />
                    <p className="text-3xl italic leading-tight text-foreground/90 font-medium tracking-tight">
                      {project.summary}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="font-black text-xs uppercase tracking-[0.3em] text-primary">Technical Engine</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-5 py-2 rounded-xl glass-panel text-sm font-bold text-muted-foreground border-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500">
                          {tag}
                        </span>
                      ))}
                    </div>
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