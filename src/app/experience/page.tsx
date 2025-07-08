'use client';

import React from 'react';
import { Briefcase, Cpu, Award, Star } from "lucide-react";
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
          "Managed and trained teams in healthcare revenue cycle management (RCM).",
          "Implemented strategic policies that improved efficiency, quality control, and client satisfaction.",
          "Prepared audit reports, allocated work volumes, and addressed direct client inquiries.",
          "Drove a 20% boost in team performance through targeted training and leadership.",
        ],
      },
      {
        title: "Full Stack Development",
        details: [
          "Developed the Collective Intranet System: End-to-end architect and developer of the intranet, handling backend (Python, SQL) and frontend (modern JS frameworks, Power BI, dashboards).",
          "Built analytics dashboards for KPI, financial, and operational tracking.",
          "Centralized documentation, user management, reporting, and workflow tools.",
          "Integrated real-time performance monitoring and improved cross-team communication.",
        ],
      },
      {
        title: "Predictive Analytics & Data Science",
        details: [
          "Led data-driven initiatives for RCM optimization.",
          "Designed and deployed machine learning models for payment prediction, revenue forecasting, and trend analysis.",
          "Used Python, Power BI, and SQL for data modeling, feature engineering, and result visualization.",
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
  "Programming/Scripting": ["Python (Pandas, NumPy, Scikit-learn)", "SQL", "Git/GitHub"],
  "Analytics & Modeling": ["Predictive modeling", "regression", "classification", "advanced statistics", "feature engineering", "cross-validation", "model evaluation"],
  "Data Visualization": ["Power BI", "Matplotlib", "Excel (Advanced Charts, PivotTables)"],
  "Database": ["MySQL", "SQL-based querying", "ERP systems"],
  "Networking & Systems": ["PSTN", "ADSL", "network OS", "switching systems"],
  "Workflow Tools": ["WFP", "Clarity", "Audit Reporting"],
  "Version Control": ["Git", "GitHub"],
};

const keyAccomplishments = [
  "Led technical projects and data-driven initiatives that measurably improved team performance and financial outcomes.",
  "Successfully bridged the gap between technical and operational teams as both a leader and developer.",
  "Drove organizational transformation through the implementation of analytics and digital workflow platforms.",
];

const otherHighlights = [
  "Strong communication and problem-solving skills.",
  "Experience with both leadership and hands-on technical roles.",
  "Active participation in extracurriculars (AIESEC, chess, science society, IT club).",
  "Fluent in English and Sinhala.",
];

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
            <Card key={index} className="transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
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
        <Card className="transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
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
      
      <section>
        <h2 className="text-3xl font-bold font-headline text-primary flex items-center gap-3 mb-6"><Award size={30} /> Key Accomplishments</h2>
        <Card className="transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {keyAccomplishments.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline text-primary flex items-center gap-3 mb-6"><Star size={30} /> Other Highlights</h2>
        <Card className="transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {otherHighlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <footer className="text-center text-sm text-muted-foreground pt-8">
        <p>&copy; {year} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}
