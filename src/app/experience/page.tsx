
import React from 'react';
import { Briefcase, Cpu, Code, BrainCircuit, BarChart3, Database, CloudCog, Building, Rocket, Server, ShieldCheck, Globe, Bot, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience & Technical Expertise | Thanuka Ellepola',
  description: 'Detailed professional journey and technical skills of Thanuka Ellepola, specializing in Data Science, AI Engineering, and Enterprise Full-Stack Development.',
}

const professionalExperience = [
  {
    role: "Assistant Manager & Lead Architect",
    company: "Collective RCM (Pvt) Ltd",
    period: "2019 – Present",
    sections: [
      {
        title: "Enterprise Architecture & Digital Transformation",
        details: [
          "Principal Architect of the Collective Intranet System: Engineered a secure, hybrid SQL/NoSQL platform (Flask, PostgreSQL, MongoDB GridFS) centralizing all enterprise workflows.",
          "Implemented a high-security framework featuring 2FA, company email validation, Redis-based rate limiting, and account lock logic.",
          "Designed a complex training-and-progression engine with timed assessments, automated scoring, and administrative approval gates.",
          "Managed end-to-end CI/CD pipelines via GitHub Actions with deployment to Azure Web Apps.",
        ],
      },
      {
        title: "Strategic Leadership & Operational Impact",
        details: [
          "Lead multi-functional teams in healthcare Revenue Cycle Management (RCM), optimizing Billing, Posting, and Denial Management workflows.",
          "Architected real-time performance analytics dashboards, reducing manual audit effort by over 40% and improving KPI visibility.",
          "Mentored and trained staff on technical and operational workflows, ensuring a 95% pass rate in internal certification programs.",
        ],
      },
    ],
  },
  {
    role: "Independent Full Stack & AI Developer",
    company: "Technical Project Portfolio",
    period: "Ongoing",
    sections: [
      {
        title: "Advanced AI Systems & RAG Innovation",
        details: [
          "AI Job Hunter: Architected an autonomous job application system using a LangChain-orchestrated RAG pipeline, FAISS vector search, and Playwright browser automation.",
          "CodeX: Built an Architecture Intelligence Engine using Gemini 3.1 Pro and a custom static analysis GraphEngine for automatic repository mapping.",
          "RevOps AI: Developed a B2B SaaS for healthcare revenue auditing using an Autonomous Agent Architecture (CEO, Eng, ML Pods) and Scikit-learn forecasting.",
          "CareerForge AI 3.0: Engineered a multi-agent career OS featuring low-latency voice AI (Gemini 3.1 Live API) and real-time market grounding.",
          "ReviewRadar AI: Developed an end-to-end sentiment intelligence platform processing ~7M+ reviews with ensemble ML models and multi-threaded ETL pipelines.",
        ],
      },
      {
        title: "Scientific Research & Critical Systems",
        details: [
          "RCM Predictive Analytics: Published research achieving R² > 0.90 in healthcare payment forecasting using Random Forest and Neural Networks.",
          "Disaster Management: Developed a Laravel-based flood mitigation system for Sri Lanka with integrated SMS gateways for geo-fenced mass alerting.",
          "Statistical App: Built an interactive analysis tool for PCA, Inferential Statistics, and ML lifecycle management using Streamlit.",
        ]
      }
    ],
  },
];

const technicalSkills = [
  {
    category: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: ["Gemini 3.1 (Pro/Flash/Live API)", "LangChain", "RAG & Vector DB (FAISS)", "Scikit-learn (RF, XGBoost)", "Neural Networks", "Multi-Agent Systems"],
  },
  {
    category: "Full Stack & Backend",
    icon: Code,
    skills: ["Python (Flask, FastAPI)", "TypeScript / React 19", "PostgreSQL (SQLAlchemy)", "MongoDB (GridFS)", "Redis", "PHP / Laravel"],
  },
  {
    category: "Cloud & Infrastructure",
    icon: CloudCog,
    skills: ["Azure Web Apps", "Google Cloud Platform (GCP)", "Docker / Compose", "GitHub Actions (CI/CD)", "Playwright Automation"],
  },
  {
    category: "Data & Visualization",
    icon: BarChart3,
    skills: ["Power BI", "Mermaid.js (Architecture-as-code)", "Plotly / Recharts", "Streamlit", "Pandas / NumPy"],
  },
];


export default function ExperiencePage() {
  return (
    <div className="space-y-20 pb-20 animate-reveal">
      <header className="space-y-4">
        <h1 className="text-4xl lg:text-6xl font-black font-headline tracking-tighter">
          Experience <span className="opacity-30">&</span> <span className="text-primary">Expertise</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl font-medium leading-relaxed">
          A track record of engineering complex systems and leading digital transformation at scale.
        </p>
      </header>

      <div className="relative space-y-16">
        {/* Timeline Path */}
        <div className="absolute left-[31px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

        {professionalExperience.map((exp, index) => (
          <div 
            key={index} 
            className="relative pl-0 md:pl-20 group animate-slide-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 top-6 w-16 h-16 rounded-2xl glass-panel hidden md:flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 z-10 border-primary/20">
              {exp.company === "Technical Project Portfolio" ? <Rocket size={24} /> : <Building size={24} />}
            </div>

            <div className="glass-panel p-8 lg:p-12 rounded-[2.5rem] transition-all duration-500 hover:scale-[1.01] hover:bg-background/60">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black font-headline tracking-tight">{exp.role}</h2>
                  <p className="text-primary font-bold text-base">{exp.company}</p>
                </div>
                <div className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 self-start md:self-auto">
                  {exp.period}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {exp.sections.map(section => (
                  <div key={section.title} className="space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                       <div className="w-1.5 h-6 bg-primary rounded-full transition-all group-hover:h-8" />
                       {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.details.map((detail, i) => (
                        <li key={i} className="flex gap-4 group/item">
                          <CheckCircle2 size={18} className="text-primary shrink-0 mt-1 opacity-50 group-hover/item:opacity-100 transition-opacity" />
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed font-medium text-sm">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="space-y-12">
        <h2 className="text-4xl font-black font-headline tracking-tight flex items-center gap-4">
          <Cpu size={40} className="text-primary" />
          Technical Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSkills.map((category, index) => (
              <div 
                key={category.category} 
                className="glass-panel p-8 rounded-[2rem] space-y-6 group hover:bg-primary/5 transition-colors animate-slide-up"
                style={{ animationDelay: `${(professionalExperience.length + index) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <category.icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-secondary/50 text-xs font-bold text-muted-foreground border border-border/50 group-hover:border-primary/20 group-hover:text-foreground transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
