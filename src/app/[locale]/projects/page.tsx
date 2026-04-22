'use client';

import React from 'react';
import { Bot, LineChart, Zap, Server, BrainCircuit, Search, Code, Globe, BarChart3 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { ProjectsTimeline } from '@/components/projects-timeline';

export default function ProjectsPage() {
  const t = useTranslations('CaseStudies');

  const projectsList = [
    {
      title: t('p1.title'),
      role: t('p1.role'),
      summary: t('p1.summary'),
      challenge: t('p1.challenge'),
      solution: t('p1.solution'),
      impact: t('p1.impact'),
      tags: ["LangChain", "Gemini 3.1", "FAISS", "Playwright", "RAG", "Python"],
      github: "https://github.com/Thanuka9/Job-Hunter",
      demo: "https://codex-705252260340.us-west1.run.app/?repo=https%3A%2F%2Fgithub.com%2FThanuka9%2FJob-Hunter",
      icon: Bot
    },
    {
      title: t('p2.title'),
      role: t('p2.role'),
      summary: t('p2.summary'),
      challenge: t('p2.challenge'),
      solution: t('p2.solution'),
      impact: t('p2.impact'),
      tags: ["Scikit-learn", "Neural Networks", "Pandas", "Healthcare RCM", "Statistical Modeling"],
      icon: LineChart
    },
    {
      title: t('p3.title'),
      role: t('p3.role'),
      summary: t('p3.summary'),
      challenge: t('p3.challenge'),
      solution: t('p3.solution'),
      impact: t('p3.impact'),
      tags: ["FastAPI", "React", "Scikit-learn", "Docker", "GCP", "Agentic AI"],
      github: "https://github.com/Thanuka9",
      icon: Zap
    },
    {
      title: t('p4.title'),
      role: t('p4.role'),
      summary: t('p4.summary'),
      challenge: t('p4.challenge'),
      solution: t('p4.solution'),
      impact: t('p4.impact'),
      tags: ["Next.js", "PostgreSQL", "Flask", "Tailwind CSS", "Enterprise Architecture"],
      icon: Server
    },
    {
      title: t('p5.title'),
      role: t('p5.role'),
      summary: t('p5.summary'),
      challenge: t('p5.challenge'),
      solution: t('p5.solution'),
      impact: t('p5.impact'),
      tags: ["Gemini 3.1", "Next.js", "Web Speech API", "Voice AI", "Real-time Grounding"],
      icon: BrainCircuit
    },
    {
      title: t('p6.title'),
      role: t('p6.role'),
      summary: t('p6.summary'),
      challenge: t('p6.challenge'),
      solution: t('p6.solution'),
      impact: t('p6.impact'),
      tags: ["Python", "XGBoost", "PostgreSQL", "ETL", "Sentiment Analysis"],
      icon: Search
    },
    {
      title: t('p7.title'),
      role: t('p7.role'),
      summary: t('p7.summary'),
      challenge: t('p7.challenge'),
      solution: t('p7.solution'),
      impact: t('p7.impact'),
      tags: ["C++", "Python", "Algorithms", "Data Structures", "Competitive Coding"],
      icon: Code
    },
    {
      title: t('p8.title'),
      role: t('p8.role'),
      summary: t('p8.summary'),
      challenge: t('p8.challenge'),
      solution: t('p8.solution'),
      impact: t('p8.impact'),
      tags: ["PHP", "MySQL", "JavaScript", "Disaster Recovery", "System Design"],
      icon: Globe
    },
    {
      title: t('p9.title'),
      role: t('p9.role'),
      summary: t('p9.summary'),
      challenge: t('p9.challenge'),
      solution: t('p9.solution'),
      impact: t('p9.impact'),
      tags: ["R", "Statistics", "Predictive Modeling", "Hypothesis Testing", "Financial Analytics"],
      icon: BarChart3
    }
  ];

  return (
    <ProjectsTimeline 
      title={t('pageTitle')} 
      subtitle={t('pageSubtitle')} 
      projects={projectsList} 
    />
  );
}