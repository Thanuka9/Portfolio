
import React from 'react';
import { Code, Briefcase, Github, Database, BrainCircuit, BarChart3, LineChart, Zap, Search, ShieldCheck, Activity, Globe, Lock, Server } from "lucide-react";
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
    title: "CodeX: Architecture Intelligence Engine",
    role: "Lead Architect & Developer",
    description: `A production-grade web application designed to "decode" any GitHub repository. It transforms raw code into a structured, visual "Code Wiki" with instant technical documentation and high-fidelity architecture diagrams.
    
    🏗️ Architecture & Structure:
    • Core UI Layer: Manages application lifecycle, Wiki-style deep links, and complex analysis state.
    • Service Layer: 
      - githubService.ts: Data acquisition engine with recursive tree fetching and multi-tier fallback (API → JsDelivr → Raw).
      - aiService.ts: Deep-context analysis using Gemini 3.1 Pro focusing on "Why" and "How".
      - graphEngine.ts: Custom static analysis parsing file relationships into Mermaid.js diagrams.
    • Smart Context Injection: Prioritizes "DNA files" (READMEs, manifests, entry points) for high signal-to-noise ratio.
    • Resilient Fetching: Fallback strategy to ensure 100% uptime and bypass GitHub API rate limits.`,
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
    • Interview Simulator: Low-latency, full-duplex voice interactions using Gemini 3.1 Flash Live API and Web Audio API.
    • Coding Lab: Real-time code evaluation for time/space complexity and style.
    • UI/UX: High-performance "Glassmorphism" interface with custom SVG-based data visualizations.`,
    tags: ["React 19", "Gemini 3.1 Live", "Web Audio API", "SVG Visualization", "JSON Schema"],
    github: "https://github.com/Thanuka9",
    icon: BrainCircuit
  },
  {
    title: "Collective Intranet System",
    role: "Full Stack Architect & Main Developer",
    description: `Enterprise internal platform for a healthcare RCM organization to centralize onboarding, training, task management, and admin reporting.
    
    Technical Highlights:
    • Hybrid Database: PostgreSQL (SQLAlchemy) for relational data and MongoDB (GridFS) for scalable document storage (PDFs, PPTs).
    • Workflow Logic: Training-and-progression system with company email validation, 2FA, approval gates, and timed exams.
    • Task Management: Admin-assigned client tasks with status milestones, automated notifications, and scheduled cleanup via APScheduler.
    • Enterprise Security: CSRF protection, Redis-based rate limiting, account lock logic, and secure session handling.
    • DevOps: GitHub Actions CI/CD with Azure Web App deployment and Flask-Migrate for schema management.`,
    tags: ["Python", "Flask", "PostgreSQL", "MongoDB", "Redis", "Azure", "CI/CD"],
    icon: Server
  },
  {
    title: "Predictive Analytics for Payment Prediction in RCM",
    role: "Lead Data Scientist / Researcher",
    description: `Comprehensive research on applying ML to forecast payment behaviors and optimize revenue flow in healthcare.
    
    🎯 Research Objectives:
    • Develop models for payment likelihood, provider variations, and location-based trends.
    • Analyze key drivers influencing payment behavior (Days since billing, Payer mix, Previous behavior).
    
    📊 Methodology:
    • Dataset: 3-year HIPAA-compliant dataset (~28,000+ records).
    • Feature Engineering: Payment history lags, rolling averages, and Branch & Bound inspired feature selection.
    • Models: Compared Linear Regression, Decision Trees, Random Forest, and Neural Networks.
    
    🔍 Key Findings:
    • Future Payment: Random Forest & Neural Networks achieved R² > 0.90.
    • Revenue Forecasting: Simpler linear models outperformed complex ones due to bias-variance tradeoffs on limited time-series data.
    • Location Trends: Used K-Means clustering to segment facilities and improve prediction accuracy.`,
    tags: ["Python", "Pandas", "Scikit-learn", "Neural Networks", "Statistical Modeling", "HIPAA"],
    icon: LineChart
  },
  {
    title: "ReviewRadar AI: Smart Review Intelligence",
    role: "AI & Data Engineer",
    description: `End-to-end AI platform analyzing ~7M+ Yelp reviews to generate actionable sentiment insights and recommendations.
    
    🏗️ System Architecture:
    • ETL Pipeline: Multi-threaded batch ingestion from raw JSON to PostgreSQL with dynamic schema filtering and foreign key validation.
    • Feature Engineering: 
      - Text: VADER sentiment scores and TF-IDF (Top 50 terms).
      - Temporal/Geo: Weekend/holiday indicators and Geo clustering (K-Means).
      - Behavioral: User retention modeling and business review density distribution.
    • Machine Learning: Ensemble VotingClassifier (Logistic Regression, RF, XGBoost) with Soft Voting and Stratified K-Fold validation.
    • LLM Layer: Design-ready architecture for review summarization and pros/cons generation.`,
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
    • Crisis Coordination: Centralized dashboard for disaster management units to coordinate field responses and monitor weather behavioral trends.
    • Impact: Provided a scalable solution for national-level emergency response coordination.`,
    tags: ["Laravel", "PHP", "MySQL", "SMS Gateway", "Geo-mapping"],
    icon: Globe
  },
  {
    title: "Statistical Application: Advanced Modeling Tool",
    role: "Lead Developer",
    description: `Interactive web application for comprehensive statistical analysis and machine learning.
    
    Features:
    • Data Processing: Robust cleaning tools for missing value handling (Mean/Median/Custom), outlier detection (IQR/Z-Score), and scaling.
    • Inferential Statistics: Interactive T-Tests, ANOVA, Chi-Square, and non-parametric alternatives with full visualization.
    • ML Lifecycle: Full support for Regression, Clustering (K-Means, DBSCAN), and PCA dimensionality reduction.
    • Dashboard: Dynamic visualizations using Plotly and Seaborn with interactive filtering and data export (CSV/Excel).`,
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
