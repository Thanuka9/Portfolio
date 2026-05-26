'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Download, Shield, Database, Layout, Sparkles, Award, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  skills: Skill[];
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
  badgeColor: string;
}

export default function SkillsPage() {
  const categories: SkillCategory[] = [
    {
      title: 'AI & Autonomous Systems',
      icon: Cpu,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      skills: [
        { name: 'Multi-Agent Architectures (LangChain/LangGraph)', level: 95 },
        { name: 'RAG Pipelines & Vector Search (FAISS, Milvus)', level: 92 },
        { name: 'Large Language Models (Gemini Live API, GPT-4)', level: 94 },
        { name: 'Agentic Tool-Calling & Autonomous Planning', level: 90 },
      ]
    },
    {
      title: 'Data Science & Machine Learning',
      icon: Database,
      color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400',
      skills: [
        { name: 'Predictive Modeling & Statistical Forecasting', level: 95 },
        { name: 'Supervised Learning (Random Forest, XGBoost)', level: 93 },
        { name: 'Deep Learning (Neural Networks, PyTorch)', level: 88 },
        { name: 'Data Engineering & ETL Automation', level: 90 },
      ]
    },
    {
      title: 'Full-Stack Engineering',
      icon: Layout,
      color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400',
      skills: [
        { name: 'Next.js, React & TypeScript', level: 92 },
        { name: 'Backend Architectures (Python Flask, Node.js)', level: 94 },
        { name: 'Databases (PostgreSQL, MongoDB, MySQL)', level: 90 },
        { name: 'State Management & API Design (REST, GraphQL)', level: 88 },
      ]
    },
    {
      title: 'Security & DevOps',
      icon: Shield,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
      skills: [
        { name: 'High-Security Architectures (2FA, Encryption)', level: 93 },
        { name: 'Rate Limiting & Threat Mitigation (Redis)', level: 90 },
        { name: 'CI/CD Pipelines & Devops (GitHub Actions)', level: 88 },
        { name: 'Cloud Services (AWS, Azure Web Apps)', level: 85 },
      ]
    }
  ];

  const certifications: Certification[] = [
    {
      title: 'Google Data Analytics Professional Certificate',
      issuer: 'Google (Coursera)',
      date: '2026',
      link: 'https://coursera.org/verify/professional-cert/google-data-analytics',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      title: 'Game Theory',
      issuer: 'Stanford University (Coursera)',
      date: '2026',
      link: 'https://coursera.org/verify/game-theory',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    {
      title: 'CCNA (Cisco Certified Network Associate)',
      issuer: 'Cisco',
      date: '2023',
      link: 'https://www.credly.com',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    }
  ];

  const resumeLink = "https://drive.google.com/file/d/1H1b0lXTZ4gVZwm68Hl6S0nSAdiywi-jB/view?usp=sharing";

  return (
    <div className="max-w-7xl mx-auto py-24 px-8 lg:px-12 animate-reveal">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-primary text-xs font-black tracking-wider uppercase">
            <Cpu size={12} />
            Capability Matrix
          </div>
          <h1 className="text-4xl lg:text-7xl font-black font-headline tracking-tighter leading-none">
            Skills &amp; <span className="text-primary italic">Expertise.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed">
            Deconstructing the professional technical capability stack spanning enterprise AI orchestrators, neural predictors, and production-grade full-stack ecosystems.
          </p>
        </div>
        
        <div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-8 rounded-2xl h-14 shadow-2xl shadow-primary/20 w-full md:w-auto transition-all hover:scale-[1.02] active:scale-[0.98]">
            <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <Download size={18} /> Download Full CV
            </a>
          </Button>
        </div>
      </header>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {categories.map((category, idx) => (
          <div
            key={category.title}
            className="group relative rounded-[2.5rem] glass-panel border-primary/10 hover:border-primary/20 transition-all p-8 lg:p-10 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[100px] rounded-full -mr-40 -mt-40 pointer-events-none group-hover:bg-primary/8 transition-colors duration-500" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center border`}>
                  <category.icon size={22} />
                </div>
                <h2 className="text-xl font-black tracking-tight">{category.title}</h2>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-foreground/90">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    {/* Background Bar */}
                    <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden border border-border/20">
                      {/* Animated Foreground Bar */}
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Core Technologies & Tooling Section */}
      <div className="rounded-[2.5rem] glass-panel border-primary/10 p-8 lg:p-12 relative overflow-hidden mb-16">
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full -mr-40 -mb-40 pointer-events-none" />
        
        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight flex items-center gap-2">
              <Sparkles className="text-primary stroke-[1.5]" size={28} />
              Core Technologies &amp; Developer Tooling
            </h2>
            <p className="text-muted-foreground font-medium max-w-2xl text-sm leading-relaxed">
              A curated snapshot of languages, frameworks, AI orchestration tooling, and infrastructure elements utilized daily to build high-performance software and models.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { category: 'AI & Data Science', items: ['LangChain / LangGraph', 'scikit-learn', 'FAISS Vector Search', 'Pandas & NumPy'] },
              { category: 'Languages', items: ['Python', 'C', 'HTML & PHP', 'Java & JS', 'React', 'CSS'] },
              { category: 'Frameworks', items: ['Next.js', 'Flask', 'Laravel', 'Tailwind CSS'] },
              { category: 'Database & Infrastructure', items: ['PostgreSQL / MySQL', 'MongoDB & Redis', 'GitHub Actions', 'AWS / Azure Web Apps'] }
            ].map((toolGroup) => (
              <div key={toolGroup.category} className="p-6 rounded-2xl glass-panel border-primary/5 bg-secondary/25 hover:border-primary/20 hover:bg-primary/5 transition-all">
                <h3 className="text-xs font-black uppercase tracking-wider text-primary mb-4">{toolGroup.category}</h3>
                <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                  {toolGroup.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="rounded-[2.5rem] glass-panel border-primary/10 p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full -mr-40 -mb-40 pointer-events-none" />
        
        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight flex items-center gap-2">
              <Award className="text-primary stroke-[1.5]" size={28} />
              Professional Certifications
            </h2>
            <p className="text-muted-foreground font-medium max-w-2xl text-sm leading-relaxed">
              Verified professional credentials and specialized training in analytics, networking systems, and computational theory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="group p-6 rounded-2xl glass-panel border-primary/5 hover:border-primary/15 hover:bg-primary/5 transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${cert.badgeColor}`}>
                    {cert.issuer}
                  </div>
                  <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 font-semibold">
                    <Calendar size={12} className="text-primary/75" />
                    Obtained {cert.date}
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 border border-border hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all text-muted-foreground"
                    title="Verify Credential"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
