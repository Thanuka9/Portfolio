
import React from 'react';
import { Code, Briefcase, ExternalLink, Github } from "lucide-react";
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
    description: `A production-grade web application designed to "decode" GitHub repositories. It transforms raw code into a structured, visual "Code Wiki" with instant technical documentation and high-fidelity architecture diagrams.
    
    Key Features:
    • Smart Context Injection: Prioritizes "DNA files" for AI to provide high signal-to-noise ratios.
    • GraphEngine: Custom static analysis parsing file relationships into Mermaid.js diagrams.
    • Multi-tier Fetching: Resilient strategy (GitHub API → JsDelivr) to ensure 100% uptime.
    • AI Insights: Deep-context analysis focusing on "Why" and "How" using Gemini 3.1 Pro.`,
    tags: ["React 18", "TypeScript", "Gemini 3.1 Pro", "Mermaid.js", "Tailwind CSS", "Vite"],
    github: "https://github.com/Thanuka9",
  },
  {
    title: "RevOps AI: Predictive Revenue Operations Platform",
    role: "System Architect & Full Stack Developer",
    description: `A B2B SaaS platform transforming Healthcare RCM through autonomous data auditing and predictive analytics. Uses an Autonomous Agent Architecture where specialized AI "Pods" (CEO, Engineering, Data/ML) collaborate.
    
    Key Features:
    • Automated Data Auditing: Autonomous scanner for billing errors and missing fields.
    • Payment Forecasting: Regression models (Random Forest) to predict cash flow timelines.
    • CRM Integration: Direct API integration with Monday.com for seamless operational sync.
    • Asynchronous Processing: Built on FastAPI for high-performance data handling.`,
    tags: ["FastAPI", "Python", "React", "Scikit-learn", "Docker", "GCP", "SQLAlchemy"],
    github: "https://github.com/Thanuka9",
  },
  {
    title: "CareerForge AI 3.0: Multi-Agent Career OS",
    role: "Full Stack AI Engineer",
    description: `An end-to-end career development platform designed to automate the end-to-end job-seeking process. Features a decentralized multi-agent approach powered by the Gemini 3.1 series.
    
    Key Features:
    • Live Audio Interaction: Low-latency interview simulation using Gemini 3.1 Flash Live API.
    • Resume Architect: Multimodal document analysis with "Thinking" budget reasoning.
    • Market Scout: Real-time salary and trend fetching using Google Search Grounding.
    • Custom Visualizations: SVG-based Radar charts and Gauges for hiring verdicts.`,
    tags: ["React 19", "Gemini 3.1 Live", "Web Audio API", "SVG Visualization", "JSON Schema"],
    github: "https://github.com/Thanuka9",
  },
  {
    title: "Predictive Analytics for Payment Prediction in RCM",
    role: "Lead Data Scientist / Researcher",
    description: `Academic thesis project explored predictive analytics in healthcare Revenue Cycle Management to forecast payment timelines. Developed and evaluated several machine learning models using historical hospital claims data to provide actionable insights for proactive revenue management.`,
    tags: ["Python", "Pandas", "Scikit-learn", "SQL", "Machine Learning"],
  },
  {
    title: "ReviewRadar AI",
    role: "AI Developer",
    description: `Intelligent sentiment analysis and review aggregation tool. It scrapes and analyzes customer reviews to provide deep market intelligence, identifying key themes, pain points, and competitive advantages using NLP.`,
    tags: ["Python", "NLP", "OpenAI API", "Web Scraping"],
    github: "https://github.com/Thanuka9/reviewradar_ai",
  },
  {
    title: "Statistical-app",
    role: "Lead Developer",
    description: `A comprehensive data analysis and statistical modeling tool built for research purposes. It provides a suite of tools for descriptive statistics, hypothesis testing, and predictive model evaluation with intuitive visualizations.`,
    tags: ["Python", "Streamlit", "Statistical Modeling", "Data Visualization"],
    github: "https://github.com/Thanuka9/Statistical-app",
  },
  {
    title: "Collective Intranet System",
    role: "Full Stack Developer",
    description: `Enterprise-grade RCM system that automates financial workflows, supports secure patient data management, and provides real-time analytics for healthcare operations.`,
    tags: ["Python", "Flask", "MongoDB", "JavaScript", "Azure"],
  },
  {
    title: "Disaster Management System",
    role: "Lead Developer",
    description: `Critical incident response system designed to mitigate the impact of floods in Sri Lanka using SMS gateways and real-time location mapping.`,
    tags: ["Laravel", "PHP", "MySQL", "SMS Gateway"],
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
                <div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-1 text-base font-medium">
                        <Briefcase size={16} className="text-muted-foreground" />
                        {project.role}
                    </CardDescription>
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
