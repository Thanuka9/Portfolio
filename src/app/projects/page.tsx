
import React from 'react';
import { Code, Briefcase, Github, Database, BrainCircuit, BarChart3, LineChart, Zap, Search, ShieldCheck, Activity, Globe, Lock, Server, Bot, Cpu, History, RefreshCw, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Innovations | Professional Portfolio',
  description: 'Exhaustive technical showcase of AI systems, enterprise RCM platforms, and data science research by Thanuka Ellepola.',
}

const projects = [
  {
    title: "AI Job Hunter: Autonomous Job Application System",
    role: "Lead AI Engineer & Architect",
    description: `An end-to-end autonomous AI system designed to automate and optimize the job application lifecycle using RAG, vector search, and browser automation.

    🎯 Key Features:
    • Automated discovery from platforms like Greenhouse and Lever.
    • AI-based job matching using FAISS vector search and candidate embeddings.
    • Intelligent ranking agent assigning alignment scores to each opportunity.
    • Tailored response generation and automated submission via Playwright.
    • Continuous learning loop that captures application data for fine-tuning.

    🏗️ System Architecture:
    • Data Layer: Multi-platform scraper converting listings into structured data.
    • Intelligence Layer: Dynamic context retrieval from CV/Portfolio using FAISS.
    • Decision Layer: Ranking agent ensuring high-signal submissions only.
    • Execution Layer: Playwright-powered automation for hands-free applying.
    • Learning Loop: Feedback data collection for systemic optimization.`,
    tags: ["Python", "FAISS", "Playwright", "NLP", "Gemini 3.1", "Pandas", "RAG"],
    github: "https://github.com/Thanuka9/Job-Hunter",
    demo: "https://codex-705252260340.us-west1.run.app/?repo=https%3A%2F%2Fgithub.com%2FThanuka9%2FJob-Hunter",
    icon: Bot
  },
  {
    title: "CodeX: Architecture Intelligence Engine",
    role: "Lead Architect & Developer",
    description: `A production-grade web application designed to "decode" any GitHub repository. It transforms raw code into a structured, visual "Code Wiki" with instant technical documentation and high-fidelity architecture diagrams.
    
    🏗️ Architecture & Structure:
    • Core UI Layer: Manages application lifecycle, Wiki-style deep links, and complex analysis state.
    • Service Layer: 
      - githubService.ts: Data acquisition engine with recursive tree fetching and multi-tier fallback.
      - aiService.ts: Deep-context analysis using Gemini 3.1 Pro focusing on "Why" and "How".
      - graphEngine.ts: Custom static analysis parsing file relationships into Mermaid.js diagrams.
    • Smart Context Injection: Prioritizes "DNA files" (READMEs, manifests, entry points) for high signal-to-noise ratio.
    • Resilient Fetching: Fallback strategy (JsDelivr/Raw) to ensure 100% uptime.`,
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
    • Automated Data Auditing: Autonomous scanner identifying billing errors and missing data with custom heuristic logic.
    • Predictive Payment Forecasting: Scikit-learn regression models (Random Forest) to predict cash flow timelines.
    • CRM Integration: Direct API integration with Monday.com for seamless operational synchronization.
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
    • Agent Alpha (Resume Architect): Multimodal analysis using "Thinking" budget for deep candidate impact reasoning.
    • Agent Bravo (Market Scout): Real-time salary and trend fetching using Google Search Grounding.
    • Interview Simulator: Low-latency, full-duplex voice interactions using Gemini 3.1 Flash Live API.
    • Coding Lab: Real-time code evaluation for time/space complexity and style.
    • UI/UX: High-performance "Glassmorphism" interface with custom SVG data visualizations.`,
    tags: ["React 19", "Gemini 3.1 Live", "Web Audio API", "SVG Visualization", "JSON Schema"],
    github: "https://github.com/Thanuka9",
    icon: BrainCircuit
  },
  {
    title: "Collective Intranet System",
    role: "Full Stack Architect & Main Developer",
    description: `Enterprise internal platform built for a healthcare RCM environment to centralize onboarding, training, task management, and admin reporting.

    Technical Highlights:
    • Modular Architecture: Flask-based backend with blueprints for auth, study materials, exams, and tasks.
    • Hybrid Database: PostgreSQL (SQLAlchemy) for relational data and MongoDB (GridFS) for scalable document storage.
    • Progression Logic: Multi-tier training workflow with company email validation, 2FA, and timed assessments.
    • Task Management: Client-specific assignment engine with status milestones and automated cleanup.
    • Security: CSRF protection, Redis-based rate limiting, account lock logic, and secure session handling.`,
    tags: ["Python", "Flask", "PostgreSQL", "MongoDB", "Redis", "Azure", "CI/CD"],
    icon: Server
  },
  {
    title: "Predictive Analytics for Payment Prediction in RCM",
    role: "Lead Data Scientist / Researcher",
    description: `Comprehensive research on applying machine learning to forecast payment behaviors and optimize revenue flow in healthcare RCM.
    
    📊 Methodology & Research:
    • Dataset: 3-year HIPAA-compliant dataset (~28,000+ records).
    • Feature Engineering: Payment history lags, rolling averages, and Branch & Bound feature selection.
    • Model Scenarios:
      - Future Payment Prediction: Random Forest & Neural Networks (R² > 0.90).
      - Provider Variations: Analyzing non-linear revenue patterns (R² ≈ 0.29).
      - Location Trends: K-Means clustering to segment facility-specific behavior.
      - Revenue Forecasting: Linear Regression used to manage bias-variance tradeoffs on time-series data.`,
    tags: ["Python", "Pandas", "Scikit-learn", "Neural Networks", "Statistical Modeling", "HIPAA"],
    icon: LineChart
  },
  {
    title: "ReviewRadar AI: Smart Review Intelligence",
    role: "AI & Data Engineer",
    description: `End-to-end AI platform analyzing ~7M+ Yelp reviews to generate actionable sentiment insights and recommendations.
    
    🏗️ System Architecture:
    • ETL Pipeline: Multi-threaded batch ingestion from raw JSON to PostgreSQL with dynamic schema filtering.
    • Feature Engineering: VADER sentiment scores, TF-IDF semantic importance, and Geo-spatial clustering.
    • Machine Learning: Ensemble VotingClassifier combining Logistic Regression, Random Forest, and XGBoost.
    • Evaluation: Robust metrics including ROC-AUC, Precision-Recall curves, and Bootstrap confidence intervals.
    • Scalability: Designed with chunked data loading and SVD dimensionality reduction.`,
    tags: ["Python", "XGBoost", "PostgreSQL", "spaCy", "VADER", "ETL", "Scikit-learn"],
    github: "https://github.com/Thanuka9/reviewradar_ai",
    icon: Search
  },
  {
    title: "Disaster Management System",
    role: "Lead Developer",
    description: `Critical incident response system designed to mitigate the impact of floods in Sri Lanka through real-time mapping and mass communication.
    
    Key Capabilities:
    • Mass Alerting: Integrated SMS gateways for automated alerts to at-risk populations based on geo-fencing.
    • Incident Mapping: Real-time tracking for flood reports and resource allocation using mapping APIs.
    • Crisis Coordination: Centralized dashboard for disaster management units to coordinate field responses.`,
    tags: ["Laravel", "PHP", "MySQL", "SMS Gateway", "Geo-mapping"],
    icon: Globe
  },
  {
    title: "Statistical Application: Advanced Modeling Tool",
    role: "Lead Developer",
    description: `Interactive web application for comprehensive statistical analysis and machine learning lifecycle.
    
    Features:
    • Data Processing: Robust cleaning tools for missing values, outliers, and scaling.
    • Inferential Statistics: Interactive T-Tests, ANOVA, and Chi-Square with full visualization.
    • ML Lifecycle: Support for Regression, Clustering (K-Means, DBSCAN), and PCA reduction.
    • Dashboard: Dynamic visualizations using Plotly and Seaborn with interactive filtering.`,
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
        <p className="mt-2 text-muted-foreground">Detailed technical breakdown of production AI systems, enterprise platforms, and published data research.</p>
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
