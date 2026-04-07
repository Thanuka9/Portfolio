
import React from 'react';
import { Briefcase, Cpu, Code, BrainCircuit, BarChart3, Database, CloudCog, Network, Wrench, Building, Share2, Rocket, LineChart, Zap, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Experience & Technical Skills',
  description: 'Detailed work experience and technical skills of Thanuka Ellepola, showcasing expertise in data science, AI, full-stack development, and leadership in healthcare RCM.',
}

const professionalExperience = [
  {
    role: "Assistant Manager",
    company: "Collective RCM (Pvt) Ltd",
    period: "2019 – Present",
    sections: [
      {
        title: "Leadership & Operations",
        details: [
          "Manage and train teams in healthcare revenue cycle management (RCM).",
          "Implement strategic policies to improve operational efficiency, quality control, and client satisfaction.",
          "Prepare audit reports, allocate work volumes, and handle direct client inquiries.",
          "Drive team performance through targeted training, mentoring, and process improvement.",
        ],
      },
      {
        title: "Technical & Project Initiatives",
        details: [
          "Independently designed and developed the Collective Intranet System, serving as the principal architect and main developer.",
          "Led backend and frontend development using Python (Flask), SQLAlchemy, Java, HTML, CSS, and JavaScript frameworks.",
          "Built analytics dashboards for KPI, financial, and operational tracking using PostgreSQL, MongoDB, and custom visualizations.",
          "Centralized documentation, user management, reporting, and workflow tools.",
          "Deployed and maintained solutions on Azure servers.",
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
        title: "Key Innovations & AI Systems",
        details: [
          "CodeX (Architecture Intelligence Engine): Engineered a system to decode GitHub repositories into visual 'Code Wikis' using Gemini 3.1 Pro and a custom GraphEngine for automated Mermaid.js diagram generation. Implemented multi-tier fetching (GitHub API → JsDelivr) to ensure 100% uptime.",
          "RevOps AI (Predictive RCM Platform): Architected a B2B SaaS for healthcare revenue cycle management using an Autonomous Agent Architecture (multi-agent 'Pods') and Scikit-learn for payment forecasting. Integrated with Monday.com API for real-time operational sync.",
          "CareerForge AI 3.0 (Multi-Agent Career OS): Developed an end-to-end job-seeking automation platform featuring low-latency voice AI via Gemini 3.1 Flash Live API and real-time market data grounding via Google Search.",
          "ReviewRadar AI: Built a scalable ETL pipeline and ensemble ML system (Logistic Regression, RF, XGBoost) to analyze ~7M+ Yelp reviews. Implemented VADER sentiment analysis and TF-IDF feature engineering.",
          "Statistical-app: Designed a research tool for descriptive stats, hypothesis testing (ANOVA, Chi-Square), PCA, and predictive model evaluation with Streamlit and Plotly.",
          "Payment Prediction Research: Achieved R² > 0.90 in healthcare payment forecasting using Random Forest and Neural Networks on a 3-year HIPAA-compliant dataset, bridging the gap between academic ML and real-world RCM.",
        ],
      },
      {
        title: "Technical Leadership & Methodologies",
        details: [
          "Implemented 'Smart Context' algorithms to optimize LLM performance by prioritizing high-signal files (DNA files) in large codebases.",
          "Developed resilient data acquisition strategies using multi-tier fallbacks to ensure zero downtime during API rate limiting.",
          "Pioneered the use of 'Thinking Config' reasoning tokens for complex architectural critiques and document optimization.",
          "Integrated real-time audio processing using Web Audio API and custom PCM encoding for human-like AI interactions.",
        ]
      }
    ],
  },
  {
    role: "Trainee",
    company: "Sri Lanka Telecom",
    period: "2018 – 2019",
    sections: [
        {
            title: "Responsibilities",
            details: [
                "Troubleshot PSTN and ADSL systems; ensured minimal disruption.",
                "Worked in the switching department and with network operation systems.",
                "Used ERP, WFP, and Clarity software for workflow and process management.",
            ]
        }
    ]
  },
];

const technicalSkills = [
  {
    category: "Programming & Scripting",
    icon: Code,
    skills: ["Python (Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch)", "SQL & NoSQL", "JavaScript (React, Node.js)", "TypeScript", "Tailwind CSS", "Java", "C", "Laravel"],
  },
  {
    category: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: ["Generative AI (Gemini, GPT-4)", "Multi-Agent Systems", "Predictive Modeling", "NLP & Vision", "Prompt Engineering", "Thinking Config Reasoning"],
  },
  {
    category: "Data Visualization",
    icon: BarChart3,
    skills: ["Power BI", "Matplotlib", "Mermaid.js (Diagrams-as-code)", "Recharts", "Excel (Advanced)"],
  },
  {
    category: "Database & Backend",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "FastAPI", "Python (Flask)", "SQLAlchemy", "Snowflake", "Vector Databases"],
  },
  {
    category: "DevOps & Infrastructure",
    icon: CloudCog,
    skills: ["Docker & Containerization", "Google Cloud Platform (GCP)", "Azure", "CI/CD (Cloud Build)", "Git/GitHub"],
  },
  {
    category: "Analytics & RCM Tools",
    icon: Building,
    skills: ["Healthcare Analytics", "Predictive RCM", "AdvancedMD", "eClinicalWorks", "Waystar", "Monday.com API"],
  },
];


export default function ExperiencePage() {
  return (
    <div className="space-y-12 pb-16">
      <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Briefcase size={36} /> Experience & Skills
        </h1>
        <p className="mt-2 text-muted-foreground">My professional journey, key innovations, and technical expertise.</p>
      </header>

      <section>
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
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline text-primary flex items-center gap-3 mb-6"><Cpu size={30} /> Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((category, index) => (
              <Card 
                key={category.category} 
                className="opacity-0 animate-fade-in transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary flex flex-col"
                style={{ animationDelay: `${(professionalExperience.length + index) * 150}ms` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-lg">{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {category.skills.map(skill => (
                      <li key={skill} className="flex items-start">
                        <span className="text-primary/80 mr-2 mt-1">&#8226;</span>
                        <span className="text-sm text-muted-foreground">{skill}</span>
                      </li>
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
