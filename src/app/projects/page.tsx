
import React from 'react';
import { Code, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Research',
  description: 'A showcase of technical projects and research by Thanuka Ellepola, including predictive analytics in RCM, a full-stack intranet system, and AI/ML models.',
}

const projects = [
  {
    title: "Predictive Analytics for Payment Prediction in RCM",
    role: "Lead Data Scientist / Researcher",
    description: `As the lead researcher for this thesis project, I explored predictive analytics in healthcare Revenue Cycle Management (RCM) to forecast payment timelines. I developed and evaluated several machine learning models, including Linear Regression and Random Forests, using historical hospital claims data to provide actionable insights for proactive revenue management. This project highlights my expertise in statistical modeling, data analysis, and the practical application of data science in healthcare finance.`,
    tags: ["Python", "Pandas", "Scikit-learn", "Power BI", "SQL", "Machine Learning"],
  },
  {
    title: "Collective Intranet System",
    role: "Full Stack Developer / System Architect",
    description: `As the principal Full Stack Developer and architect, I designed and built a comprehensive, enterprise-grade Revenue Cycle Management (RCM) system. This API-driven platform automates financial workflows, supports secure patient data management (HIPAA-compliant), and provides real-time analytics. The tech stack includes Python (Flask), MongoDB, and various frontend frameworks, showcasing my ability to deliver complex, production-ready solutions in the healthcare sector.`,
    tags: ["Python", "SQL", "Power BI", "JavaScript", "Full Stack"],
  },
  {
    title: "Disaster Management System (BCS Project)",
    role: "Lead Developer",
    description: `This project, developed for my Bachelor of Science in Computer systems and networking, is a critical incident response system designed to mitigate the impact of floods in Sri Lanka. The system operates by integrating with SMS gateways to broadcast real-time alerts. When a flood is detected in a specific area, the system identifies at-risk citizens based on location data stored in a MySQL database. It then automatically sends emergency SMS notifications, guiding them to government-organized safety shelters with clear directions. The backend was built using the Laravel framework, with a frontend developed using HTML, CSS, and Java.`,
    tags: ["Laravel", "PHP", "MySQL", "HTML", "CSS", "Java", "SMS Gateway"],
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
  return (
    <div className="space-y-12 pb-16">
       <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Code size={36} /> Projects & Research
        </h1>
        <p className="mt-2 text-muted-foreground">A selection of projects that showcase my skills and passion.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <Card 
            key={project.title} 
            className="opacity-0 animate-fade-in transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary h-full flex flex-col"
            style={{ animationDelay: `${index * 150}ms` }}
            >
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1">
                <Briefcase size={16} className="text-muted-foreground" />
                {project.role}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground mb-4 whitespace-pre-line flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
