
import React from 'react';
import { Briefcase, Cpu, Code, BrainCircuit, BarChart3, Database, CloudCog, Building, Rocket, Server, ShieldCheck, Globe, Bot } from "lucide-react";
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
    <div className="space-y-12 pb-16">
      <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Briefcase size={36} /> Experience & Expertise
        </h1>
        <p className="mt-2 text-muted-foreground">Professional journey, enterprise innovations, and deep technical capabilities.</p>
      </header>

      <div className="space-y-8">
        {professionalExperience.map((exp, index) => (
          <Card 
            key={index} 
            className="opacity-0 animate-fade-in transition-all duration-300 hover:shadow-lg hover:border-primary"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                      <CardTitle className="text-2xl">{exp.role}</CardTitle>
                      <CardDescription className="text-base font-medium">
                      {exp.company} &middot; {exp.period}
                      </CardDescription>
                  </div>
                  {exp.company === "Technical Project Portfolio" ? <Rocket className="text-accent" size={24} /> : <Building className="text-primary" size={24} />}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {exp.sections.map(section => (
                  <div key={section.title}>
                      <h3 className="font-semibold text-card-foreground/90 mb-2">{section.title}</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {section.details.map((detail, i) => (
                              <li key={i}>{detail}</li>
                          ))}
                      </ul>
                  </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="pt-8">
        <h2 className="text-3xl font-bold font-headline text-primary flex items-center gap-3 mb-6"><Cpu size={30} /> Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSkills.map((category, index) => (
              <Card 
                key={category.category} 
                className="opacity-0 animate-fade-in transition-all duration-300 hover:shadow-lg hover:border-primary"
                style={{ animationDelay: `${(professionalExperience.length + index) * 150}ms` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-primary" />
                    <span className="text-lg">{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {category.skills.map(skill => (
                      <li key={skill} className="text-sm text-muted-foreground">{skill}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
