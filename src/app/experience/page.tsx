
'use client';

import React from 'react';
import { Briefcase, Cpu, Code, BrainCircuit, BarChart3, Database, CloudCog, Network, Wrench, Building, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
        title: "Technical & Project Initiatives (in addition to my core role)",
        details: [
          "Independently designed and developed the Collective Intranet System, serving as the principal architect and main developer.",
          "Led backend and frontend development using Python (Flask), SQLAlchemy, Java, HTML, CSS, and JavaScript frameworks.",
          "Built analytics dashboards for KPI, financial, and operational tracking using PostgreSQL, MongoDB, and custom visualizations.",
          "Centralized documentation, user management, reporting, and workflow tools.",
          "Integrated real-time performance monitoring and improved cross-team communication.",
          "Deployed and maintained solutions on Azure servers.",
        ],
      },
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
    skills: ["Python (Pandas, NumPy, Scikit-learn)", "SQL", "JavaScript (ES6+)", "React", "Tailwind CSS", "Java", "HTML/CSS", "Git/GitHub"],
  },
  {
    category: "Analytics & Modeling",
    icon: BrainCircuit,
    skills: ["Predictive Modeling", "Regression/Classification", "Advanced Statistics", "Feature Engineering", "Cross-Validation", "LLMs & GPT Models"],
  },
  {
    category: "Data Visualization",
    icon: BarChart3,
    skills: ["Power BI", "Matplotlib", "Excel (Advanced Charts, PivotTables)"],
  },
  {
    category: "Database & Backend",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLAlchemy", "Python (Flask)"],
  },
  {
    category: "DevOps & Deployment",
    icon: CloudCog,
    skills: ["Azure (Server Setup, Deployment)", "Version Control (Git)"],
  },
  {
    category: "Networking & Systems",
    icon: Network,
    skills: ["TCP/IP", "LAN/WAN", "Windows/Linux Server Admin", "Network Security Basics"],
  },
  {
    category: "Workflow & Reporting Tools",
    icon: Wrench,
    skills: ["WFP", "Clarity", "Audit Reporting Tools", "ERP System Integration"],
  },
  {
    category: "Practice Management Systems",
    icon: Building,
    skills: ["AdvancedMD", "eClinicalWorks (ECW)", "HST Pathways"],
  },
  {
    category: "Clearinghouses & RCM Tools",
    icon: Share2,
    skills: ["Waystar"],
  },
];


export default function ExperiencePage() {
  return (
    <div className="space-y-12 pb-16">
      <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Briefcase size={36} /> Professional Experience
        </h1>
        <p className="mt-2 text-muted-foreground">My professional journey, skills, and key accomplishments.</p>
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
                <CardTitle>{exp.role}</CardTitle>
                <CardDescription>
                  {exp.company} &middot; {exp.period}
                </CardDescription>
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
                    <span>{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {category.skills.map(skill => (
                      <li key={skill} className="flex items-start">
                        <span className="text-primary/80 mr-2 mt-1">&#8226;</span>
                        <span className="text-muted-foreground">{skill}</span>
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
