import Link from "next/link";
import {
  Briefcase,
  Code,
  ExternalLink,
  GraduationCap,
  MessageSquare,
  BookOpen,
  Cpu,
  Database,
  Layers,
  Lightbulb,
  ArrowRight
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const skills = {
  programming: {
    title: "Programming",
    icon: Code,
    items: ["Python (Pandas, NumPy, Scikit-learn)", "SQL", "Flask", "HTML", "CSS", "Java", "JavaScript"],
  },
  database: {
    title: "Database Management",
    icon: Database,
    items: ["CosmosDB", "MongoDB", "PostgreSQL", "MySQL", "SQLAlchemy", "Snowflake", "Vector Databases"],
  },
  analytics: {
    title: "Data Analytics & Visualization",
    icon: Layers,
    items: ["Predictive Modeling", "Power BI", "Matplotlib", "Advanced Excel"],
  },
  tools: {
    title: "Other Tools & Systems",
    icon: Cpu,
    items: ["Git/GitHub", "ERP Systems", "Workflow Tools (WFP, Clarity)", "Audit Reporting"],
  },
   competencies: {
    title: "Core Competencies",
    icon: Lightbulb,
    items: ["Problem-solving", "Data modeling", "Technical troubleshooting", "Team leadership", "Communication"],
  },
};

const projects = [
    {
        title: "Predictive Analytics for Payment Prediction in RCM (MSc Thesis)",
        description: "This research compares Linear Regression, Decision Trees, Random Forests, and Neural Networks for predicting healthcare payment outcomes. Random Forests achieved the best results, offering practical guidance for healthcare administrators to optimize financial performance.",
        tags: ["Predictive Modeling", "Python", "Scikit-learn", "Pandas", "Healthcare"],
        link: {
            href: "https://drive.google.com/file/d/1DSEb6-RCTXeyADkLHzAGkccv7wqjSQDD/preview",
            text: "Read Thesis Online",
        },
        isPdf: false,
    },
    {
        title: "Collective RCM Website",
        description: "A full-stack healthcare revenue cycle management (RCM) web application built with a robust backend and advanced database integrations to streamline billing and payment processes.",
        tags: ["Flask", "Python", "CSS", "JavaScript", "HTML", "Full Stack"],
        link: {
            href: "https://lovable.dev/projects/3042a6fe-e8b3-4f12-8189-1e75bd1c5588",
            text: "View Demo Site",
        },
    },
];

const education = [
  {
    degree: "Master of Business Analytics (2023–2025)",
    institution: "University of Colombo"
  },
  {
    degree: "Bachelor of Computer Systems & Networking (2019–2021)",
    institution: "Greenwich University"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section id="about">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2"><Briefcase /> About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Analytical and results-driven data scientist with a background in Computer Systems & Networking and a Master’s in Business Analytics. Over five years of leadership experience in healthcare revenue operations, predictive analytics, and technical project delivery. Proven expertise in building robust, data-driven solutions for real-world business and healthcare challenges.
            </p>
          </CardContent>
        </Card>
      </section>
      
      <section id="education-summary">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-headline flex items-center gap-2"><GraduationCap /> Education</h2>
          <Button asChild variant="link" className="text-accent">
            <Link href="/education">View All <ArrowRight className="ml-2" size={16} /></Link>
          </Button>
        </div>
        <div className="space-y-4">
           {education.map(edu => (
             <Card key={edu.degree}>
                <CardContent className="pt-6">
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                </CardContent>
              </Card>
           ))}
        </div>
      </section>

      <section id="skills">
        <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2"><BookOpen /> Technical Skills & Competencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(skills).map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <category.icon size={20} className="text-primary" /> {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="projects-summary">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-headline flex items-center gap-2"><Code /> Recent Projects</h2>
          <Button asChild variant="link" className="text-accent">
            <Link href="/projects">View All <ArrowRight className="ml-2" size={16} /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                  </div>
              </CardContent>
              <div className="p-6 pt-0">
                 {project.link && (
                   <Button asChild variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
                     <a href={project.link.href} target="_blank" rel="noopener noreferrer">
                       {project.link.text} <ExternalLink className="ml-2" size={16} />
                     </a>
                   </Button>
                 )}
              </div>
            </Card>
          ))}
        </div>
      </section>
      
      <section id="testimonials">
        <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2"><MessageSquare /> Testimonials</h2>
        <Card className="text-center">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">References and testimonials available upon request.</p>
          </CardContent>
        </Card>
      </section>

      <footer className="text-center text-sm text-muted-foreground pt-8">
        <p>&copy; {new Date().getFullYear()} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}
