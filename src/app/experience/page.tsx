
import React from 'react';
import { Briefcase, Cpu, Code, BrainCircuit, BarChart3, Database, CloudCog, Building, Rocket, Server, ShieldCheck, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Experience & Technical Skills',
  description: 'Detailed work experience and technical skills of Thanuka Ellepola, showcasing expertise in data science, AI, and enterprise full-stack development.',
}

const professionalExperience = [
  {
    role: "Assistant Manager & Lead Architect",
    company: "Collective RCM (Pvt) Ltd",
    period: "2019 – Present",
    sections: [
      {
        title: "Enterprise Platform Innovation",
        details: [
          "Principal Architect of the Collective Intranet System: Built a hybrid SQL/NoSQL platform (Flask, PostgreSQL, MongoDB GridFS) centralizing RCM onboarding, training, and task management.",
          "Engineered a complex training-and-progression engine with approval gates, automated timed exams, and progression analytics.",
          "Implemented rigorous enterprise security including 2FA, account lock logic, Redis-based rate limiting, and CSRF protection.",
          "Deployed and maintained scalable cloud solutions on Azure with automated CI/CD via GitHub Actions.",
        ],
      },
      {
        title: "Leadership & Operations",
        details: [
          "Manage and train multi-functional teams in healthcare Revenue Cycle Management (RCM) workflows.",
          "Drive operational efficiency through automated KPI reporting and strategic process improvements.",
          "Architected centralized documentation and reporting tools, reducing manual effort in audit cycles by over 40%.",
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
        title: "Advanced AI Systems & Architecture",
        details: [
          "CodeX (Architecture Intelligence): Engineered a system using Gemini 3.1 Pro and a custom GraphEngine to transform GitHub repos into visual diagrams and technical wikis. Implemented Smart Context Injection for optimized LLM signal.",
          "RevOps AI (Predictive RCM SaaS): Architected a B2B platform using an Autonomous Agent Architecture (AI 'Pods') for healthcare data auditing and payment forecasting (Scikit-learn).",
          "CareerForge AI 3.0 (Multi-Agent OS): Developed a job-seeking automation platform with low-latency voice AI (Gemini 3.1 Flash Live API) and real-time market grounding.",
          "ReviewRadar AI: Built a production ETL pipeline to ingest ~7M+ reviews into PostgreSQL, using an ensemble ML system (XGBoost/RF) for sentiment intelligence.",
        ],
      },
      {
        title: "Critical Incident Systems",
        details: [
          "Disaster Management System: Developed a Laravel-based flood mitigation system for Sri Lanka, integrating SMS gateways for mass emergency alerts and real-time incident mapping.",
          "Research: Achieved R² > 0.90 in healthcare payment forecasting research, bridging academic ML with enterprise financial operations.",
        ]
      }
    ],
  },
];

const technicalSkills = [
  {
    category: "Programming & AI",
    icon: Code,
    skills: ["Python (Scikit-learn, TensorFlow)", "JavaScript/TypeScript", "React/Next.js", "Generative AI (Gemini 3.1, GPT-4)", "Multi-Agent Systems", "Prompt Engineering"],
  },
  {
    category: "Database & Backend",
    icon: Database,
    skills: ["PostgreSQL (SQLAlchemy)", "MongoDB (GridFS)", "Redis", "Flask", "FastAPI", "Laravel", "MySQL"],
  },
  {
    category: "Cloud & DevOps",
    icon: CloudCog,
    skills: ["Azure App Service", "GCP", "Docker", "GitHub Actions (CI/CD)", "Git/GitHub"],
  },
  {
    category: "Data Visualization",
    icon: BarChart3,
    skills: ["Mermaid.js (Diagrams-as-code)", "Power BI", "Recharts", "Plotly", "Streamlit"],
  },
];

export default function ExperiencePage() {
  return (
    <div className="space-y-12 pb-16">
      <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Briefcase size={36} /> Experience & Skills
        </h1>
        <p className="mt-2 text-muted-foreground">Professional journey, enterprise innovations, and technical expertise.</p>
      </header>

      <div className="space-y-8">
        {professionalExperience.map((exp, index) => (
          <Card 
            key={index} 
            className="opacity-0 animate-fade-in transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                      <CardTitle>{exp.role}</CardTitle>
                      <CardDescription>
                      {exp.company} &middot; {exp.period}
                      </CardDescription>
                  </div>
                  {exp.company === "Technical Project Portfolio" && <Rocket className="text-accent" size={24} />}
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
                className="opacity-0 animate-fade-in transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary"
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
