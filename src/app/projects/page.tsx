'use client';

import React from 'react';
import { Code, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const projects = [
  {
    title: "Predictive Analytics for Payment Prediction in RCM",
    role: "Lead Data Scientist / Researcher",
    description: `This thesis explores the application of predictive analytics in healthcare Revenue Cycle Management (RCM), with a focus on optimizing payment prediction and revenue forecasting. As healthcare organizations face increasing financial pressures and complex administrative challenges, data-driven solutions are essential for improving operational efficiency and financial performance. In this study, historical billing and claims data from a hospital network were leveraged to develop, compare, and evaluate four widely used machine learning models: Linear Regression, Decision Trees, Random Forests, and Neural Networks. The research encompassed four predictive scenarios—future payment prediction, location-based trends, provider-based payments, and overall revenue forecasting. Comprehensive data preprocessing, feature engineering, and rigorous cross-validation were employed to ensure robust and unbiased results. The findings revealed that Random Forest models consistently outperformed others in accuracy and stability, while Neural Networks demonstrated superior performance in data-rich environments. Importantly, the project demonstrates not only the practical feasibility of implementing predictive analytics in real-world RCM settings but also provides actionable insights for healthcare administrators seeking to proactively manage revenue cycles. This work highlights the transformative potential of advanced analytics in healthcare finance and offers a roadmap for organizations aiming to move from reactive to proactive financial management.`,
    tags: ["Python", "Pandas", "Scikit-learn", "Power BI", "SQL", "Machine Learning"],
  },
  {
    title: "Collective Intranet System & Analytics Dashboard",
    role: "Full Stack Developer / System Architect",
    description: `CollectiveRCM Intranet (Full stack) is a comprehensive, enterprise-grade Revenue Cycle Management (RCM) system designed to streamline, automate, and optimize financial workflows within healthcare organizations. Built with a modular, API-driven architecture, the platform supports secure patient data management, seamless claims processing, automated billing, and real-time analytics. The system leverages robust authentication mechanisms, including 2FA and GridFS-based document storage, to ensure HIPAA-compliant operations and data integrity.

Key features include multi-role access controls, integrated task and exam management modules, dynamic routing logic for workflow automation, and extensible support for administrative operations. The platform is designed for scalability, maintainability, and secure integration with both legacy and modern EHR systems. As the principal developer, I contributed to every stage of the project lifecycle: from architecting MongoDB schema patterns and authentication layers to implementing seeders, utility APIs, and comprehensive documentation pipelines.

CollectiveRCM Apex exemplifies best practices in secure, source-driven software engineering and demonstrates my ability to deliver complex, production-ready solutions for the healthcare technology sector.`,
    tags: ["Python", "SQL", "Power BI", "JavaScript", "Full Stack"],
  },
  {
    title: "GPT-based Chess Analysis Model",
    role: "AI Developer",
    description: "Created a custom GPT-based model for chess analysis, providing real-time move recommendations, evaluations, and strategic explanations for players of all levels.",
    tags: ["Python", "OpenAI API", "AI", "GPT"],
  },
  {
    title: "BTC Price Prediction Bot (AI/ML Model)",
    role: "Data Scientist / Model Creator",
    description: "Built an AI-powered model for Bitcoin price forecasting using historical data, technical indicators, and sentiment analysis. Explored LSTM, Random Forest, and hybrid GPT approaches.",
    tags: ["Python", "TensorFlow", "Keras", "Scikit-learn", "AI/ML"],
  },
  {
    title: "GPT-based RCM Automation Assistant",
    role: "NLP Engineer",
    description: "Developed a specialized GPT-4 model fine-tuned for automating RCM processes, answering billing queries, and supporting document classification within a corporate environment.",
    tags: ["GPT-4", "NLP", "Automation", "Fine-tuning"],
  },
  {
    title: "Healthcare KPI Dashboard Suite",
    role: "Analytics Developer",
    description: "Designed a suite of interactive dashboards for healthcare finance teams to monitor key metrics like denial rates, net collection rate, and days in A/R, leading to improved financial outcomes.",
    tags: ["Power BI", "Excel", "SQL", "Data Visualization"],
  },
  {
    title: "Custom GPT-4 Knowledge Base for Clinical Coding",
    role: "AI/ML Engineer",
    description: "Deployed a GPT-4 powered internal chatbot for clinical coding, insurance denial analysis, and quick reference for CPT/ICD codes, enhancing productivity and accuracy.",
    tags: ["GPT-4", "Chatbot", "AI/ML", "Healthcare"],
  },
  {
    title: "Data-Driven Chess Tactics Trainer",
    role: "AI Researcher",
    description: "Combined historical chess game data and custom GPT models to generate dynamic puzzles and personalized tactic recommendations, creating an adaptive learning tool.",
    tags: ["GPT", "AI", "Data Science", "Python"],
  },
  {
    title: "Additional Projects & Initiatives",
    role: "Developer & Automation Specialist",
    description: "Developed troubleshooting scripts and process automations for telecom network optimization at Sri Lanka Telecom. Created automated Excel/Python tools for audit-ready financial data cleansing. Designed and led data analytics workshops for students and professionals.",
    tags: ["Automation", "Scripting", "Excel", "Python", "Training"],
  }
];

export default function ProjectsPage() {
  const [year, setYear] = React.useState<number | string>('');

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="space-y-12">
       <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Code size={36} /> Projects & Research
        </h1>
        <p className="mt-2 text-muted-foreground">A selection of projects that showcase my skills and passion.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {projects.map((project) => (
          <Card key={project.title}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1">
                <Briefcase size={16} className="text-muted-foreground" />
                {project.role}
              </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4 whitespace-pre-line">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <footer className="text-center text-sm text-muted-foreground pt-8">
            <p>&copy; {year} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}
