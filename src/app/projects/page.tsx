
import React from 'react';
import { Code, Briefcase, Github, Database, BrainCircuit, BarChart3, LineChart, Zap, Search, ShieldCheck, Activity, Globe, Lock, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Innovations',
  description: 'A showcase of technical projects and research by Thanuka Ellepola, including CodeX, RevOps AI, CareerForge AI 3.0, and enterprise healthcare platforms.',
}

const projects = [
  {
    title: "CodeX: Architecture Intelligence Engine",
    role: "Lead Architect & Developer",
    description: `A production-grade web application designed to "decode" any GitHub repository. It transforms raw code into a structured, visual "Code Wiki" with instant technical documentation and high-fidelity architecture diagrams.
    
    Key Innovations:
    • Smart Context Injection: Prioritizes "DNA files" (READMEs, manifests, entry points) to provide high signal-to-noise ratios for AI.
    • GraphEngine: Custom static analysis parsing file relationships into multiple Mermaid.js diagrams (System Architecture, Call Graphs, Data Flow).
    • Multi-tier Fetching: Resilient strategy (GitHub API → JsDelivr → Raw Content) to ensure 100% uptime and bypass rate limits.
    • AI Insights: Deep-context analysis using Gemini 3.1 Pro focusing on architectural "Why" and "How".`,
    tags: ["React 18", "TypeScript", "Gemini 3.1 Pro", "Mermaid.js", "Tailwind CSS", "Vite"],
    github: "https://github.com/Thanuka9",
    icon: Code
  },
  {
    title: "RevOps AI: Predictive Revenue Operations Platform",
    role: "System Architect & Full Stack Developer",
    description: `A B2B SaaS platform transforming Healthcare RCM through autonomous data auditing and predictive analytics. Built using an Autonomous Agent Architecture where specialized AI "Pods" collaborate.
    
    Key Features:
    • Automated Data Auditing: Autonomous scanner identifying missing data and billing errors with heuristic logic.
    • Payment Forecasting: Regression models (Random Forest) trained on historical data to predict cash flow timelines.
    • CRM Integration: Direct API integration with Monday.com for seamless operational synchronization.
    • Agentic Monitoring: "Founder’s Executive Suite" for real-time monitoring of AI agent health and status.`,
    tags: ["FastAPI", "Python", "React", "Scikit-learn", "Docker", "GCP", "SQLAlchemy"],
    github: "https://github.com/Thanuka9",
    icon: Zap
  },
  {
    title: "CareerForge AI 3.0: Multi-Agent Career OS",
    role: "Full Stack AI Engineer",
    description: `An advanced career development platform automating the end-to-end job-seeking process using a decentralized multi-agent approach powered by the Gemini 3.1 series.
    
    Key Features:
    • Live Audio Interaction: Low-latency interview simulation using Gemini 3.1 Flash Live API and Web Audio API.
    • Resume Architect: Multimodal document analysis with "Thinking" budget reasoning for deep candidate impact analysis.
    • Market Scout: Real-time salary and trend fetching using Google Search Grounding to bypass static training data.`,
    tags: ["React 19", "Gemini 3.1 Live", "Web Audio API", "SVG Visualization", "JSON Schema"],
    github: "https://github.com/Thanuka9",
    icon: BrainCircuit
  },
  {
    title: "Collective Intranet System",
    role: "Full Stack Architect & Main Developer",
    description: `Enterprise internal platform for a healthcare RCM organization to centralize onboarding, training, task management, and admin reporting.
    
    Technical Highlights:
    • Hybrid Database: Used PostgreSQL (SQLAlchemy) for relational business data and MongoDB (GridFS) for scalable document storage (PDFs, PPTs).
    • Workflow Logic: Built a complex training-and-progression system with approval gates, timed exams, and automated scoring rules.
    • Enterprise Security: Implemented 2FA, CSRF protection, Redis-based rate limiting, and account lock logic for high-security standards.
    • Operational Tools: Admin dashboards for performance analytics, audit-style login monitoring, and automated task cleanup via APScheduler.`,
    tags: ["Python", "Flask", "PostgreSQL", "MongoDB", "Redis", "Azure", "CI/CD"],
    icon: Server
  },
  {
    title: "Predictive Analytics for Payment Prediction in RCM",
    role: "Lead Data Scientist / Researcher",
    description: `Academic research introducing a multi-scenario predictive framework for healthcare finance. This study bridges the gap between academic ML models and real-world Revenue Cycle Management.

    Key Findings:
    • Achieved R² > 0.90 for future payment prediction using Random Forest and Neural Networks on a 3-year HIPAA-compliant dataset (~28k+ records).
    • Identified behavioral indicators and payer mix as primary drivers for payment likelihood.
    • Demonstrated that simpler linear models outperform complex ones for high-level revenue forecasting due to bias-variance tradeoffs.`,
    tags: ["Python", "Pandas", "Scikit-learn", "Neural Networks", "Statistical Modeling", "HIPAA"],
    icon: LineChart
  },
  {
    title: "ReviewRadar AI: Smart Review Intelligence",
    role: "AI & Data Engineer",
    description: `End-to-end AI platform analyzing ~7M+ Yelp reviews to generate actionable sentiment insights using a scalable production pipeline.

    Technical Architecture:
    • ETL Pipeline: Multi-threaded batch ingestion from raw JSON to PostgreSQL with 100% data integrity.
    • Feature Engineering: Advanced NLP pipeline (VADER sentiment, TF-IDF semantic terms) combined with geo-spatial clustering (K-Means).
    • ML Ensemble: VotingClassifier (Logistic Regression, Random Forest, XGBoost) with Stratified K-Fold validation.`,
    tags: ["Python", "XGBoost", "PostgreSQL", "spaCy", "VADER", "ETL", "Scikit-learn"],
    github: "https://github.com/Thanuka9/reviewradar_ai",
    icon: Search
  },
  {
    title: "Disaster Management System",
    role: "Lead Developer",
    description: `Critical incident response system designed to mitigate the impact of floods in Sri Lanka through real-time mapping and mass communication.
    
    Key Capabilities:
    • Mass Alerting: Integrated SMS gateways for automated emergency alerts to at-risk populations based on geo-fencing.
    • Incident Mapping: Real-time location tracking for flood reports and emergency resource allocation using mapping APIs.
    • Crisis Coordination: Centralized dashboard for disaster management units to coordinate field responses and monitor weather behavioral trends.`,
    tags: ["Laravel", "PHP", "MySQL", "SMS Gateway", "Geo-mapping"],
    icon: Globe
  },
  {
    title: "Statistical Application: Advanced Modeling Tool",
    role: "Lead Developer",
    description: `Interactive web application for comprehensive statistical analysis and machine learning, designed for research and educational purposes.
    
    Features:
    • Data Processing: Robust cleaning tools for missing value handling, outlier detection (IQR/Z-Score), and scaling.
    • ML Lifecycle: Full lifecycle support for Regression, Clustering, and Classification with interactive tuning.`,
    tags: ["Python", "Streamlit", "Plotly", "Scikit-learn", "SciPy"],
    github: "https://github.com/Thanuka9/Statistical-app",
    icon: BarChart3
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-12 pb-16">
       <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Code size={36} /> Projects & Innovations
        </h1>
        <p className="mt-2 text-muted-foreground">Showcasing production-grade AI systems, enterprise platforms, and data research.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <Card 
            key={project.title} 
            className="opacity-0 animate-fade-in transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary h-full flex flex-col"
            style={{ animationDelay: `${index * 150}ms` }}
            >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">{project.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 pt-1 text-base font-medium">
                            <Briefcase size={16} className="text-muted-foreground" />
                            {project.role}
                        </CardDescription>
                    </div>
                </div>
                {project.github && (
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                        </a>
                    </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground mb-6 whitespace-pre-line flex-grow leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary" className="px-3 py-1">{tag}</Badge>)}
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
