
import React from 'react';
import { Code, Briefcase, ExternalLink, Github, Database, BrainCircuit, BarChart3, LineChart, Zap, Search, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Innovations',
  description: 'A showcase of technical projects and research by Thanuka Ellepola, including CodeX, RevOps AI, CareerForge AI 3.0, and healthcare analytics.',
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
    description: `A B2B SaaS platform transforming Healthcare RCM through autonomous data auditing and predictive analytics. Built using an Autonomous Agent Architecture where specialized AI "Pods" (CEO, Engineering, Data/ML, DevOps) collaborate.
    
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
    • Market Scout: Real-time salary and trend fetching using Google Search Grounding to bypass static training data.
    • Dual-Model Strategy: Implements "Economy vs. Pro" toggles for optimized speed and reasoning accuracy.`,
    tags: ["React 19", "Gemini 3.1 Live", "Web Audio API", "SVG Visualization", "JSON Schema"],
    github: "https://github.com/Thanuka9",
    icon: BrainCircuit
  },
  {
    title: "Predictive Analytics for Payment Prediction in RCM",
    role: "Lead Data Scientist / Researcher",
    description: `Academic research introducing a multi-scenario predictive framework for healthcare finance. This study bridges the gap between academic ML models and real-world Revenue Cycle Management.

    Key Research Pillars:
    • Objectives: Forecast future payment likelihood, timing, and provider-based variations using a 3-year HIPAA-compliant dataset (~28,000+ records).
    • Methodology: Implemented feature engineering (behavioral indicators, payer mix, lags) and feature selection via Branch & Bound inspired approaches.
    • ML Models: Evaluated Random Forest, Neural Networks, and Decision Trees. Achieved R² > 0.90 for future payment prediction.
    • Insights: Demonstrated that while RF/NN excel at complex payment patterns, simpler linear models are superior for high-level revenue forecasting due to the bias-variance tradeoff.
    • Impact: Enables proactive RCM by prioritizing collections and supporting early intervention for high-risk accounts.`,
    tags: ["Python", "Pandas", "Scikit-learn", "Neural Networks", "Statistical Modeling", "HIPAA Compliance"],
    icon: LineChart
  },
  {
    title: "ReviewRadar AI: Smart Product Review Intelligence",
    role: "AI & Data Engineer",
    description: `End-to-end AI platform analyzing ~7M+ Yelp reviews to generate actionable sentiment insights and recommendations using a scalable production pipeline.

    Technical Architecture:
    • ETL Pipeline: Scalable ingestion from raw JSON to PostgreSQL using multi-threaded loading and batch inserts for 100% data integrity.
    • Feature Engineering: Advanced NLP pipeline (VADER sentiment, TF-IDF semantic terms) combined with temporal, geo-spatial (K-Means), and behavioral user features.
    • ML Ensemble: VotingClassifier (Logistic Regression, Random Forest, XGBoost) with Stratified K-Fold validation and RandomizedSearchCV tuning.
    • Production Design: Implemented chunked data loading, SVD dimensionality reduction, and memory-optimized training pipelines.
    • LLM Ready: Architected to support review summarization and automated Pros/Cons generation via Gemini integration.`,
    tags: ["Python", "XGBoost", "PostgreSQL", "spaCy", "VADER", "ETL", "Scikit-learn"],
    github: "https://github.com/Thanuka9/reviewradar_ai",
    icon: Search
  },
  {
    title: "Statistical Application: Advanced Modeling Tool",
    role: "Lead Developer",
    description: `Interactive web application for comprehensive statistical analysis and machine learning, designed for research and educational purposes.

    Key Capabilities:
    • Data Processing: Robust cleaning tools for missing value handling, outlier detection (IQR/Z-Score), and scaling.
    • Advanced Analysis: PCA for dimensionality reduction and Time-Series forecasting with rolling averages.
    • Inferential Stats: Automated T-Tests, ANOVA, Chi-Square, and non-parametric tests with full visualization.
    • ML Models: Full lifecycle support (Regression, Clustering, Classification) with interactive hyperparameter tuning and residual analysis.`,
    tags: ["Python", "Streamlit", "Plotly", "Scikit-learn", "SciPy"],
    github: "https://github.com/Thanuka9/Statistical-app",
    icon: BarChart3
  },
  {
    title: "Collective Intranet System",
    role: "Full Stack Developer",
    description: `Enterprise-grade RCM system that automates financial workflows, supports secure patient data management, and provides real-time analytics for healthcare operations.`,
    tags: ["Python", "Flask", "MongoDB", "JavaScript", "Azure"],
    icon: Database
  },
  {
    title: "Disaster Management System",
    role: "Lead Developer",
    description: `Critical incident response system designed to mitigate the impact of floods in Sri Lanka using SMS gateways and real-time location mapping.`,
    tags: ["Laravel", "PHP", "MySQL", "SMS Gateway"],
    icon: ShieldCheck
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-12 pb-16">
       <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Code size={36} /> Projects & Innovations
        </h1>
        <p className="mt-2 text-muted-foreground">Showcasing production-grade AI systems, full-stack platforms, and data research.</p>
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
