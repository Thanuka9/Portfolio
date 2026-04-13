
import React from 'react';
import { Code, Briefcase, Github, Database, BrainCircuit, BarChart3, LineChart, Zap, Search, ShieldCheck, Activity, Globe, Lock, Server, Bot, Cpu, History, RefreshCw, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Innovations | Professional Portfolio',
  description: 'Exhaustive technical showcase of AI systems, autonomous agents, enterprise RCM platforms, and data science research by Thanuka Ellepola.',
}

const projects = [
  {
    title: "AI Job Hunter: Autonomous Job Application System",
    role: "Lead AI Engineer & Architect",
    description: `An end-to-end autonomous AI system designed to automate and optimize the job application lifecycle using RAG, LangChain orchestration, and browser automation.

    🎯 Key Features:
    • Automated discovery from platforms like Greenhouse and Lever using specialized scrapers.
    • AI-based job matching using LangChain for RAG and FAISS for vector search.
    • Intelligent ranking agent assigning alignment scores to each opportunity.
    • Tailored response generation and automated submission via Playwright.
    • Continuous learning loop that captures application data for future fine-tuning.

    🏗️ System Architecture:
    • Data Layer: Multi-platform scraper converting raw listings into structured data.
    • Intelligence Layer: LangChain-powered RAG pipeline for dynamic context retrieval from CV/Portfolio using FAISS embeddings.
    • Decision Layer: Ranking agent ensuring high-signal submissions only.
    • Execution Layer: Playwright-powered automation for hands-free application submission.
    • Learning Loop: Feedback data collection for systemic optimization.`,
    tags: ["Python", "LangChain", "FAISS", "Playwright", "NLP", "Gemini 3.1", "Pandas", "RAG"],
    github: "https://github.com/Thanuka9/Job-Hunter",
    demo: "https://codex-705252260340.us-west1.run.app/?repo=https%3A%2F%2Fgithub.com%2FThanuka9%2FJob-Hunter",
    icon: Bot
  },
  {
    title: "CodeX: Architecture Intelligence Engine",
    role: "Lead Architect & Developer",
    description: `A production-grade web application designed to "decode" any GitHub repository. It provides instant technical documentation and visual architecture diagrams.
    
    🏗️ Architecture & Structure:
    • Core UI Layer: Manages application lifecycle and Wiki-style deep links.
    • Service Layer: 
      - githubService.ts: Data acquisition engine with recursive tree fetching and multi-tier fallback (GitHub API → JsDelivr → Raw Content).
      - aiService.ts: Deep-context analysis using Gemini 3.1 Pro focusing on "Why" and "How".
      - graphEngine.ts: Custom static analysis parsing file relationships into Mermaid.js diagrams.
    • Smart Context Injection: Prioritizes "DNA files" (READMEs, manifests, entry points) for high signal-to-noise ratio.`,
    tags: ["React 18", "TypeScript", "Gemini 3.1 Pro", "Mermaid.js", "Tailwind CSS", "Vite"],
    github: "https://github.com/Thanuka9",
    icon: Code
  },
  {
    title: "RevOps AI: Predictive Revenue Operations Platform",
    role: "System Architect & Full Stack Developer",
    description: `A B2B SaaS platform transforming Healthcare RCM through autonomous data auditing and predictive analytics. 
    
    🚀 Project Overview:
    • Autonomous Agent Architecture: Specialized AI "Pods" (CEO, Engineering, Data/ML, DevOps) collaborate to build and scale.
    • Automated Data Auditing: Autonomous scanner identifying billing errors with custom heuristic logic.
    • Predictive Payment Forecasting: Scikit-learn regression models to predict cash flow timelines.
    • Infrastructure: FastAPI backend, React/Vite frontend, Docker orchestration, and GCP deployment.`,
    tags: ["FastAPI", "Python", "React", "Scikit-learn", "Docker", "GCP", "SQLAlchemy"],
    github: "https://github.com/Thanuka9",
    icon: Zap
  },
  {
    title: "CareerForge AI 3.0: Multi-Agent Career OS",
    role: "Full Stack AI Engineer",
    description: `An advanced career development platform automating the end-to-end job-seeking process using a decentralized multi-agent approach.
    
    🏗️ Technical Architecture:
    • Agent Alpha (Resume Architect): Multimodal analysis using Gemini 3.1 Pro with deep candidate impact reasoning.
    • Agent Bravo (Market Scout): Real-time salary and trend fetching using Google Search Grounding.
    • Interview Simulator: Low-latency, full-duplex voice interactions using Gemini 3.1 Flash Live API.
    • UI/UX: High-performance "Glassmorphism" interface with custom SVG data visualizations.`,
    tags: ["React 19", "Gemini 3.1 Live", "Web Audio API", "SVG Visualization", "JSON Schema"],
    github: "https://github.com/Thanuka9",
    icon: BrainCircuit
  },
  {
    title: "Collective Intranet System",
    role: "Full Stack Architect & Main Developer",
    description: `Enterprise internal platform built for a healthcare RCM environment to centralize onboarding, training, and task management.

    Technical Highlights:
    • Modular Architecture: Flask-based backend with blueprints for auth, exams, and reporting.
    • Hybrid Database: PostgreSQL (SQLAlchemy) for relational data and MongoDB (GridFS) for scalable document storage.
    • Progression Logic: Multi-tier training workflow with 2FA and timed assessments.
    • Security: CSRF protection, Redis-based rate limiting, and account lock logic.`,
    tags: ["Python", "Flask", "PostgreSQL", "MongoDB", "Redis", "Azure", "CI/CD"],
    icon: Server
  },
  {
    title: "Predictive Analytics for Payment Prediction in RCM",
    role: "Lead Data Scientist / Researcher",
    description: `Comprehensive research on applying machine learning to forecast payment behaviors in healthcare RCM.
    
    📊 Methodology & Research:
    • Dataset: 3-year HIPAA-compliant dataset (~28,000+ records).
    • Feature Engineering: Payment history lags, rolling averages, and Branch & Bound feature selection.
    • Model Scenarios:
      - Future Payment Prediction: Random Forest & Neural Networks (R² > 0.90).
      - Provider Variations: Analyzing non-linear revenue patterns.
      - Location Trends: K-Means clustering to segment facility behavior.`,
    tags: ["Python", "Pandas", "Scikit-learn", "Neural Networks", "Statistical Modeling", "HIPAA"],
    icon: LineChart
  },
  {
    title: "ReviewRadar AI: Smart Review Intelligence",
    role: "AI & Data Engineer",
    description: `End-to-end AI platform analyzing ~7M+ reviews to generate actionable sentiment insights.
    
    🏗️ System Architecture:
    • ETL Pipeline: Multi-threaded batch ingestion from raw JSON to PostgreSQL.
    • Feature Engineering: VADER sentiment scores, TF-IDF semantic importance, and Geo-spatial clustering.
    • Machine Learning: Ensemble VotingClassifier combining Logistic Regression, Random Forest, and XGBoost.
    • Evaluation: ROC-AUC, Precision-Recall curves, and Bootstrap confidence intervals.`,
    tags: ["Python", "XGBoost", "PostgreSQL", "spaCy", "VADER", "ETL", "Scikit-learn"],
    github: "https://github.com/Thanuka9/reviewradar_ai",
    icon: Search
  },
  {
    title: "Disaster Management System",
    role: "Lead Developer",
    description: `Critical incident response system designed to mitigate the impact of floods in Sri Lanka.
    
    Key Capabilities:
    • Mass Alerting: Integrated SMS gateways for automated alerts based on geo-fencing.
    • Incident Mapping: Real-time tracking for flood reports and resource allocation.
    • Crisis Coordination: Centralized dashboard for disaster management units.`,
    tags: ["Laravel", "PHP", "MySQL", "SMS Gateway", "Geo-mapping"],
    icon: Globe
  },
  {
    title: "Statistical Application: Advanced Modeling Tool",
    role: "Lead Developer",
    description: `Interactive web application for comprehensive statistical analysis and machine learning lifecycle.
    
    Features:
    • Data Processing: Robust cleaning tools for missing values and outliers.
    • Inferential Statistics: Interactive T-Tests, ANOVA, and Chi-Square.
    • ML Lifecycle: Support for Regression, Clustering, and PCA.
    • Dashboard: Dynamic visualizations using Plotly and Seaborn.`,
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
        <p className="mt-2 text-muted-foreground">Detailed technical breakdown of production AI systems, autonomous agents, enterprise platforms, and published research.</p>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project, index) => (
          <Card 
            key={project.title} 
            className="opacity-0 animate-fade-in transition-all duration-300 hover:shadow-lg hover:border-primary h-full flex flex-col"
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
                <div className="flex items-center gap-2">
                    {project.demo && (
                        <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={20} />
                            </a>
                        </Button>
                    )}
                    {project.github && (
                        <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github size={20} />
                            </a>
                        </Button>
                    )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <div className="text-muted-foreground mb-6 whitespace-pre-line flex-grow leading-relaxed">
                  {project.description}
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary" className="px-3 py-1">{tag}</Badge>)}
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
