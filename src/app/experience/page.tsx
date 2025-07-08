
'use client';

import React from 'react';
import { Briefcase, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const technicalSkills = {
    "Programming & Scripting": [
        "Python (Pandas, NumPy, Scikit-learn)",
        "SQL",
        "JavaScript (ES6+)",
        "React",
        "Tailwind CSS",
        "Java",
        "HTML",
        "CSS",
        "Git",
        "GitHub",
      ],
      "Analytics & Modeling": [
        "Predictive Modeling",
        "Regression",
        "Classification",
        "Advanced Statistics",
        "Feature Engineering",
        "Cross-Validation",
        "Model Evaluation",
        "LLMs",
        "GPT Models",
      ],
      "Data Visualization": ["Power BI", "Matplotlib", "Excel (Advanced Charts, PivotTables)"],
      "Database & Backend": [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "SQLAlchemy",
        "ERP systems",
        "SQL-based querying",
        "Python (Flask)",
      ],
      "DevOps & Deployment": ["Azure (server setup, deployment)", "version control (Git, GitHub)"],
      "Networking & Systems": [
        "PSTN",
        "ADSL",
        "TCP/IP",
        "LAN/WAN Setup",
        "Network Operating Systems",
        "Routing & Switching (Cisco)",
        "Network Troubleshooting",
        "Windows & Linux Server Administration",
        "Basic Network Security (Firewalls/NAT)",
        "ERP System Integration",
      ],
      "Workflow & Reporting Tools": ["WFP", "Clarity", "audit reporting tools"],
      "Practice Management Systems": ["AdvancedMD", "eClinicalWorks (ECW)", "HST Pathways"],
      "Clearinghouses & RCM Tools": ["Waystar"],
};


export default function ExperiencePage() {
  const [year, setYear] = React.useState<number | string>('');

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="space-y-12">
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
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {Object.entries(technicalSkills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="font-semibold mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      
      <footer className="text-center text-sm text-muted-foreground pt-8">
        <p>&copy; {year} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}
