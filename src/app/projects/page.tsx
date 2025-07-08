import { Code, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const projects = [
  {
    title: "Predictive Analytics for Payment Prediction in RCM",
    role: "Lead Data Scientist / Researcher",
    description: "Original thesis project applying advanced ML (Random Forests, Neural Networks, etc.) to predict healthcare payments. Full pipeline from data cleaning and feature engineering to model comparison and dashboard creation.",
    tags: ["Python", "Pandas", "Scikit-learn", "Power BI", "SQL", "Machine Learning"],
  },
  {
    title: "Collective Intranet System & Analytics Dashboard",
    role: "Full Stack Developer / System Architect",
    description: "Designed and developed a full-stack intranet to centralize workflow, document management, and communication, featuring interactive dashboards for real-time KPI tracking.",
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
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <footer className="text-center text-sm text-muted-foreground pt-8">
            <p>&copy; {new Date().getFullYear()} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}
